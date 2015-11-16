import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import BlogSmall from './BlogSmall';
import puttext, {getLang} from 'i18n/index';

@connect(state => ({
  blogs: state.blogs,
}))
export default class Blog extends Component {
  static propTypes = {
    blogs: PropTypes.object,
    params: PropTypes.object,
  }

  render() {
    moment.locale(getLang());
    const __ = puttext();
    const blogData = this.props.blogs ? this.props.blogs.get(this.props.params.id) : null;
    const blog = blogData ? (
      <div>
        <p className='Blog-authorName marginTop-triple mdl-typography--display-1-color-contrast'>{blogData.get('authorName')}</p>
        <p className='Blog-authorTitle marginBottom-triple mdl-typography--title-color-contrast'>{blogData.get('authorTitle')}</p>
        <div className='row'>
          <div className='medium-10 medium-offset-1 columns'>
            <h1 className='Blog-title marginVertical-double mdl-typography--headline-color-contrast Blog-title'>{blogData.get('title')}</h1>
            <p className='Blog-date marginBottom-triple mdl-typography--caption-color-contrast'>{moment(blogData.get('date')).format('LL')}</p>
            <p className='Blog-teaser marginVertical-triple mdl-typography--body-2-color-contrast' dangerouslySetInnerHTML={{__html: blogData.get('teaser')}} />
            <div className='Blog-bodytext typo3-neos-nodetypes-text' dangerouslySetInnerHTML={{__html: blogData.get('bodytext')}} />
          </div>
        </div>
      </div>
    ) : (<div className='Loader'>{__('Минуточку...')} <i className='icon-spinner animate-spin' /></div>);

    const blogs = this.props.blogs ? this.props.blogs.map((item) => {
      if (item.get('id') !== this.props.params.id) {
        return (
          <BlogSmall key={item.get('id')} blog={item} />
        );
      }
    }).toArray() : '';
    return (
      <div className='fixed-width'>
        {blog}
        <div className='row'>
          <div className='medium-10 medium-offset-1 columns'>
            {blogs}
          </div>
        </div>
      </div>
    );
  }
}
