Rails.application.routes.draw do
  namespace :backend do
    resources :categories do
      resources :phrases do
        member do
          post 'update_translations'
        end
        resources :translations
      end
    end
    resources :languages
    root to: 'categories#index'
  end

  root 'frontend#index'
end
