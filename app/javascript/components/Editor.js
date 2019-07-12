import React from 'react';
import axios from 'axios';
import Header from './Header';
import EventList from './EventList';

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
    //have to guard in case nothing is rendered, but if fetched we will render the eventlist

    return (
      <div>
        <Header />
        <EventList events={events} />
      </div>
    );
  }
}

export default Editor;