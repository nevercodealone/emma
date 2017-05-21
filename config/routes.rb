Rails.application.routes.draw do
  namespace :backend do
    resources :categories
    resources :languages
  end

  root 'application#index'
end
