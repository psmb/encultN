import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import puttext from 'i18n/index';

@connect(state => ({
  blogs: state.blogs,
}))
export default class Blog extends Component {
  static propTypes = {
    blogs: PropTypes.object,
    params: PropTypes.object,
  }

  render() {
    const __ = puttext();
    const blogData = this.props.blogs ? this.props.blogs.get(this.props.params.id) : null;
    const blog = blogData ? (
      <div>
        <h1 className='mdl-typography--display-1-color-contrast Blog-title'>{blogData.get('title')}</h1>
        <p className='mdl-typography--headline-color-contrast'>{blogData.get('authorName')}</p>
        <p className='mdl-typography--body-2-color-contrast'>{blogData.get('date')}</p>
        <p className='mdl-typography--body-2-color-contrast' dangerouslySetInnerHTML={{__html: blogData.get('teaser')}} />
        <p className='mdl-typography--body-1-color-contrast' dangerouslySetInnerHTML={{__html: blogData.get('bodytext')}} />
      </div>
    ) : __('Минуточку...');
    return (
      <div>
        <div className='row'>
          <div className='Blogs medium-10 medium-offset-1 large-8 large-offset-2 columns fixed-width '>
            {blog}
          </div>
        </div>
      </div>
    );
  }
}
