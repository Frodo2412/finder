require 'rails_helper'

RSpec.describe MembersController, type: :request do
  # Destroy Member
  describe 'DELETE /members/:id' do
    let(:group) { create :group }
    let(:admin) { create :user }
    let(:member) { create :user }
    let(:another_member) { create :user }

    let(:headersAdmin) do
      post user_session_path, params: { user: { email: admin.email, password: admin.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    let(:headersMember) do
      post user_session_path, params: { user: { email: member.email, password: member.password } }
      { 'Authorization' => response.headers['Authorization'] }
    end

    before do
      @admin_member = group.members.create(user: admin, role: 'admin')
      @member = group.members.create(user: member, role: 'participant')
      @another_member = group.members.create(user: another_member, role: 'participant')
    end

    context "when user is the group's admin" do
      before do
        delete "/members/#{@admin_member.id}", headers: headersAdmin
      end

      it 'deletes the member successfully' do
        expect(response).to have_http_status(:no_content)
        expect(Member.find_by(id: member.id)).to be_nil
      end
    end

    context "when user is a group's member" do
      context 'and tries to remove himself' do
        before do
          delete "/members/#{@member.id}", headers: headersMember
        end

        it 'deletes himself successfully' do
          expect(response).to have_http_status(:no_content)
          expect(Member.find_by(id: member.id)).to be_nil
        end
      end

      context 'and tries to remove another member' do
        before do
          delete "/members/#{@another_member.id}", headers: headersMember
        end

        it 'returns unauthorized status' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'does not delete the other member' do
          expect(Member.find_by(id: @another_member.id)).not_to be_nil
        end
      end

      context 'when member destruction fails' do
        let(:headers) do
          post user_session_path, params: { user: { email: admin.email, password: admin.password } }
          { 'Authorization' => response.headers['Authorization'] }
        end

        before do
          allow_any_instance_of(Member).to receive(:destroy).and_return(false)
          delete "/members/#{@admin_member.id}", headers:
        end

        it 'returns an unprocessable entity status' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns a JSON containing error messages' do
          json_response = response.parsed_body

          expect(json_response['message']).to eq('El miembro no pudo ser eliminado correctamente')
        end
      end
    end
  end
end
