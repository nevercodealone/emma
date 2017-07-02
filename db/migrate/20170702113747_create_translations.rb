class CreateTranslations < ActiveRecord::Migration[5.1]
  def change
    remove_column :phrases, :translation
    remove_column :phrases, :language_id

    create_table :translations do |t|
      t.references :phrase
      t.references :language
      t.text :text

      t.timestamps
    end
  end
end
