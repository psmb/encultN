import React from 'react';
import {Provider} from 'react-redux';
import {Route, IndexRoute} from 'react-router';
import {ReduxRouter} from 'redux-router';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import Questions from 'components/Questions';
import Question from 'components/Question';
import QuestionVoting from 'components/QuestionVoting';
import QuestionResults from 'components/QuestionResults';
import Layout from 'components/Layout';
import store from 'redux/store';
import 'styles/main.scss';


const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={Questions} />
    <Route path='q' component={Question} >
      <Route path=':id' component={QuestionVoting} />
      <Route path=':id/results' component={QuestionResults} />
    </Route>
  </Route>
);

class App extends React.Component {
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

React.render(<App />, document.getElementById('root'));
