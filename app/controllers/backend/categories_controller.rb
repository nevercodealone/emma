class Backend::CategoriesController < Backend::BackendController
  def index
    @categories = Category.all
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      redirect_to backend_categories_path, notice: "Fitness Goal created"
    else
      render :new
    end
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])

    if @category.update(category_params)
      redirect_to backend_categories_path, notice: "Fitness Goal updated"
    else
      render :edit
    end
  end

  def destroy
    @category = Category.find(params[:id])

    if @category.destroy
      redirect_to backend_categories_path, notice: "Category deleted"
    else
      redirect_to backend_categories_path, error: "Can't delete"
    end
  end

  private

  def category_params
    params.require(:category).permit(
      :name
    )
  end
end
