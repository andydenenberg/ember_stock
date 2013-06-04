class ContactSerializer < ActiveModel::Serializer
  attributes :id,
             :first_name,
             :last_name,
             :email,
             :notes

  has_many :phone_numbers, embed: :objects
  has_many :stocks, embed: :objects
end
