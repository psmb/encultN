import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import 'babel/polyfill';
import store from 'redux/store';
import routes from 'redux/routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import 'styles/main.scss';

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={history} routes={routes} />
          }
        </Provider>
      </div>
    );
  }
}

React.render(<App />, document.getElementById('root'));
