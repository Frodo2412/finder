module Groups
  class MessagesController < ApplicationController
    before_action :set_group
    before_action :set_message, only: %i[update destroy]
    before_action :ensure_member_access, only: %i[index create update destroy]
    before_action :ensure_correct_user_or_admin, only: %i[destroy update]

    def index
      messages = @group.messages.order(created_at: :desc)
      serialized_messages = messages.map do |message|
        MessageSerializer.new(message).serializable_hash[:data][:attributes]
      end
      render json: serialized_messages
    end

    def create
      @message = Message.new(
        message_params.merge(
          group: @group,
          user: current_user,
          hour: DateTime.now
        )
      )
      if @message.save
        render json: MessageSerializer.new(@message).serializable_hash[:data][:attributes], status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    def update
      if @message.update(message_params)
        render json: MessageSerializer.new(@message).serializable_hash[:data][:attributes], status: :ok
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if @message.destroy
        Rails.logger.info "Message with ID ##{@message.id} was successfully destroyed."
        render json: { success: 'El mensaje fue eliminado exitosamente.' }, status: :ok
      else
        Rails.logger.error "Failed to destroy Message with ID ##{@message.id}."
        render json: {
          errors: {
            message: ["No se pudo eliminar el mensaje con el ID ##{@message.id}"]
          }
        }, status: :unprocessable_entity
      end
    end

    private

    def set_group
      @group = Group.find_by(id: params[:group_id])
      return if @group

      Rails.logger.info "Couldn't find Group with ID ##{params[:group_id]}"
      render json: {
        errors: {
          group: ["No se pudo encontrar el grupo con el ID ##{params[:group_id]}"]
        }
      }, status: :not_found
    end

    def set_message
      @message = @group.messages.find(params[:id])
    end

    def ensure_member_access
      return if @group.users.include?(current_user)

      render json: { error: 'Not Authorized' }, status: :forbidden
    end

    def ensure_correct_user_or_admin
      return if @message.user == current_user || @group.admin?(current_user)

      render json: { error: 'Not Authorized' }, status: :forbidden
    end

    def message_params
      params.require(:message).permit(:content)
    end
  end
end
