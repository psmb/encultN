/* eslint indent: [2, 2, {"SwitchCase": 1}] */
import React from 'react';

const isBrowser = !(typeof document === 'undefined' || typeof window === 'undefined');

function click(onClick, url, event) {
  onClick && onClick(event);

  if (isBrowser) {
    window.open(url, '_blank');
  }
}

function getUrl(service, message, url) {
  const msg = message ? [message, url].join(' ') : url;

  switch (service) {
    case 'vkontakte':
      return `http://vk.com/share.php?url=${encodeURIComponent(url)}&description=${encodeURIComponent(message)}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}`;
    default:
      throw new Error(`SocialButton - Service ${service} is not supported`);
  }
}

export default function SocialButton(props) {
  const { children, service, message, url, onClick, ...other } = props;
  const serviceUrl = getUrl(service, message, url);
  return (
    <button {...other} onClick={click.bind(this, onClick, serviceUrl)}>
      { children }
    </button>
  );
}
