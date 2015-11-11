import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';
import puttext from 'i18n/index';
if (process.env.BROWSER) {
  require('./Intro.scss');
}

export default class Intro extends Component {
  static propTypes = {
    isDismissed: PropTypes.string,
  }

  render() {
    const __ = puttext();
    return (
      <div className='row'>
        <div className='medium-8 columns'>
          <div className='Intro'>
            <p className='mdl-typography--body-1-color-contrast'>
              {__('На важнейшие жизненные вопросы отвечают представители различных мировоззрений. Вы выбираете ответ вслепую, не зная, к какому именно мировоззрению или движению относится его автор. Только сделав выбор, вы узнаёте, что вы выбрали.')}
            </p>
            <Link className='Intro-link mdl-typography--caption' to={`/about/`}>
              {__('Зачем это нужно?')} <i className='icon-right-circle'></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
