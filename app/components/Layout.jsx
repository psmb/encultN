import React from 'react';
import {Link} from 'react-router';

export default class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div className=''>
        <header className='Header'>
          <div className='fixed-width'>
            <div className='columns'>
              <Link className='Header-logo' to={`/`}><img src='/static/logo.svg' /></Link>
            </div>
          </div>
        </header>
        <main className=''>
          {this.props.children}
        </main>
        <footer className='Footer'>
          <div className='Footer-inner fixed-width'>© Мониторинг мировоззрений</div>
        </footer>
      </div>
    );
  }
}
