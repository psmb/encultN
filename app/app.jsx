import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {ReduxRouter} from 'redux-router';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import {QuestionsContainer} from './containers/Questions/Questions';
import {VotingContainer} from './containers/Voting/Voting';
import Layout from './containers/Layout';
import store from './redux/store';
import 'styles/main.scss';


const routes = (
  <Route path='' component={Layout}>
    <Route path='/' component={QuestionsContainer} />
    <Route path='q/:id' component={VotingContainer} />
  </Route>
);

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableDevTools: false,
    };
  }

  componentDidMount() {
    this.setState({
      enableDevTools: document.cookie.indexOf('enableDevTools=true') !== -1,
    });
  }

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
        {this.state.enableDevTools ? devTools : ''}
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('root'));
