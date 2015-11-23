Rails.application.routes.draw do
  root 'maps#index'
  namespace :maps do
    resources :spanish
  end

  get 'states/:name', to: 'states#show'
end
