class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string :name
      t.integer :sort_id, default: 0

      t.timestamps
    end
  end
end
