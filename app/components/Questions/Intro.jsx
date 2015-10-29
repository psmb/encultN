import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {getLang} from 'i18n/index';

export default class Intro extends Component {
  static propTypes = {
    isDismissed: PropTypes.string,
    dismissIntro: PropTypes.func.isRequired,
  }

  render() {
    const intro = (
      <div className='Intro Intro--small show-for-small-only mdl-shadow--4dp' >
        <div className='Intro-dismiss' onClick={() => this.props.dismissIntro()}><i className='icon-cancel'></i></div>
        <p className='mdl-typography--body-1-color-contrast'>На важнейшие жизненные вопросы отвечают представители различных мировоззрений. Узнайте, какое из них вам ближе.</p>
        <ul className='Intro-list mdl-typography--body-1-color-contrast'>
          <li><span className='Intro-listNumber'>1</span> Выберите вопрос</li>
          <li><span className='Intro-listNumber'>2</span> Прочитайте все ответы</li>
          <li><span className='Intro-listNumber'>3</span> Проголосуйте за самый близкий</li>
          <li><span className='Intro-listNumber'>4</span> Узнайте, кому он принадлежит</li>
        </ul>
        <Link className='Intro-link mdl-typography--caption' to={`/${getLang()}/about/`}>О проекте <i className='icon-right-circle'></i></Link>
      </div>
    );

    const introDesktop = (
      <div className='Intro hide-for-small Intro--large mdl-shadow--4dp' >
        <div className='Intro-dismiss' onClick={() => this.props.dismissIntro()}><i className='icon-cancel'></i></div>

        <div className='row'>
          <div className='medium-3 columns'>
            <p className='mdl-typography--body-1-color-contrast'>На важнейшие жизненные вопросы отвечают представители различных мировоззрений. Узнайте, какое из них вам ближе.</p>
            <Link className='Intro-link mdl-typography--caption' to={`/${getLang()}/about/`}>О проекте <i className='icon-right-circle'></i></Link>
          </div>
          <div className='medium-9 columns'>
            <p className='mdl-typography--body-1-color-contrast'><strong>Что необходимо для участия:</strong></p>
            <ul className='Intro-list mdl-typography--body-1-color-contrast medium-block-grid-4'>
              <li><span className='Intro-listNumber'>1</span> Выбрать важный для вас вопрос</li>
              <li><span className='Intro-listNumber'>2</span> Прочитать все ответы, отметить те, с которыми вы согласны</li>
              <li><span className='Intro-listNumber'>3</span> Проголосовать за самый близкий вам ответ</li>
              <li><span className='Intro-listNumber'>4</span> Узнать, кому он принадлежит</li>
            </ul>
          </div>
        </div>
      </div>
    );

    const intros = (
      <div>
        {intro}
        {introDesktop}
      </div>
    );

    return (
      <div>{this.props.isDismissed ? '' : intros}</div>
    );
  }
}
