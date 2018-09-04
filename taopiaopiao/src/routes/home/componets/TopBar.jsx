/*
 * @Author: lemonIceRedTea
 * @Des: 首页顶部Tab组件
 * @Date: 2018-08-17 17:53:33
 * @Last Modified by: lemonIceRedTea
 * @Last Modified time: 2018-08-24 17:52:23
 */
import React from 'react';
import PropTypes from 'prop-types';
import './TopBar.css';

const TopBar = ({ city, showCityLayer }) => {
  return (
    <div className="topBar">
      <div className="topBar__city" onClick={showCityLayer}>{city}</div>
      <div className="topBar__search">搜索</div>
      <div className="topBar__scan"></div>
    </div>
  );
};

TopBar.propTypes = {
  city: PropTypes.string.isRequired,
  showCityLayer: PropTypes.func.isRequired,
};

export default TopBar;
