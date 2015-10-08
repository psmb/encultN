import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Stats extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div className='Stats mdl-shadow--4dp' >
        <div className='fixed-width'>
          <p className='mdl-typography--caption'>Лидеры голосования</p>
          <p className='mdl-typography--subhead'>Православие: <span className='mdl-typography--subhead'>123</span></p>
          <p className='mdl-typography--subhead'>Католичество: <span className='mdl-typography--subhead'>65</span></p>
          <p className='mdl-typography--subhead'>Протестантизм: <span className='mdl-typography--subhead'>18</span></p>
          <Link className='button mdl-button mdl-button--raised' to={`/stats/`}>Статистика</Link>
        </div>
      </div>
    );
  }
}
