class Phrase < ApplicationRecord
  belongs_to :category
  has_many :translations

  def update_translations
    Language.all.each do |language|
      translation = Translation.where(phrase_id: self.id, language_id: language.id).first_or_create

      if translation.text.blank?
        translate = Google::Apis::TranslateV2::TranslateService.new
        translate.key = GOOGLE_API_KEY
        result = translate.list_translations(self.text, language.key, source: 'de', format: 'text')
        if result.translations.count > 0
          translation.text = result.translations.first.translated_text
          translation.save
        end
      end

      translation.text.to_file(language.key, File.join(Rails.root, 'public', 'uploads', 'tts', "translation-#{translation.id}-#{language.key}.mp3").to_s)
    end
  end
end
