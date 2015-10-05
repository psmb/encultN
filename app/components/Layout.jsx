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
        <main className='mdl-layout__content'>
          <div className='pageContent'>{this.props.children}</div>
        </main>
        <footer className='mdl-mega-footer'>
          <div className='mdl-mega-footer__bottom-section'>
            <div className='mdl-logo'>© Мониторинг мировоззрений</div>
          </div>
        </footer>
      </div>
    );
  }
}
