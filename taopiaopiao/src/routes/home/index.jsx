/*
 * @Author: lemonIceRedTea
 * @Des:  首页
 * @Date: 2018-08-24 21:47:56
 * @Last Modified by: lemonIceRedTea
 * @Last Modified time: 2018-08-26 23:38:59
 */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import '../../common.css';
import TopBar from "./componets/TopBar";
import Slider from "./componets/PosterSlider";
import MovieList from "./container/MovieList";
import BottomTab from "../../components/BottomTab";
import RenderToBody from '../../components/RenderToBody';
import CityLayer from './componets/CityLayer';
import request from '../../helpers/request';
import MovieItem from './componets/MovieItem';
import MovieDetail from './componets/MovieDetail';

class home extends Component {
  state = {
    city: '', //当前城市
    poster: [], //slider海报
    movie: [], //当前热映电影
    cityLayerVisible: false, //城市浮层是否可见
    cities: {},//城市
  }
  showCityLayer = () => {
    if (!this.state.cityLayerVisible) {
      this.getCity();
    }
    this.setState((pre) => {
      return {
        cityLayerVisible: !pre.cityLayerVisible
      };
    });
  }
  changeCityLocation = (city) => {
    this.setState({
      city
    });
  }
  componentWillMount () {
    this.getData();
  }
  componentDidMount () {
  }
  getCity = async () => {
    const cities = await request('/city');
    this.setState({
      cities
    });
  }
  getData = async () => {
    const data = await request('/index');
    const { city, poster, movie } = data;
    this.setState({
      city,
      poster,
      movie
    });
    console.log(data);
    return data;
  }
  render() {
    return (
      <div className="home">
        <TopBar  city={this.state.city} showCityLayer={this.showCityLayer}/>
        <div className="home__slider">
          <div className="home__sliderWrap">
            <Slider poster={this.state.poster} />
          </div>
        </div>
        <MovieList>
          {this.state.movie.map(item => (
            <MovieItem movie={item} key={item.name} />
          ))}
        </MovieList>
        <BottomTab />
        {this.state.cityLayerVisible && <RenderToBody><CityLayer city={this.state.city} cities={this.state.cities} showCityLayer={this.showCityLayer} changeCityLocation={this.changeCityLocation} /></RenderToBody>}
      </div>
    );
  }
}

home.propTypes = {

};

export default home;
