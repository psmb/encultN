import React from 'react';
import {Link} from 'react-router';

export default class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <header className='mdl-layout__header'>
          <div className='mdl-layout__header-row'>
            <span className='mdl-layout-title'><Link to={`/`}>Изм</Link></span>
            <div className='mdl-layout-spacer'></div>
          </div>
        </header>
        <div className='mdl-layout__drawer'>
          <span className='mdl-layout-title'>Title</span>
          <nav className='mdl-navigation'>
            <Link to={`/`}>О проекте</Link>
            <Link to={`/`}>Статистика</Link>
          </nav>
        </div>
        <main className='mdl-layout__content'>
          <div className='pageContent'>{this.props.children}</div>
        </main>
      </div>
    );
  }
}
