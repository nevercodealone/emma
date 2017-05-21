Rails.application.routes.draw do
  namespace :backend do
    resources :categories
  end

  root 'application#index'
end
