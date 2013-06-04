class Stocks < ActiveRecord::Migration
  def up
    create_table :stocks do |t|
      t.string :symbol
      t.decimal :quantity

      t.timestamps
    end
  end

  def down
  end
end
