import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Card, Select, message, Cascader} from 'antd'
import { color } from 'utils/utils'
import { AirConDashboard, AirconBlockItem } from './components'
import styles from './index.less'
import pathToRegexp from 'path-to-regexp'


const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}


@connect(({ grainDash, loading }) => ({
  grainDash,
  loading: loading.effects['grainDash/fetchBarnsOptions'],
}))


export default class GrainDash extends Component {
  state = {
    barns: 'all',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'grainDash/fetchBarns',
    });

    this.props.dispatch({
      type: 'grainDash/fetchAlarmStatus',
    });


    console.log('component did mount!')
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'grainDash/clear',
    });
  }

  

  render() {
    const { barns_state } = this.state;
    const { grainDash, loading } = this.props;
    const { barnNo, barnsOptions, airConDash, airconBlockItems } = grainDash

    console.log('airConDash is: ', airConDash)
    console.log('--****-barnNo is: ---****--', barnNo)
    console.log('--****-airconBlockItems is: ---****--', airconBlockItems)

    const cascaderProps = {

      size: 'large',
      defaultValue: ['1', '1'],
      options: barnsOptions,

      onChange (value) {
        console.log('------select value is:--------')
        console.log(value)
        const barn_no = value[1]
        dispatch(routerRedux.push(`/grain_dashboard/${barn_no}`))
      }
    }


    const itemsCards = airconBlockItems.map((item, key) => (
      <AirconBlockItem {...item} />
    ))

    return (
      <Fragment>
        <Row gutter={24}>
        <Col lg={12} md={24}>
          <Card bordered={false} bodyStyle={{ padding: '24px 36px 24px 0', }}>
            <Cascader {...cascaderProps} />
          </Card>
          <Card bordered={false}
                bodyStyle={{
            padding: '24px 36px 24px 0',
          }}
          >
            <AirConDashboard data={airConDash} />
          </Card>
        </Col>

        {itemsCards}
        </Row>
      </Fragment>
    );
  }
}
