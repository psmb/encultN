import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {selectQuestion} from 'redux/modules/voting';
import {fetchBlogs, fetchBlog} from 'redux/modules/blogs';
import Questions from 'components/Questions/Questions';
import Question from 'components/Question';
import About from 'components/About/About';
import Stats from 'components/Stats/Stats';
import Blogs from 'components/Blogs/Blogs';
import Blog from 'components/Blogs/Blog';
import Worldviews from 'components/Worldviews/Worldviews';
import Worldview from 'components/Worldviews/Worldview';
import Root from 'components/Root';
import store from 'redux/store';
import {setLang} from 'i18n/index';

const routes = (
  <Route path='/:lang' component={Root} onEnter={(nextState) => setLang(nextState.params.lang)}>
    <IndexRoute component={Questions} />
    <Route path='q/:id' component={Question} onEnter={(nextState) => store.dispatch(selectQuestion(nextState.params.id))} />
    <Route path='about' component={About} />
    <Route path='stats' component={Stats} />
    <Route path='analytics' component={Blogs} onEnter={() => store.dispatch(fetchBlogs())} />
    <Route path='analytics/:id' component={Blog} onEnter={(nextState) => store.dispatch(fetchBlog(nextState.params.id))}/>
    <Route path='worldviews' component={Worldviews} />
    <Route path='worldviews/:id' component={Worldview} />
  </Route>
);
export default routes;
