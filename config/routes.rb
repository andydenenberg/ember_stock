EmberDataExample::Application.routes.draw do
  resources :contacts
  resources :stocks
  match 'reference' => 'application#reference'
  match 'index' => 'application#index'
  match 'home' => 'application#home'
  root :to => 'application#home'
#  match '/*path' => 'application#index'
end
