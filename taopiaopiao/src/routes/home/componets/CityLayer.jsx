import React from 'react';
import PropTypes from 'prop-types';
import './CityLayer.css';

const CityLayer = ({ showCityLayer, cities, city, changeCityLocation }) => {
  const { hot = [], all = {} } = cities;
  const alphabetKeys = Object.keys(all);
  return (
    <div className="cityLayer">
      <div className="cityLayer__header">
        <div className="cityLayer__close" onClick={showCityLayer}>
          关闭
        </div>
        选择城市
      </div>
      <div className="cityLayer__searchWrap">
        <div className="cityLayer__search">输入城市名或拼音</div>
      </div>
      <div className="cityLayer__content">
        <div className="cityBlock">
          <div className="cityBlock__title" id="定位">
            定位城市
          </div>
          <div className="cityBlock__wrap">
            <div className="cityBlock__item">{city}</div>
          </div>
        </div>
        <div className="cityBlock">
          <div className="cityBlock__title" id="热门">
            热门城市
          </div>
          <div className="cityBlock__wrap">
            {hot &&
              hot.map(item => (
                <div
                  className="cityBlock__item"
                  onClick={() => {
                    changeCityLocation(item.regionName);
                    showCityLayer();
                  }}
                  key={item.cityCode}
                >
                  {item.regionName}
                </div>
              ))}
          </div>
        </div>
        {alphabetKeys.map(items => (
          <div className="cityList" key={items}>
            <div className="cityList__label" id={items}>
              {items}
            </div>
            {all[items].map(item => (
              <div className="cityList__wrap" key={item.cityCode}>
                <div
                  className="cityList__item"
                  onClick={() => {
                    changeCityLocation(item.regionName);
                    showCityLayer();
                  }}
                >
                  {item.regionName}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <ul className="citySideBar">
        <li className="citySideBar__pos">
          <a href="#定位">定位</a>
        </li>
        <li className="citySideBar__pos">
          <a href="#热门">热门</a>
        </li>
        {alphabetKeys.map(item => (
          <li className="citySideBar__pos" key={`citySideBar${item}`}>
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

CityLayer.propTypes = {
  showCityLayer: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired,
  city: PropTypes.string.isRequired,
  changeCityLocation: PropTypes.func.isRequired
};

export default CityLayer;
