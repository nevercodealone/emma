Rails.application.routes.draw do
  namespace :backend do
    resources :categories do
      resources :phrases
    end
    resources :languages
    root to: 'categories#index'
  end

  root 'frontend#index'
end
