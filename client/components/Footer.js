import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'ALL',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

class Footer extends Component {
  constructor(props, context){
    super(props, context);
  }

  renderFilterLink(filter){
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter } = this.props;

    return(
      <li key={filter}>
        <a className={classnames({ selected: filter === selectedFilter })}
                style={{ cursor: 'pointer'}}
                onClick={this.props.onShow(filter)}>
          {title}
        </a>
      </li>
    );
  }
  
  render(){
    const { activeCount, completedCount, onClearCompleted } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    var renderTodoCount;
    renderTodoCount = (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );

    var renderClearButton;
    if (completedCount > 0) {
      renderClearButton = (
        <button className="clear-completed" onClick={onClearCompleted} >
          Clear completed
        </button>
      );
    }

    return(
      <footer className="footer">
        {renderTodoCount}
        <ul className="filters">
          {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(this.renderFilterLink.bind(this))}
        </ul>
        {renderClearButton}
      </footer>
    );
  }
}


Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
}

export default Footer;
