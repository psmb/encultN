import React from 'react';
import {Link} from 'react-router';
import puttext, {setLang} from 'i18n/index';

export default class Root extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    params: React.PropTypes.object,
  }

  componentWillMount() {
    setLang(this.props.params.lang);
  }

  render() {
    const __ = puttext();
    return (
      <div className=''>
        <header className='Header'>
          <div className='fixed-width'>
            <div className='columns'>
              <Link className='Header-logo' to={`/${this.props.params.lang}`}><img src='/static/logo.svg' /></Link>
            </div>
          </div>
        </header>
        <main className=''>
          {this.props.children}
        </main>
        <footer className='Footer'>
          <div className='Footer-inner fixed-width'>
            © {__('Мониторинг мировоззрений')}<br/>
            {__('Дизайн и разработка:')} <a href='http://sfi.ru'>{__('веб служба СФИ')}</a>
          </div>
        </footer>
      </div>
    );
  }
}
