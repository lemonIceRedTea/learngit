import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import './BuyTicket.css';
import SelectSeat from './SelectSeat';
import OperateBar from '../componets/OperateBar';
import request from '../../../helpers/request';
import seats from '../reducer/index';
import BTCart from './BTCart';
import {clearSeat} from '../action/index';

let store = createStore(seats);

class BuyTicket extends Component {
  state = {
    seats: [],
  };
  componentDidMount() {
    this.getSeats();
  }
  getSeats = async () => {
    const seats = await request('/seat');
    this.setState({
      seats
    });
  };
  componentDidUpdate() {
    console.log(store.getState());
  }
  componentWillUnmount () {
    store.dispatch(clearSeat());
  }
  // removeSeat = seat => {
  //   this.setState(pre => {
  //     return {
  //       selectSeat: pre.selectSeat.filter(ele => ele.id != seat.id)
  //     };
  //   });
  // };
  // addSeat = seat => {
  //   this.setState(pre => {
  //     return { selectSeat: [...pre.selectSeat, seat] };
  //   });
  // };
  render() {
    const { showBuyTicket } = this.props;
    return (
      <Provider store={store}>
        <div className="buyTicket">
          <div className="buyTicket__header">
            <OperateBar>
              <div className="operateBar__wrap">
                <div className="operateBar__back" onClick={showBuyTicket} />
                佳映IMAX影城
                <div className="operateBar__share" />
              </div>
            </OperateBar>
          </div>
          <div className="buyTicket__content">
            <div className="buyTicket__info">
              <div className="buyTicket__name">唐人街探案</div>
              <div className="buyTicket__time">
                今天 03-05 11：55 （国语2D）
              </div>
            </div>
            <div className="buyTicket__seatWrap">
              <div className="buyTicket__hintWrap">
                <div className="buyTicket__hint">
                  <span className="buyTicket__hintIcon buyTicket__hintIcon--optional" />
                  <span className="buyTicket__hintText">可选</span>
                </div>
                <div className="buyTicket__hint">
                  <span className="buyTicket__hintIcon buyTicket__hintIcon--sold" />
                  <span className="buyTicket__hintText">已售</span>
                </div>
                <div className="buyTicket__hint">
                  <span className="buyTicket__hintIcon buyTicket__hintIcon--selected" />
                  <span className="buyTicket__hintText">已售</span>
                </div>
              </div>
              <div className="buyTicket__screenWrap">
                <span className="buyTicket__screen">B13屏幕</span>
              </div>
              <div
                className="buyTicket__seat"
                style={{
                  overflowX: 'scroll',
                  marginTop: '15px',
                  padding: '15px'
                }}
              >
                <SelectSeat seats={this.state.seats}
                />
              </div>
            </div>
          </div>
          <div className="buyTicket__cart">
              <BTCart />
          </div>
          <div className="buyTicket__btn">
            <button className="buyTicket__buyBtn">33元 确认选座</button>
          </div>
        </div>
      </Provider>
    );
  }
}

BuyTicket.propTypes = {
  showBuyTicket: PropTypes.func.isRequired
};

export default BuyTicket;
