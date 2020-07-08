import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring/renderprops';

import videoHD1 from '../../TEST_SCREENING_FULL_HD_VARIANTE_A.mp4';
// import videoHD2 from '../../TEST_SCREENING_FULL_HD_VARIANTE_B.mp4';

class Banner extends Component {
  constructor(props) {
    super(props);

    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
  }

  static defaultProps = {
    no2: null,
    time: null,
  };

  static propTypes = {
    no2: PropTypes.number,
    time: PropTypes.string,
  };

  state = {
    showInfo: false,
    videoUrl: null,
  };

  componentDidMount() {
    this.refs.videoPlayer.addEventListener('timeupdate', this.handleTimeUpdate);
    this.refs.videoPlayer.addEventListener('ended', this.handleEnded);

    this.updateVideoStateFromProps();
  }

  componentWillReceiveProps(nextProps) {
    this.updateVideoStateFromProps(nextProps);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.no2) {
      this.refs.videoPlayer.play();
    }
  }

  updateVideoStateFromProps(props = this.props) {
    this.setState({ videoUrl: videoHD1 });
  }

  handleTimeUpdate() {
    const { currentTime } = this.refs.videoPlayer;

    if (currentTime > 12.5 && currentTime < 18) {
      this.setState({ showInfo: true });
    } else {
      this.setState({ showInfo: false });
    }
  }

  handleEnded() {
    this.setState({ showInfo: false });

    this.refs.videoPlayer.play();
  }

  render() {
    const { showInfo, videoUrl } = this.state;
    const { no2, time, className } = this.props;

    return (
      <div className={['Banner', className].join(' ')}>
        <Transition items={showInfo} from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
          {(showInfo) =>
            showInfo &&
            ((props) => (
              <div style={props} className="textLayer">
                ️{'NO2-Belastung in µg/m'}
                <sup>{'3'}</sup>
                <br />
                <h1>{Number(no2).toFixed(0)}</h1>
                {`Wiesbaden, ${time} Uhr`}
              </div>
            ))
          }
        </Transition>
        <video muted ref="videoPlayer" className={className} preload="auto">
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
        </video>
      </div>
    );
  }
}

export default Banner;
