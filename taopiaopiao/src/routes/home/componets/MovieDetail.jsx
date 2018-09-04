import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OperateBar from './OperateBar';
import Star from '../../../components/TStar';
import ProgressBar from '../../../components/ProgressBar';
import MovieComment from './MovieComment';
import './MovieDetail.css';
import BuyTicket from './BuyTicket';
import request from '../../../helpers/request';
import RenderToBody from '../../../components/RenderToBody';

class MovieDetail extends Component {
  state = {
    tags: [],
    list: [],
    isIntroStretch: true,
    isShowBuyTicket: false,
  };
  showBuyTicket = () => {
    this.setState((pre) => {
      return {
        isShowBuyTicket: !pre.isShowBuyTicket,
      };
    });
  }
  changeZan = i => {
    this.state.list[i].isZan = !this.state.list[i].isZan;
    if (this.state.list[i].isZan) {
      this.state.list[i].zan++;
    } else {
      this.state.list[i].zan--;
    }
    this.setState(pre => {
      return { pre };
    });
  };
  getScoreArray = list => {
    let arr = new Array(5).fill(0);
    list.forEach(ele => {
      if (ele.score < 0) {
        return;
      }
      if (ele.score < 2) {
        arr[0]++;
      } else if (ele.score < 4) {
        arr[1]++;
      } else if (ele.score < 6) {
        arr[2]++;
      } else if (ele.score < 8) {
        arr[3]++;
      } else {
        arr[4]++;
      }
    });
    return arr;
  };
  introStretch = () => {
    if (this.refs.mdModule__intro.clientHeight) {
      this.setState({
        isIntroStretch:
          this.refs.mdModule__intro.clientHeight <= 90 ? true : false
      });
    }
  };
  toggleStretch = () => {
    this.setState(pre => {
      return {
        isIntroStretch: !pre.isIntroStretch
      };
    });
  };
  componentDidMount() {
    this.getComment();
    this.introStretch();
  }
  getComment = async () => {
    const { tags, list } = await request('/comment');
    this.setState({
      tags,
      list
    });
  };
  render() {
    const { movie, showMovieDetail } = this.props;
    return (
      <div className="movieDetail">
        {/* header */}
        <div className="movieDetail__header">
          <OperateBar showMovieDetail={showMovieDetail}>
            <div className="operateBar__wrap">
              <div className="operateBar__back" onClick={showMovieDetail} />
              <div className="operateBar__share" />
            </div>
          </OperateBar>
          <div className="movieDetail__infoWrap">
            <div className="movieDetail__info">
              <div className="movieDetail__name">{movie.name}</div>
              <div className="movieDetail__other">剧情 / 类型</div>
              <div className="movieDetail__other">地区 | 市场</div>
              <div className="movieDetail__other">上映时间</div>
            </div>
            <div className="movieDetail__avatar">
              <img src={movie.poster} alt="" />
            </div>
          </div>
        </div>
        {/* content */}
        <div className="movieDetail__content">
          {/* 评分grade模块 */}
          <div className="movieDetail_module mdModule">
            <div className="mdModule__gradeWrap mdModule__gradeWrap--score">
              <div className="mdModule__grade">
                <div className="mdModule__number">
                  {movie.score}
                  <div className="mdModule__star">
                    <Star size={16} count={movie.score / 2} />
                  </div>
                </div>
                <div className="mdModule__text">
                  观众评分
                  {this.state.list.length}人 >
                </div>
              </div>
              <div className="mdModule__grade">
                <div className="mdModule__number">83%</div>
                <div className="mdModule__text">V淘推介度 ></div>
              </div>
              <div className="mdModule__grade">
                <div className="mdModule__number">3333333</div>
                <div className="mdModule__text">想看人数</div>
              </div>
            </div>
            <div className="mdModule__btn">
              <div className="mdModule__want">想看</div>
              <div className="mdModule__saw">看过</div>
            </div>
            <div
              className={`mdModule__intro ${
                this.state.isIntroStretch
                  ? 'mdModule__intro--show'
                  : 'mdModule__intro--hide'
              }`}
              ref="mdModule__intro"
            >
              {movie.description}
              <span className="mdModule__stretch" onClick={this.toggleStretch}>
                展开
              </span>{' '}
            </div>
            <div className="mdModule__caidan">片尾字幕前有彩蛋</div>
          </div>
          {/* 演职人员模块 */}
          <div className="movieDetail_module mdModule">
            <div className="mdModule__title">演职人员</div>
            <div className="mdModule__imageList">
              <img src="/source/artist/asset1.jpeg" alt="" />
              <img src="/source/artist/asset2.jpeg" alt="" />
              <img src="/source/artist/asset3.jpeg" alt="" />
              <img src="/source/artist/asset4.jpeg" alt="" />
            </div>
          </div>
          {/* 此处插入评论模块  Comment*/}
          <div className="movieDetail_module mdModule">
            <div className="mdModule__title">观众热评</div>
            <div className="mdModule__ratingsWrap">
              <div className="mdModule__ratings">
                <div className="ratings__score">{movie.score}</div>
                <div className="ratings__count">
                  {this.state.list.length}
                  人评 >
                </div>
              </div>
              <div className="mdModule__scoreChartForm">
                {this.getScoreArray(this.state.list).map((ele, i) => {
                  return (
                    <div
                      className="mdModule__scoreChart"
                      key={'mdModule__scoreChart' + i}
                    >
                      <div className="mdModule__star">
                        <Star count={5 - i} />
                      </div>
                      <div className="mdModule__progressBar">
                        <ProgressBar
                          per={(ele / this.state.list.length) * 100}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mdModule__comment">
              <MovieComment
                changeZan={this.changeZan}
                tags={this.state.tags}
                list={this.state.list}
              />
            </div>
          </div>
          {/* 票房模块 */}
          <div className="movieDetail_module mdModule">
            <div className="mdModule__title">票房</div>
            <div className="mdModule__gradeWrap mdModule__gradeWrap--accomplishment">
              <div className="mdModule__grade">
                <div className="mdModule__number">1</div>
                <div className="mdModule__text">今日票房排名</div>
              </div>
              <div className="mdModule__grade">
                <div className="mdModule__number">17453</div>
                <div className="mdModule__text">首周票房(万)</div>
              </div>
              <div className="mdModule__grade">
                <div className="mdModule__number">23193</div>
                <div className="mdModule__text">累计票房(万)</div>
              </div>
            </div>
            <div className="mdModule__gradeDetailBtn">票房详情</div>
          </div>
          <div className="movieDetail_module mdModule">
            <div className="mdModule__title">电影原声</div>
            <div className="mdModule__musicList">
              <div className="mdModule__musicItem mdMusicItem">
                <div className="mdMusicItem__avatar" />
                <div className="mdMusicItem__info">
                  <div className="mdMusicItem__name">Innocent</div>
                  <div className="mdMusicItem__origin">专辑</div>
                </div>
              </div>
              <div className="mdModule__musicItem mdMusicItem">
                <div className="mdMusicItem__avatar" />
                <div className="mdMusicItem__info">
                  <div className="mdMusicItem__name">Innocent</div>
                  <div className="mdMusicItem__origin">专辑</div>
                </div>
              </div>
            </div>
          </div>
          {/* 影片资料模块 */}
          <div className="movieDetail_module mdModule">
            <div className="mdModule__title">影片资料</div>
            <div className="mdModule__secondTitle">幕后花絮</div>
            <div className="mdModule__secondTitle">台词精选</div>
            <div className="mdModule__secondTitle">出品发行</div>
          </div>
        </div>
        {/* footer */}
        <div className="movieDetail__footer">
          <button type="button" className="movieDetail__buyBtn" onClick={this.showBuyTicket}>
            特惠选座
          </button>
          {this.state.isShowBuyTicket && <RenderToBody><BuyTicket showBuyTicket={this.showBuyTicket} /></RenderToBody>}
        </div>
      </div>
    );
  }
}

MovieDetail.propTypes = {};

export default MovieDetail;
