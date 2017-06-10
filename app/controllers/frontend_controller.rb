class FrontendController < ApplicationController
  helper_method :current_language

  def index
    @languages = Language.all
    @categories = Category.all
  end

  private

  def current_language
    if params[:language].present?
      return Language.where(key: params[:language]).first
    else
      return Language.first
    end
  end
end
