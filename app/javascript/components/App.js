import React from 'react';
import { Route } from 'react-router-dom';
import Editor from './Editor';

const App = () => (
 <div>
    <Route path="/events/:id?" component={Editor} />
  </div>
);

export default App;


// Instead of rendering our <Editor> component directly, we will now use a <Route> 
// component to render it whenever the browser’s URL matches the route’s path. 
// As we have made the :id part of the route optional (due to the question mark) 
// and we are pointing our root route at /events, this will always be the case.
// By doing things this way, we will have access to the URL params within the <Editor> component,
//  that will come in handy later on for determining which event we are dealing with.


