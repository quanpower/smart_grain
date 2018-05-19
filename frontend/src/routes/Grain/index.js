import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types'
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
    barns: 'all',

  };

  componentDidMount() {
    this.props.dispatch({
      type: 'grain/fetchBarns',
    });

    this.props.dispatch({
      type: 'grain/fetchAlarmStatus',
    });


    console.log('component did mount!')
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'grain/clear',
    });
  }

  

  render() {
    const { barns_state } = this.state;
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
