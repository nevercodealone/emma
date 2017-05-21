Rails.application.routes.draw do
  namespace :backend do
    resources :categories do
      resources :phrases
    end
    resources :languages
  end

  root 'application#index'
end
