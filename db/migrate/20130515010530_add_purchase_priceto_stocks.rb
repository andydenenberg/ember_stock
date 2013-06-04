class AddPurchasePricetoStocks < ActiveRecord::Migration
  def change
    add_column :stocks, :purchase_price, :decimal
    add_column :stocks, :last_price, :decimal
  end

  def down
  end
end
