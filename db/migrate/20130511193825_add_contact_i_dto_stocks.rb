class AddContactIDtoStocks < ActiveRecord::Migration
  def change
        add_column :stocks, :contact_id, :integer
  end

  def down
  end
end
