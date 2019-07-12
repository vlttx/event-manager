class Api::EventsController < ApplicationController
  respond_to :json

  def index
    respond_with Event.order(event_date: :DESC)
  end

  def show
    respond_with Event.find(params[:id])
  end

  def create
    respond_with :api, Event.create(event_params)
  end

  def destroy
    respond_with Event.destroy(params[:id])
  end

  def update
    event = Event.find(params['id'])
    event.update(event_params)
    respond_with Event, json: event
  end

  private

  def event_params
    params.require(:event).permit(
      :id,
      :event_type,
      :event_date,
      :title,
      :speaker,
      :host,
      :published
    )
  end
end


# Here we start off by declaring that our controller will respond to JSON requests. We then define controller methods 
# corresponding to the CRUD actions we wish to perform, then finish off by listing which parameters may be used for mass assignment.


# Notice the use of the respond_with method which allows us to render a resource as JSON. 
# Without this method, you would write something like:

# def index
#   respond_to do |format|
#     format.json { render json: Event.order(event_date: :DESC) }
#   end
# end