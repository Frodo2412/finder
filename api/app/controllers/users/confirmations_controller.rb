module Users
  class ConfirmationsController < Devise::ConfirmationsController
    # GET /users/confirmation?confirmation_token=
    def show
      resource = resource_class.confirm_by_token(params[:confirmation_token])
      yield resource if block_given?

      return unless resource.errors.empty?

      # TODO: redirect to finder home page
      redirect_to 'https://finder-git-develop-frodo2412.vercel.app/signin', allow_other_host: true

      # else
      # TODO: redirect to generic error in front
      # redirect_to 'url error page'
      # end
    end
  end
end
