import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeSeat } from '../action/index';

class BTCart extends Component {
  render() {
    return (
      <div>
        {this.props.selectSeat.map(item => (
          <div className="buyTicket__ticket" key={item.id}>
            <div className="bTTicket">
              <div className="bTTicket__seat">{`${item.rowIndex}排${
                item.colIndex
              }座`}</div>
              <div className="bTTicket__price">33元</div>
            </div>
            <div
              className="buyTicket__close"
              onClick={() => {
                this.props.removeSeat(item.id);
              }}
            >
              X
            </div>
          </div>
        ))}
      </div>
    );
  }
}

BTCart.propTypes = {
  selectSeat: PropTypes.array.isRequired,
  removeSeat: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    removeSeat: id => {
      dispatch(removeSeat(id));
    }
  };
};
const mapStateToProps = state => {
  return {
    selectSeat: state
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BTCart);
