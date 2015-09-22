import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Link} from 'react-router';
// import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import {VotingContainer} from './containers/Voting/Voting';
import store from './redux/store';
import 'styles/main.scss';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div>
        <h1>App Container</h1>
        <Link to={`/`}>Home</Link>
        <Link to={`/q`}>Voting</Link>
        {this.props.children}
      </div>
    );
  }
}


React.render((
  <Provider store={store}>
    {() => 
      <Router>
        <Route path="/" component={App}>
          <Route path="q" component={VotingContainer} />
          <Route path="q/:id" component={VotingContainer} />
        </Route>
      </Router>
    }
  </Provider>
  ), document.getElementById('root'));
