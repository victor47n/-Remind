import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import Recovery from './pages/Recovery';

import './global.css'


function App() {
  return (
    <Router>
    <Switch> 
      <Route  path="/reset_password/:email/:token" component={Recovery}/>
    </Switch>
  </Router>
    
  );
  
}

/*function Source() {
  const { email , token  } = useParams();
  return (
    <Switch>
      <Route
        exact
        path="/reset_password/:email/:token"
        render={(props) => <Recovery {...props} email={email} token={token} />}
        email={email}
        token={token}

      />
    </Switch>
  );
}*/
export default App;
