Rails.application.routes.draw do
  root to: redirect('/events')

  get 'events', to: 'site#index'
  get 'events/new', to: 'site#index'
  get 'events/:id', to: 'site#index'
  get 'events/:id/edit', to: 'site#index'

  namespace :api do
    resources :events, only: %i[index show create destroy update]
  end
end


# In the first line we’re pointing our root route to http://localhost:3000/events, 
# this is purely for aesthetic reasons. However in the four lines that follow, 
# you can see that we are informing Rails about the routes we will be using in our React application. 
# This is important, as otherwise if a user requested any of these routes directly 
# (by refreshing the page, for example), Rails would know nothing about them and would respond with a 404. 
# Doing things this way means that Rails can simply serve our React app and let it work out which view to display.