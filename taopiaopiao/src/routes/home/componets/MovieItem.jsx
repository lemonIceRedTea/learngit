import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import MovieDetail from './MovieDetail';
import RenderToBody from '../../../components/RenderToBody';
import './MovieItem.css';

class MovieItem extends Component {
  state = {
    showDetail: false
  };
  showMovieDetail = () => {
    this.setState(pre => {
      return {
        showDetail: !pre.showDetail
      };
    });
  };
  render() {
    const movie = this.props.movie;
    return (
      <div className="movieItem">
        <div
          onClick={this.showMovieDetail}
          className="movieItem__avatar"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="movieItem__info">
          <div className="movieItem__name">{movie.name}</div>
          <div className="movieItem__rating">
            观众评分 <span className="movieItem__score">{movie.score}</span>
          </div>
          {movie.director && (
            <div className="movieItem__director">
              导演：
              {movie.director}
            </div>
          )}
          {movie.actor && (
            <div className="movieItem__actor">
              主演：
              {movie.actor}
            </div>
          )}
          <div className="movieItem__tags">
            {movie.tags.map((tag, i) => {
              if (i % 2 === 0) {
                return (
                  <div className="movieItem__tags--red" key={tag}>
                    {tag}
                  </div>
                );
              } else {
                return (
                  <div className="movieItem__tags--blue" key={tag}>
                    {tag}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="movieItem__btn">
          <button className="movieItem__btn--buy" type="button" onClick={this.showMovieDetail}>
            购票
          </button>
          <div className="movieItem__btn--text">9.9元起</div>
        </div>
        {this.state.showDetail && (
          <RenderToBody>
            <MovieDetail movie={movie} showMovieDetail={this.showMovieDetail} />
          </RenderToBody>
        )}
      </div>
    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieItem;
