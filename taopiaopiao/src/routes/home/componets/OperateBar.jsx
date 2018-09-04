import React from 'react';
import PropTypes from 'prop-types';
import './OperateBar.css';

const OperateBar = ({showMovieDetail, children}) => {
  return (
    <div className="operateBar">
      {children}
    </div>
  );
};

OperateBar.propTypes = {
  children: PropTypes.object.isRequired,
};

export default OperateBar;
