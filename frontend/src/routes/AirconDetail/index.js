import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router'

import { connect } from 'dva'
import { Row, Col, Card, Cascader } from 'antd'
import { color } from 'utils'
import { Loader } from 'components'
import { AirConRealtimeTemp, AirConTemps, AirConTempRecord } from './components'
import styles from './index.less'


const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}


@connect(({ aircondetail, loading }) => ({
  aircondetail,
  loading: loading.effects['aircondetail/fetchBarns'],
}))


export default class AirConDetail extends Component {
  state = {
    barns: 'all',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'aircondetail/fetchBarns',
    });

    this.props.dispatch({
      type: 'aircondetail/fetchAlarmStatus',
    });


    console.log('component did mount!')
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'aircondetail/clear',
    });
  }


  render() {
    const { barns_state } = this.state;
    const { aircondetail, loading } = this.props;
    const { barnsNodesOptions, airConRealtimeTemp, airConTemps, airConTempRecord } = airconStartEndTime
    const options = barnsNodesOptions

    console.log('----barnsNodesOptions is:------', options)

    function onChange (value) {
      console.log('------select value is:--------')
      console.log(value)
      const nodeAddr = value[2]
    dispatch(routerRedux.push(`/aircondetail/${nodeAddr}`))
  }

    const concCards = airConRealtimeTemp.map((item, key) => (<Col key={key} lg={6} md={12}>
    <AirConRealtimeTemp {...item} />
  </Col>))

    return (
      <Fragment>
        <Row gutter={24}>
                  <Col lg={24} md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Cascader size="large" defaultValue={['1', '1', '29']} options={options} onChange={onChange} />
          </Card>
        </Col>

        {concCards}

        <Col lg={24} md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <AirConTemps data={airConTemps} />
          </Card>
        </Col>

        <Col lg={24} md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <AirConTempRecord airConTempRecord={airConTempRecord} />
          </Card>
        </Col>
        </Row>
      </Fragment>
    );
  }
}

