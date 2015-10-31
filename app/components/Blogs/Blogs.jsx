import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BlogSmall from './BlogSmall';
import puttext from 'i18n/index';

@connect(state => ({
  blogs: state.blogs,
}))
export default class Blogs extends Component {
  static propTypes = {
    blogs: PropTypes.object,
  }

  render() {
    const __ = puttext();
    const blogs = this.props.blogs ? this.props.blogs.map((blog) => {
      return (
        <BlogSmall key={blog.get('id')} blog={blog} />
      );
    }).toArray() : __('Минуточку...');

    return (
      <div>
        <div className='row'>
          <div className='Blogs medium-10 medium-offset-1 large-8 large-offset-2 columns fixed-width '>
            {blogs}
          </div>
        </div>
      </div>
    );
  }
}
