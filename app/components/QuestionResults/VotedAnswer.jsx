import React, {Component, PropTypes} from 'react';
import Link from 'i18n/Link';
import SocialButtons from 'components/Social/SocialButtons';
import puttext, {getLang} from 'i18n/index';

export default class VotedAnswer extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
  }

  render() {
    const __ = puttext();
    const url = `http://izm.io/${getLang()}/q/${this.props.question.get('id')}`;
    const message = `${this.props.question.get('title')}: ${__('в этом вопросе мой выбор')} ${this.props.answer.getIn(['worldview', 'title'])}`;
    return (
      <div className='VotedAnswerFull'>
        <div className='mdl-typography--body-1'>{__('Ваш выбор')}</div>
        <Link to={`/worldviews/${this.props.answer.getIn(['worldview', 'id'])}`}>
          <div className='mdl-typography--display-1 Help-wrap'>
            {this.props.answer.getIn(['worldview', 'title'])}
            <i className='icon-help-circled Help-icon'></i>
          </div>
        </Link>
        <div className='Social marginTop-single'>
          <div style={{display: 'inline-block'}}>{__('Поделитесь этим с друзьями')}:</div>
          <SocialButtons message={message} url={url} />
        </div>
      </div>
    );
  }
}
