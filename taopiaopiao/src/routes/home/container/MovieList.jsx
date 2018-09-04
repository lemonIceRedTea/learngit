import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MovieList.css';

class MovieList extends Component {
  render() {
    return (
    <div className="MovieList">
      {this.props.children}
    </div>
    );
  }
}

MovieList.propTypes = {
  // children: PropTypes.array,
};

export default MovieList;
