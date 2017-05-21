class Backend::PhrasesController < Backend::BackendController
  def index
    @category = Category.find(params[:category_id])
    @phrases = @category.phrases.all
  end

  def new
    @languages = Language.all
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.new
  end

  def create
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.new(phrase_params)

    if @phrase.save
      redirect_to backend_category_phrases_path(@category), notice: "Phrase created"
    else
      render :new
    end
  end

  def edit
    @languages = Language.all
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:id])
  end

  def update
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:id])

    if @phrase.update(phrase_params)
      redirect_to backend_category_phrases_path(@category), notice: "Phrase updated"
    else
      render :edit
    end
  end

  def destroy
    @category = Category.find(params[:category_id])
    @phrase = @category.phrases.find(params[:id])

    if @phrase.destroy
      redirect_to backend_category_phrases_path(@category), notice: "Phrase deleted"
    else
      redirect_to backend_category_phrases_path(@category), error: "Can't delete Phrase"
    end
  end

  private

  def phrase_params
    params.require(:phrase).permit(
      :text,
      :translation,
      :language_id
    )
  end
end
