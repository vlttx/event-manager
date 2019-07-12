import React from 'react';
import axios from 'axios';
import Header from './Header';
import EventList from './EventList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Event from './Event';
import { Switch } from 'react-router-dom';
import EventForm from './EventForm';


class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
    };
    this.addEvent = this.addEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    // using lifecycle hook to fetch events from the API
    axios
      .get('/api/events.json')
      .then(response => this.setState({ events: response.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  addEvent(newEvent) {
    axios
      .post('/api/events.json', newEvent)
      .then((response) => {
        alert('Event Added!');
        const savedEvent = response.data;
        this.setState(prevState => ({
          events: [...prevState.events, savedEvent],
        }));
        const { history } = this.props;
        history.push(`/events/${savedEvent.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteEvent(eventId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/events/${eventId}.json`)
        .then((response) => {
          if (response.status === 204) {
            alert('Event deleted');
            const { history } = this.props;
            history.push('/events');
            //redirecting user to events

            const { events } = this.state;
            this.setState({ events: events.filter(event => event.id !== eventId) });
            //deleting event from state
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }


  render() {
    const { events } = this.state;
    if (events === null) return null;
    // have to guard in case nothing is rendered, but if fetched
    // we will render the eventlist
    const { match } = this.props;
    const eventId = match.params.id;
    const event = events.find(e => e.id === Number(eventId));

    return (
      <div>
        <Header />
        <div className="grid">
        <EventList events={events} activeId={Number(eventId)}/>
        <Switch>
            <PropsRoute path="/events/new" component={EventForm} onSubmit={this.addEvent}/>
            <PropsRoute path="/events/:id" component={Event} event={event} onDelete={this.deleteEvent}/>
          </Switch>
        </div>


      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};


export default Editor;
// If you look at the render method, you’ll notice we’re using a new component called <PropsRoute>. 
// This is because when a user selects an event, we want to pass that event to the <Event> component, so that it can display it. 
// Unfortunately, out of the box, React Router doesn’t offer an easy way to pass props to a route, so we’re left to write this ourselves.


//  <Switch> component, which will render the first child <Route> that matches the location. 
// This is practical, as we don’t want the new event form and the <Event> component to display at once.


// use the history object,
//  which is made available to us by React Router, to change the URL to that of the newly created event.






