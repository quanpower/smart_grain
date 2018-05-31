import React, { Component, Fragment } from 'react';

import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Card, Row, Col, Cascader } from 'antd'
import { color } from 'utils/utils'
import styles from './index.less'
import { ElectricControl } from './components'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}


@connect(({ fireAlarm, loading }) => ({
  fireAlarm,
  loading: loading.effects['fireAlarm/fetchGatewayAddr'],
}))


export default class FireAlarm extends Component {
  state = {
    gatewayAddr: 1,
    barnNo: 1,
    barnsOptions: [],
    electricPowerItems: [],
    switch: [],
  };

  componentDidMount() {
    this.props.dispatch({ 
        type: 'fireAlarm/fetchBarnsOptions',
      })

    console.log('component did mount!')
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'fireAlarm/clear',
    });
  }


  render() {
    const { fireAlarm, dispatch, loading } = this.props;
    const { electricPowerItems, barnsOptions, barnNo } = fireAlarm

    console.log('electricPowerItems:', electricPowerItems)

  const cascaderProps = {

    size: 'large',
    defaultValue: ['1', '1'],
    options: barnsOptions,

    onChange (value) {
      console.log('------select value is:--------')
      console.log(value)
      const barn_no = value[1]
      dispatch(routerRedux.push(`/fire-alarm/${barn_no}`))
    }
  }


  const electricPowerOnOffItems = electricPowerItems.map((item, key) => (

    <Col lg={12} md={24}>
      <Row gutter={24}>
        <Col key={key} lg={24} md={12}>
          <Card bordered={false}
            className={styles.power1}
            bodyStyle={{
              padding: 0,
              height: 240,
              background: color.green,
            }}
          >
            <ElectricControl {...item} dispatch={dispatch} />
          </Card>
        </Col>
      </Row>
    </Col>
  ))

    return (
      <Fragment>
        <Row gutter={24}>
          <Card bordered={false} bodyStyle={{ padding: '24px 36px 24px 0', }}>
            <Cascader {...cascaderProps} />
          </Card>

          { electricPowerOnOffItems }
        </Row>
      </Fragment>
    );
  }
}

