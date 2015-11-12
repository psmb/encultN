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
      <div className='fixed-width'>
        <div className='row'>
          <div className='medium-8 columns'>
            <h1 className='marginVertical-triple mdl-typography--display-1-color-contrast'>Аналитика</h1>
            <p className='marginVertical-triple mdl-typography--body-1-color-contrast'>
              {__('Здесь ваш мировоззренческий выбор обсуждают представители общественности и различных направлений науки. Благодаря им вы можете узнать, почему вы сделали тот или иной выбор, что это значит и чем это может для вас обернуться.')}
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='Blogs medium-10 medium-offset-1 columns'>
            {blogs}
          </div>
        </div>
      </div>
    );
  }
}
