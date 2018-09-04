import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

const ProgressBar = ({width = 184, height = 4, per = 0, color = '#333333'}) => {
  return (
    <div className="progressBar" style={{width: width + 'px'}}>
      <div className="progressBar__back" style={{width: width + 'px', height: height + 'px'}}>
        <div className="progressBar__front" style={{height: height + 'px', backgroundColor: color, width: per + '%'}}></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  height: PropTypes.number,
  per: PropTypes.number,
  color: PropTypes.string,
};

export default ProgressBar;
