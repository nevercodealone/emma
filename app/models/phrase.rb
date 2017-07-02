class Phrase < ApplicationRecord
  belongs_to :category
  has_many :translations

  before_save :fill_translation

  def fill_translation
    if self.translation.blank?
      translate = Google::Apis::TranslateV2::TranslateService.new
      translate.key = GOOGLE_API_KEY
      result = translate.list_translations(self.text, self.language.key, source: 'de', format: 'text')
      if result.translations.count > 0
        self.translation = result.translations.first.translated_text
      end
    end

    true
  end
end
