import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row } from 'antd'
import { AirconUpdateStartEndTime } from './components'


@connect(({ airconStartEndTime, loading }) => ({
  airconStartEndTime,
  loading: loading.effects['airconStartEndTime/fetchBarns'],
}))


export default class AirConStartEndTime extends Component {
  state = {
    startTime: '08:00',
    endTime: '18:00',
  };

  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'airconStartEndTime/fetchBarns',
  //   });

  //   this.props.dispatch({
  //     type: 'airconStartEndTime/fetchAlarmStatus',
  //   });


  //   console.log('component did mount!')
  // }

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'airconStartEndTime/clear',
  //   });
  // }

  

  render() {
    const { airconStartEndTime, dispatch, loading } = this.props;
    const { startTime, endTime } = airconStartEndTime

    return (
      <Fragment>
        <Row gutter={24}>
          <AirconUpdateStartEndTime dispatch={dispatch} location={location} airconStartEndTime={airconStartEndTime} />
        </Row>
      </Fragment>
    );
  }
}

