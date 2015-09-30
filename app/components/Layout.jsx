import React from 'react';
import {Link} from 'react-router';

export default class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <header className='mdl-layout__header'>
          <div className='mdl-layout__header-row'>
            <div className='Logo'>
              <svg viewBox='0 0 635.968 572.971'>
                <path stroke='white' fill='white' d='M33.894,559.895c0,0,316-362,316-361s3,0,3,0L33.894,559.895z M44.894,557.895c0,0,314-360,314-359s3,0,3,0L44.894,557.895z
               M51.894,559.895c0,0,316-362,316-361s3,0,3,0L51.894,559.895z M61.894,557.895c0,0,316-360,316-359s3,0,3,0L61.894,557.895z
               M25.894,557.895c0,0,315-360,315-359s3,0,3,0L25.894,557.895z M599.894,16.895l-304,371c0-1-3,0-3,0L599.894,16.895z
               M590.894,18.895l-304,369c0-1-3,0-3,0L590.894,18.895z M582.894,17.895l-305,370c0-1-3,0-3,0L582.894,17.895z M573.894,19.895
              c0,0-306,369-306,368s-3,0-3,0L573.894,19.895z M607.894,18.895l-303,369c0-1-3,0-3,0L607.894,18.895z M529.894,486.895l-180-131
              c1,0,1-2,1-2L529.894,486.895z M529.894,481.895l-176-132c1,0,2-1,2-1L529.894,481.895z M529.894,474.895l-172-131c1,0,2-1,2-1
              L529.894,474.895z M530.894,493.895l-185-132c1,0,1-2,1-2L530.894,493.895z M285.894,241.895c-1,0-2,1-2,1l-178-134L285.894,241.895
              z M280.894,246.895c-1,0-2,1-2,1l-173-134L280.894,246.895z M105.894,120.895l171,131c-1,0-2,1-2,1L105.894,120.895z
               M289.894,235.895c-1,0-2,1-2,1l-184-135L289.894,235.895z'/>
              </svg>
            </div>

            <span className='mdl-layout-title'><Link to={`/`}>Изм</Link></span>
            <div className='mdl-layout-spacer'></div>
          </div>
        </header>
        <div className='mdl-layout__drawer'>
          <span className='mdl-layout-title'>Title</span>
          <nav className='mdl-navigation'>
            <Link to={`/`}>О проекте</Link>
            <Link to={`/`}>Статистика</Link>
          </nav>
        </div>
        <main className='mdl-layout__content'>
          <div className='pageContent'>{this.props.children}</div>
        </main>
      </div>
    );
  }
}
