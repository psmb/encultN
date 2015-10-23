import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {Initializer as YM} from 'react-yandex-metrika';
// import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import 'babel/polyfill';
import store from 'redux/store';
import routes from 'redux/routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import 'styles/main.scss';

const history = createBrowserHistory();

class App extends React.Component {
  render() {
    // const devTools = (() => {
    //   return (
    //     <DebugPanel top right bottom>
    //       <DevTools
    //         store={store}
    //         monitor={LogMonitor}
    //         visibleOnLoad={document.cookie.indexOf('enableDevTools=true') !== -1}
    //       />
    //     </DebugPanel>
    //   );
    // }());

    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={history} routes={routes} />
          }
        </Provider>
        <YM />
      </div>
    );
  }
}

React.render(<App />, document.getElementById('root'));
