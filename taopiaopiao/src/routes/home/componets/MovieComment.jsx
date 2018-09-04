import React, { Component } from 'react';
import Star from '../../../components/TStar';
import './MovieComment.css';
class MovieComment extends Component {
  state = {
    currentAcive: '热门'
  };
  changeTag = text => {
    this.setState({
      currentAcive: text
    });
  };
  render() {
    const { tags, list, changeZan } = this.props;
    return (
      <div className="movieComment">
        <div className="movieComment__tagsBar">
          {tags.map(tag => (
            <div
              onClick={() => {
                this.changeTag(tag.text);
              }}
              className={`movieComment__tag ${this.state.currentAcive ===
                tag.text && 'movieComment__tag--active'}`}
              key={tag.text}
            >
              {tag.text}
            </div>
          ))}
        </div>
        <ul className="movieComment__commentList">
          {list.map((item, i) => {
            if (item.tag != this.state.currentAcive) {
              return null;
            }
            return (
              <li className="commentItem" key={item.id}>
                <div className="commentItem__userInfo">
                  <div className="commentItem__userIcon" />
                  <div className="commentItem__user">
                    <div className="commentItem__userName">
                      {item.name}{' '}
                      <span className="commentItem__moreOpt">•••</span>
                    </div>
                    <div className="commentItem__star">
                      <Star size={12} count={item.score / 2} />
                    </div>
                    <span className="commentItem__starScore">{item.score}</span>
                  </div>
                </div>
                <div className="commentItem__comment">{item.content}</div>
                <div className="commentItem__footer">
                  <span className="commentItem__date">{item.time}</span>
                  <span className="commentItem__message">
                    <i />
                    <span>1058</span>
                  </span>
                  <span
                    className={`commentItem__support ${item.isZan &&
                      'commentItem__support--zan'}`}
                  >
                    <i onClick={() => {
                      changeZan(i);
                    }} />
                    <span>{item.zan}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MovieComment;
