import React from 'react';
import {Provider} from 'react-redux';
import {Route, Link} from 'react-router';
import {ReduxRouter} from 'redux-router';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import {VotingContainer} from './containers/Voting/Voting';
import store from './redux/store';
import 'styles/main.scss';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <header className='mdl-layout__header'>
          <div className='mdl-layout__header-row'>
            <span className='mdl-layout-title'><Link to={`/`}>Инкультурация</Link></span>
            <div className='mdl-layout-spacer'></div>
            <nav className='mdl-navigation mdl-layout--large-screen-only'>
              <Link to={`/q/1`}>Voting</Link>
            </nav>
          </div>
        </header>
        <div className='mdl-layout__drawer'>
          <span className='mdl-layout-title'>Title</span>
          <nav className='mdl-navigation'>
            <Link to={`/q/1`}>Voting</Link>
          </nav>
        </div>
        <main className='mdl-layout__content'>
          <div className='pageContent'>{this.props.children}</div>
        </main>
      </div>
    );
  }
}


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
            <ReduxRouter>
              <Route path="/" component={App}>
                <Route path="q" component={VotingContainer} />
                <Route path="q/:id" component={VotingContainer} />
              </Route>
            </ReduxRouter>
          }
        </Provider>
        {this.state.enableDevTools ? devTools : ''}
      </div>
    );
  }
}

React.render(<Root />, document.getElementById('root'));
