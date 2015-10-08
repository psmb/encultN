import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Intro extends Component {
  static propTypes = {
    isDismissed: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className='Intro mdl-shadow--4dp' >
        <p className='mdl-typography--body-1-color-contrast'>На важнейшие жизненные вопросы отвечают представители различных религий и мировоззрений. Узнайте какое из них Вам ближе.</p>
        <ul className='Intro-list mdl-typography--body-1-color-contrast'>
          <li><span className='Intro-listNumber'>1</span> Выберите вопрос</li>
          <li><span className='Intro-listNumber'>2</span> Прочитайте все ответы</li>
          <li><span className='Intro-listNumber'>3</span> Проголосуйте за самый близкий</li>
          <li><span className='Intro-listNumber'>4</span> Узнайте, кому он принадлежит</li>
        </ul>
        <Link className='button mdl-button mdl-button--raised mdl-button--colored' to={`/about/`}>О проекте</Link>
      </div>
    );
  }
}
