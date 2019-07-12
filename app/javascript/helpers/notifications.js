import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

// Uncomment as needed
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';
// import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
// import 'react-s-alert/dist/s-alert-css-effects/flip.css';
// import 'react-s-alert/dist/s-alert-css-effects/genie.css';
// import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
// import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

const defaults = {
  position: 'top-right',
  effect: 'scale',
  timeout: 3500,
  offset: 45,
};

export { Alert };

export const success = (message, options = {}) => {
  Alert.success(message, Object.assign(defaults, options));
};

export const info = (message, options = {}) => {
  Alert.info(message, Object.assign(defaults, options));
};

export const warning = (message, options = {}) => {
  Alert.warning(message, Object.assign(defaults, options));
};

export const error = (message, options = {}) => {
  Alert.error(message, Object.assign(defaults, options));
};


// A centralized place to set some sensible defaults, 
//  reduce the boilerplate when calling the flash messages. 
// including the scale effect to animate the display of the messages. 
// Note that there are a whole bunch of other effects which can be tried 
// out by uncommenting the appropriate line and altering the default options accordingly.