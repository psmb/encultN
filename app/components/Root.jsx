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

  constructor(props) {
    super(props);
    this.state = {
      mobileNavOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({
      mobileNavOpen: !this.state.mobileNavOpen,
    });
  }

  render() {
    const __ = puttext();
    const linkEn = <a className='MenuItem' href={this.props.location.pathname.replace('/ru', '/en')}>English</a>;
    const linkRu = <a className='MenuItem' href={this.props.location.pathname.replace('/en', '/ru')}>Russian</a>;
    const menu = (
      <div>
        <Link className='MenuItem' to={`/about`}>{__('О проекте')}</Link>
        <Link className='MenuItem' to={`/stats`}>{__('Статистика')}</Link>
        <Link className='MenuItem' to={`/analytics`}>{__('Аналитика')}</Link>
        {getLang() === 'ru' ? linkEn : linkRu}
      </div>
    );
    return (
      <div className={this.state.mobileNavOpen ? 'MobileNav isActive' : 'MobileNav'}>
        <div className='MobileNav-Content'>
          <div className='fixed-width'>
            <header className='Header'>
              <div className='columns'>
                <Link className='Header-logo' to={``}><img src={'/static/logo-' + getLang() + '.svg'} /></Link>
                <div onClick={this.toggleMenu} className='show-for-small-only MobileNav-Toggle'>
                  <div className='IconMenu'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 32 32'>
                      <path d='M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z'/>
                    </svg>
                  </div>
                </div>
                <div className='hide-for-small-only float-right Menu'>
                  {menu}
                </div>
              </div>
            </header>
          </div>
          <main className='Main'>
            {this.props.children}
          </main>
          <footer className='Footer'>
            <div className='Footer-inner fixed-width'>
              © {__('Мониторинг мировоззрений')}<br/>
              {__('Дизайн и разработка:')} <a href='http://sfi.ru'>{__('веб-служба Свято-Филаретовского православного-христианского института')}</a>
            </div>
          </footer>
        </div>
        <div className='MobileNav-Menu show-for-small-only'>
          {menu}
        </div>
      </div>
    );
  }
}
