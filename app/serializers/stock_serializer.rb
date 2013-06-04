class StockSerializer < ActiveModel::Serializer
  attributes :id,
             :symbol,
             :quantity,
             :purchase_price,
             :last_price,
             :contact_id,
             :created_at,
             :created_date
             
   def created_date               
     "#{object.created_at.strftime("%m/%d/%Y")}"  # prepare for javascript
   end


end
