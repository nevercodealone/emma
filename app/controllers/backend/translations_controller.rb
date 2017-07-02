class Backend::TranslationsController < Backend::BackendController
  def new
    @languages = Language.all
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:phrase_id])
    @translation = @phrase.translations.new
  end

  def show
    @languages = Language.all
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:phrase_id])
    @translation = @phrase.translations.find(params[:id])
  end

  def create
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:phrase_id])
    @translation = @phrase.translations.new(translation_params)

    if @translation.save
      redirect_to backend_category_phrase_path(@category, @phrase), notice: "Translation created"
    else
      render :new
    end
  end

  def edit
    @languages = Language.all
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:phrase_id])
    @translation = @phrase.translations.find(params[:id])
  end

  def update
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:phrase_id])
    @translation = @phrase.translations.find(params[:id])

    if @translation.update(translation_params)
      redirect_to backend_category_phrase_path(@category, @phrase), notice: "Translation updated"
    else
      render :edit
    end
  end

  def destroy
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:phrase_id])
    @translation = @phrase.translations.find(params[:id])

    if @translation.destroy
      redirect_to backend_category_phrase_path(@category, @phrase), notice: "Translation deleted"
    else
      redirect_to backend_category_phrase_path(@category, @phrase), error: "Can't delete Translation"
    end
  end

  private

  def translation_params
    params.require(:translation).permit(
      :text,
      :phrase_id,
      :language_id
    )
  end
end
