import {Map} from 'immutable';
import {createAction} from 'redux-actions';
import * as api from '../api';

// const SELECT_BLOG = 'blogs/SELECT_BLOG';
const FETCH_BLOGS = 'blogs/FETCH_BLOGS';
const FETCH_BLOG = 'blogs/FETCH_BLOG';

const initialState = Map();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case FETCH_BLOGS:
    return action.payload;
  case FETCH_BLOG:
    return state.set(action.payload.get('id'), action.payload);
  default:
    return state;
  }
}

export const fetchBlogs = createAction(FETCH_BLOGS, async () => {
  return await api.fetchBlogsPromise();
});

export const fetchBlog = createAction(FETCH_BLOG, async (path) => {
  return await api.fetchBlogPromise(path);
});
