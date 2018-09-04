import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OperateBar from '../home/componets/OperateBar';
import BottomBar from '../../components/BottomTab';
import '../../common.css';
import './index.css';

class My extends Component {
  render() {
    return (
      <div className="my">
        <div className="my__header">
          <OperateBar>
            <div className="operateBar__wrap">
              <div className="operateBar__setting" />
              <div className="operateBar__message" />
            </div>
          </OperateBar>
          <div className="my__info">
            <div className="my__avatar"></div>
            <div className="my__detail">
              <div className="my__name">sunshine</div>
              <div className="my__focus">
                <span className="my__focusOther">关注 0</span>
                <span className="my__focusSe">|</span>
                <span className="my__focusMe">被关注 0</span>
              </div>
              <div className="my__member">黑钻会员</div>
            </div>
          </div>
        </div>
        <div className="my__content mC">
          <div className="mC__block">
            <span className="mC__text">收藏的电影</span>
            <span className="mC__num">2 ></span>
          </div>
          <div className="mC__block">
            <span className="mC__text">看过的电影</span>
            <span className="mC__num">64 ></span>
          </div>
        </div>
        <div className="my__footer">
          <BottomBar />
        </div>
      </div>
    );
  }
}

export default My;
