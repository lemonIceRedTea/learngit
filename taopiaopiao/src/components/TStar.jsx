import React from 'react';
import PropTypes from 'prop-types';
import './TStar.css';

const TStar = ({size = 8, count = 0}) => {
  return (
    <div className="tStar">
      <div className="tStar__back" style={{width: size * 5 + 'px', height: size + 'px', backgroundSize: size + 'px'}}>
        <div className="tStar__front" style={{width: size * count + 'px', height: size + 'px', backgroundSize: size + 'px'}}></div>
      </div>
    </div>
  );
};

TStar.propTypes = {
  size: PropTypes.number,
  count: PropTypes.number,
};
export default TStar;
