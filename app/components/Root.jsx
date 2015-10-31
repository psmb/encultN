import React from 'react';
import {Link as LinkR} from 'react-router';
import Link from 'i18n/Link';
import puttext, {getLang} from 'i18n/index';


export default class Root extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    params: React.PropTypes.object,
    location: React.PropTypes.object,
  }

  render() {
    const __ = puttext();
    const linkEn = <LinkR to={this.props.location.pathname.replace('/ru', '/en')}>In English</LinkR>;
    const linkRu = <LinkR to={this.props.location.pathname.replace('/en', '/ru')}>In Russian</LinkR>;
    return (
      <div className=''>
        <header className='Header'>
          <div className='fixed-width'>
            <div className='columns'>
              <Link className='Header-logo' to={``}><img src='/static/logo.svg' /></Link>
              <div className='float-right Menu'>
                <Link to={`/about`}>{__('О проекте')}</Link>
                <Link to={`/stats`}>{__('Статистика')}</Link>
                <Link to={`/analytics`}>{__('Аналитика')}</Link>
                {getLang() === 'ru' ? linkEn : linkRu}
              </div>
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
