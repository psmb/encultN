import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import 'babel/polyfill';
import getStore from 'redux/store';
import getRoutes from 'redux/routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
if (process.env.BROWSER) {
  require('styles/main.scss');
}

const store = getStore();
const routes = getRoutes(store);
const history = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history} routes={routes} />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
