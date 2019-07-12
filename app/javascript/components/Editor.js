import React from 'react';
import axios from 'axios';
import Header from './Header';
import EventList from './EventList';
import PropTypes from 'prop-types';
import PropsRoute from './PropsRoute';
import Event from './Event';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: null,
    };
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
        <EventList events={events} />
        <PropsRoute path="/events/:id" component={Event} event={event} />
        </div>


      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
};

Editor.defaultProps = {
  match: undefined,
};


export default Editor;
// If you look at the render method, you’ll notice we’re using a new component called <PropsRoute>. 
// This is because when a user selects an event, we want to pass that event to the <Event> component, so that it can display it. 
// Unfortunately, out of the box, React Router doesn’t offer an easy way to pass props to a route, so we’re left to write this ourselves.