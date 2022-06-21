import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';
  const changeComplete = () => {
    console.log('changeComplete');
    const updatedTask = {
      id: props.id,
      title: props.title,
      isComplete: !props.isComplete,
    };
    props.onUpdate(updatedTask);
  };
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={changeComplete}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Task;
