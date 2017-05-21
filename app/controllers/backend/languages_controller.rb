class Backend::LanguagesController < Backend::BackendController
  def index
    @languages = Language.all
  end

  def new
    @language = Language.new
  end

  def create
    @language = Language.new(language_params)

    if @language.save
      redirect_to backend_languages_path, notice: "Language created"
    else
      render :new
    end
  end

  def edit
    @language = Language.find(params[:id])
  end

  def update
    @language = Language.find(params[:id])

    if @language.update(language_params)
      redirect_to backend_languages_path, notice: "Language updated"
    else
      render :edit
    end
  end

  def destroy
    @language = Language.find(params[:id])

    if @language.destroy
      redirect_to backend_languages_path, notice: "Language deleted"
    else
      redirect_to backend_languages_path, error: "Can't delete Language"
    end
  end

  private

  def language_params
    params.require(:language).permit(
      :name,
      :key
    )
  end
end
