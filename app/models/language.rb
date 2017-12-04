class Language < ApplicationRecord
  has_many :translations

  validates_presence_of :name, :key
end
