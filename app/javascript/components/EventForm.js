import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import { Link } from 'react-router-dom';
import { formatDate, isEmptyObject, validateEvent } from '../helpers/helpers';
// import EventNotFound from './EventNotFound';
import 'pikaday/css/pikaday.css';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: props.event,
      errors: {},
    };

  

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentDidMount() {
  new Pikaday({
    field: this.dateInput.current,
    toString: date => formatDate(date),
    onSelect: (date) => {
      const formattedDate = formatDate(date);
      this.dateInput.current.value = formattedDate;
      this.updateEvent('event_date', formattedDate);
    },
  });
}

componentWillReceiveProps({ event }) {
    this.setState({ event });
  }

  // we need to hook into the componentWillReceiveProps lifecycle method 
  // to ensure that the fields are cleared when a user is editing an event, then clicks New Event.



updateEvent(key, value) {
  this.setState(prevState => ({
    event: {
      ...prevState.event,
      [key]: value,
    },
  }));
}


// Thanks to our ref, the field property of the configuration 
// object that we are passing to Pikaday’s constructor, points 
// to DOM element we want to turn into a datepicker. 
// The onSelect method determines what will happen when the 
// user selects a date. In this case, the date is formatted into 
// a YYYY-MM-DD string and the event object we are holding in state is updated.

  handleSubmit(e) {
    e.preventDefault();
    const { event } = this.state;
    const errors = validateEvent(event);
   if (!isEmptyObject(errors)) {
    this.setState({ errors });
  } else {
    const { onSubmit } = this.props;
      onSubmit(event);
    }
}

  // validateEvent(event) {
  //   const errors = {};

  //   if (event.event_type === '') {
  //     errors.event_type = 'You must enter an event type';
  //   }

  //   if (event.event_date === '') {
  //     errors.event_date = 'You must enter a valid date';
  //   }

  //   if (event.title === '') {
  //     errors.title = 'You must enter a title';
  //   }

  //   if (event.speaker === '') {
  //     errors.speaker = 'You must enter at least one speaker';
  //   }

  //   if (event.host === '') {
  //     errors.host = 'You must enter at least one host';
  //   }

  //   console.log(event);
  //   return errors;
  // }

  // isEmptyObject(obj) {
  //   return Object.keys(obj).length === 0;
  // }

  handleInputChange(event) {
    //this methods updates the event obj we have in state so that this.state.event would mirror what's entered in the form
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateEvent(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }


  render() {
    const { event } = this.state;
    // const { path } = this.props;

    // if (!event.id && path === '/events/:id/edit') return <EventNotFound />;

    const cancelURL = event.id ? `/events/${event.id}` : '/events';
    const title = event.id ? `${event.event_date} - ${event.event_type}` : 'New Event';

    return (
      <div>

         <h2>{title}</h2>
      
         {this.renderErrors()}
        <form className="eventForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="event_type">
              <strong>Type:</strong>
              <input type="text" id="event_type" name="event_type" onChange={this.handleInputChange} value={event.event_type}/>
            </label>
          </div>
          <div>
            <label htmlFor="event_date">
              <strong>Date:</strong>
              <input type="text" id="event_date" name="event_date" ref={this.dateInput} autoComplete="off" value={event.event_date} onChange={this.handleInputChange}/>
            </label>
          </div>
          <div>
            <label htmlFor="title">
              <strong>Title:</strong>
              <textarea cols="30" rows="10" id="title" name="title" onChange={this.handleInputChange} value={event.title}/>
            </label>
          </div>
          <div>
            <label htmlFor="speaker">
              <strong>Speakers:</strong>
              <input type="text" id="speaker" name="speaker" onChange={this.handleInputChange}  value={event.speaker}/>
            </label>
          </div>
          <div>
            <label htmlFor="host">
              <strong>Hosts:</strong>
              <input type="text" id="host" name="host" onChange={this.handleInputChange}  value={event.host}/>
            </label>
          </div>
          <div>
            <label htmlFor="published">
              <strong>Publish:</strong>
              <input type="checkbox" id="published" name="published" onChange={this.handleInputChange} checked={event.published}/>
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  event: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

EventForm.defaultProps = {
  event: {
    event_type: '',
    event_date: '',
    title: '',
    speaker: '',
    host: '',
    published: false,
  },
};


export default EventForm;