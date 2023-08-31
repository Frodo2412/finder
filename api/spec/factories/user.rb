FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "Name_#{n}" }
    sequence(:email) { |n| "email_#{n}@fing.edu.uy" }
    password { 'Test#123' }
    birth_date { Date.parse('2023-01-01') }
  end
end
