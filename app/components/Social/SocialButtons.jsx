import React, {PropTypes} from 'react';
import SocialButton from './SocialButton';

export default function SocialButtons(props) {
  return (
    <div className='Social-buttons'>
      <SocialButton className='Social-button' service='facebook' message={props.message} url={props.url}><i className='icon-facebook'></i></SocialButton>
      <SocialButton className='Social-button' service='twitter' message={props.message} url={props.url}><i className='icon-twitter'></i></SocialButton>
      <SocialButton className='Social-button' service='vkontakte' message={props.message} url={props.url}><i className='icon-vkontakte'></i></SocialButton>
    </div>
  );
}

SocialButtons.propTypes = {
  message: PropTypes.string,
  url: PropTypes.string.isRequired,
};
