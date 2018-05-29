import React, { Component, Fragment } from 'react';

import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { StoreHouse, AudioAlarm } from './components'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ grain, loading }) => ({
  grain,
  loading: loading.effects['grain/fetchBarns'],
}))

export default class Barns extends Component {
  state = {
    alarmStatus: false,
    showAudio: true,
    barns: [],
  };


  componentDidMount() {
    const { barnNo } = this.state;

    this.timer = setInterval(() => {

      this.props.dispatch({
        type: 'grain/fetchBarns',
      });

      this.props.dispatch({
        type: 'grain/fetchAlarmStatus',
      });

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    const { dispatch } = this.props;
    dispatch({
      type: 'grain/clear',
    });
  }

  render() {
    const { grain, loading } = this.props;
    const { barns, alarmStatus, showAudio } = grain

    const barnCards = barns.map((item, key) => (<Col key={key} lg={6} md={12}>
      <StoreHouse {...item} />
    </Col>))

    return (
      <Fragment>
        <Row gutter={24}>
          {console.log('barns:', barns)}
            {barnCards}
        </Row>
      </Fragment>
    );
  }
}
