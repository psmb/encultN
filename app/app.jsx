import React from 'react';
import {Provider} from 'react-redux';
import {Route, IndexRoute} from 'react-router';
import {ReduxRouter} from 'redux-router';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import 'babel/polyfill';
import Questions from 'components/Questions';
import Question from 'components/Question';
import Layout from 'components/Layout';
import store from 'redux/store';
import 'styles/main.scss';


const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Questions} />
    <Route path='q/:id' component={Question} />
  </Route>
);

class App extends React.Component {
  render() {
    const devTools = (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );

    return (
      <div>
        <Provider store={store}>
          {() =>
            <ReduxRouter routes={routes} />
          }
        </Provider>
        {devTools}
      </div>
    );
  }
}

React.render(<App />, document.getElementById('root'));
