/*
 * @Author: lemonIceRedTea
 * @Des:  轮播图组件
 * @Date: 2018-08-18 17:59:41
 * @Last Modified by: lemonIceRedTea
 * @Last Modified time: 2018-08-24 21:48:43
 */

import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './PosterSlider.css';

const PosterSlider = ({ poster }) => {
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    dotsClass: 'posterSlider__dots',
    autoplay: true,
    className: 'posterSlider'
  };
  return (
    <Slider {...setting}>
      {poster.map(item => (
        <div key={item.image}>
          <img
            className="posterSlider__image"
            src={item.image}
          />
        </div>
      ))}
    </Slider>
  );
};
PosterSlider.propTypes = {
  poster: PropTypes.array.isRequired,
};
export default PosterSlider;
