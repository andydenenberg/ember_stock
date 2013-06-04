class Stock < ActiveRecord::Base
  validates :symbol, :presence => true
  validates :quantity, :presence => true
  belongs_to :contact
  
end