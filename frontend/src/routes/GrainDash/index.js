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
  loading: loading.effects['grainDash/fetchAirConDashboard'],
}))

export default class GrainDash extends Component {
  state = {
    gatewayAddr: 1,
    barnNo: 1,
    barnsOptions: [],
    airConDash: [],
    airconBlockItems: ['a','b','c'],
  };

  componentDidMount() {
    console.log(this.state)
    const { barnNo } = this.state;

    this.props.dispatch({ 
        type: 'grainDash/fetchBarnsOptions',
      })

    this.timer = setInterval(() => {

      this.props.dispatch({ 
        type: 'grainDash/fetchAirConDashboard',
      })

      this.props.dispatch({ 
        type: 'grainDash/fetchAirconBlockItems',
        payload: {
          barnNo: barnNo,
        }
       })

    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  // componentDidMount() {

  //   // let data = this.props.location.query;
  //   // let { barnNo } = data;
    
  //   // console.log('location is: ', location)
  //   // console.log('--****-barnNo is: ---****--', barnNo)

  //   // this.setState({barnNo: barnNo});
  //   // // this.props.dispatch({
  //   // //   type: 'grainDash/fetchBarnNo',
  //   // //   payload: {barnNo: barnNo}

  //   // // });



  //   // this.props.dispatch({
  //   //   type: 'grainDash/fetchAirConDashboard',
  //   // });
    
  //   // console.log('--****-fetchAirConDashboard is: ---****--', '---------fetchAirConDashboard----------')

  //   // this.props.dispatch({
  //   //   type: 'grainDash/fetchAirconBlockItems',
  //   // });


  //   // console.log('component did mount!')
  // }

  // componentWillUnmount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'grainDash/clear',
  //   });
  // }

  render() {


    const { grainDash, dispatch, loading } = this.props;
    const { barnsOptions, airConDash, airconBlockItems } = grainDash


    console.log('----airConDash is----:', airConDash)

    console.log('----barnsOptions is----:', barnsOptions)

    console.log('--****-airconBlockItems is: ---****--', airconBlockItems)

    const cascaderProps = {

      size: 'large',
      defaultValue: ['1', '1'],
      options: barnsOptions,

      onChange (value) {
        console.log('------select value is:--------')
        console.log(value)
        const barn_no = value[1]
        dispatch(routerRedux.push(`/grain-dash/${barn_no}`))
      }
    }


    const itemsCards = airconBlockItems.map((item, key) => (
      <AirconBlockItem key={ key } {...item} />
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
