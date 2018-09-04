import React, { PropTypes } from 'react';
import {NavLink} from 'react-router-dom';
import './BottomTab.css';

const BottomTab = props => {
  return (
    <div className="bottomTab">
      <NavLink to="/" exact={true} className="bottomTab__item" activeClassName="bottomTab__item--active">
        <i className="bottomTab__icon bottomTab__icon--movie" />
        <span className="bottomTab__text">电影</span>
      </NavLink>
      <NavLink to="/my" exact={true} className="bottomTab__item" activeClassName="bottomTab__item--active">
        <i className="bottomTab__icon bottomTab__icon--user" />
        <span className="bottomTab__text">我的</span>
      </NavLink>
    </div>
  );
};

BottomTab.propTypes = {};

export default BottomTab;
