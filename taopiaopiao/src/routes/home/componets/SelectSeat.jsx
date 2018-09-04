import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeSeat, addSeat} from '../action/index';

const SEAT_WIDTH = 50;
const SEAT_HEIGHT = 50;
const ratio = 2;

const SEAT_CANVAS_WIDTH = SEAT_WIDTH * ratio;
const SEAT_CANVAS_HEIGHT = SEAT_HEIGHT * ratio;

class SelectSeat extends Component {
  componentWillMount() {
    this.flag = true;
    document.body.style.overflow = 'hidden';
  }
  componentDidMount() {}
  componentDidUpdate() {
    console.log(this.props.seats);
    if (this.flag) {
      this.flag = false;
      this.loadImg();
    } else {
      this.ctx = this.refs.selectSeat.getContext('2d');
      this.ctx.clearRect(0, 0, this.refs.selectSeat.width, this.refs.selectSeat.height);
      this.drawAllSeat();
      this.drawSelectSeat();
    }
  }
  componentWillUnmount() {
    document.body.style.overflow = 'initial';
  }
  chooseSeat = e => {
    let { left, top } = this.refs.selectSeat.getBoundingClientRect();
    let { pageX, pageY } = e;
    let posX = Math.ceil((pageX - left) / SEAT_WIDTH);
    let posY = Math.ceil((pageY - top) / SEAT_HEIGHT);
    let seat = this.props.seats.find(seat => {
      return seat.xPos === posX && seat.yPos === posY;
    });
    if (seat.isSold) {
      return;
    }
    let seatIndex = this.props.selectSeat.findIndex(ele => ele.id === seat.id);
    if (seatIndex > -1) {
      this.props.removeSeat(seat.id);
    } else {
      if (this.props.selectSeat.length >= 4) {
        alert('不能超过4个座位');
      } else {
        this.props.addSeat(seat);
      }
    }
  };

  loadImg = () => {
    this.emptyImage = new Image();
    this.soldImage = new Image();
    this.selectImage = new Image();
    let count = 0;
    let imgOnload = () => {
      count++;
      if (count >= 3) {
        this.props.seats.length && this.drawAllSeat();
      }
    };

    this.emptyImage.src = '/source/seat-empty.png';
    this.soldImage.src = '/source/seat-sold.png';
    this.selectImage.src = '/source/seat-selected.png';

    this.emptyImage.onload = imgOnload;
    this.soldImage.onload = imgOnload;
    this.selectImage.onload = imgOnload;
  };
  drawSelectSeat = () => {
    const { selectSeat } = this.props;
    this.ctx.font = `${ratio * 10}px Arial`;
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textAlign = 'center';
    selectSeat.forEach(ele => {
      this.ctx.drawImage(
        this.selectImage,
        (ele.xPos - 1) * SEAT_CANVAS_WIDTH,
        (ele.yPos - 1) * SEAT_CANVAS_HEIGHT,
        SEAT_WIDTH * 2,
        SEAT_HEIGHT * 2
      );
      this.ctx.fillText(`${ele.rowIndex}排`, (ele.xPos - 1) * SEAT_CANVAS_WIDTH + SEAT_CANVAS_WIDTH / 2, (ele.yPos - 1) * SEAT_CANVAS_HEIGHT + SEAT_CANVAS_HEIGHT / 3);
      this.ctx.fillText(`${ele.colIndex}座`, (ele.xPos - 1) * SEAT_CANVAS_WIDTH + SEAT_CANVAS_WIDTH / 2, (ele.yPos - 1) * SEAT_CANVAS_HEIGHT + SEAT_CANVAS_HEIGHT * 2 / 3);
    });
  };
  drawAllSeat = () => {
    this.ctx = this.refs.selectSeat.getContext('2d');
    let len = this.props.seats.length;
    let height = this.props.seats[len - 1].yPos * SEAT_HEIGHT;
    let width = this.props.seats[len - 1].xPos * SEAT_WIDTH;
    this.refs.selectSeat.width = width * ratio;
    this.refs.selectSeat.height = height * ratio;
    this.refs.selectSeat.style.width = width + 'px';
    this.refs.selectSeat.style.height = height + 'px';
    this.props.seats.forEach((ele, i) => {
      if (ele.isSold) {
        this.ctx.drawImage(
          this.soldImage,
          (ele.xPos - 1) * SEAT_CANVAS_WIDTH,
          (ele.yPos - 1) * SEAT_CANVAS_HEIGHT,
          SEAT_CANVAS_WIDTH,
          SEAT_CANVAS_HEIGHT
        );
      } else {
        this.ctx.drawImage(
          this.emptyImage,
          (ele.xPos - 1) * SEAT_CANVAS_WIDTH,
          (ele.yPos - 1) * SEAT_CANVAS_HEIGHT,
          SEAT_CANVAS_WIDTH,
          SEAT_CANVAS_HEIGHT
        );
      }
    });
  };
  render() {
    return (
      <canvas
        ref="selectSeat"
        onClick={e => {
          this.chooseSeat(e);
        }}
      />
    );
  }
}

SelectSeat.propTypes = {
  seats: PropTypes.array.isRequired,
  selectSeat: PropTypes.array.isRequired,
  removeSeat: PropTypes.func.isRequired,
  addSeat: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeSeat: (id) => {
      dispatch(removeSeat(id));
    },
    addSeat: (seat) => {
      dispatch(addSeat(seat));
    }
  };
};
const mapStateToProps = (state) => {
  return {
    selectSeat: state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectSeat);
