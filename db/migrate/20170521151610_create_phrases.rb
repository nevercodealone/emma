class CreatePhrases < ActiveRecord::Migration[5.1]
  def change
    create_table :phrases do |t|
      t.string :text
      t.string :translation
      t.references :language
      t.references :category

      t.timestamps
    end
  end
end
