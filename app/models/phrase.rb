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

          supported_languages = ['af', 'ar', 'az', 'be', 'bg', 'bn', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en', 'en_us', 'en_gb', 'en_au', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'ga', 'gl', 'gu', 'hi', 'hr', 'ht', 'hu', 'id', 'is', 'it', 'iw', 'ja', 'ka', 'kn', 'ko', 'la', 'lt', 'lv', 'mk', 'ms', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sq', 'sr', 'sv', 'sw', 'ta', 'te', 'th', 'tl', 'tr', 'uk', 'ur', 'vi', 'yi', 'zh', 'zh-CN', 'zh-TW']
          if supported_languages.include? language.key
            begin
              translation.text.to_file(language.key, File.join(Rails.root, 'public', 'uploads', 'tts', "translation-#{translation.id}-#{language.key}.mp3").to_s)
            rescue SystemExit
            end
          end
        end
      end
    end
  end
end
