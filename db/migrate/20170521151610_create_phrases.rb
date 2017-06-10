class CreatePhrases < ActiveRecord::Migration[5.1]
  def change
    create_table :phrases do |t|
      t.text :text
      t.text :translation
      t.references :language
      t.references :category
      t.integer :sort_id, default: 0

      t.timestamps
    end
  end
end
