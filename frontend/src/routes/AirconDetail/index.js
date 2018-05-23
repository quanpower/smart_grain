import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'

import { connect } from 'dva'
import { Row, Col, Card, Cascader } from 'antd'
import { color } from 'utils'
import { Loader } from 'components'
import { AirConRealtimeTemp, AirConTemps, AirConTempRecord } from './components'
import styles from './index.less'
// import TempRecordList from "./components/temprecord";


const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}


function AirConDetail ({ aircondetail, dispatch }) {
  const { barnsNodesOptions, airConRealtimeTemp, airConTemps, airConTempRecord } = aircondetail

  const options = barnsNodesOptions

  console.log('----barnsNodesOptions is:------', options)

  function onChange (value) {
    console.log('------select value is:--------')
    console.log(value)

    // dispatch({
    //   type: 'aircondetail/fetchGatewayAddr',
    //   payload: {
    //     gatewayAddr: value[0],
    //   },
    // })

    // dispatch({
    //   type: 'aircondetail/fetchBarnNo',
    //   payload: {
    //     barnNo: value[1],
    //   },
    // })

    // dispatch({
    //   type: 'aircondetail/fetchNodeAddr',
    //   payload: {
    //     nodeAddr: value[2],
    //   },
    // })

    const nodeAddr = value[2]
    dispatch(routerRedux.push(`/aircondetail/${nodeAddr}`))
  }


  const concCards = airConRealtimeTemp.map((item, key) => (<Col key={key} lg={6} md={12}>
    <AirConRealtimeTemp {...item} />
  </Col>))

  return (
    <div>
      {/*<Loader spinning={loading.models.dashboard} />*/}
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
    </div>
  )
}

AirConDetail.propTypes = {
  aircondetail: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ aircondetail }) => ({ aircondetail }))(AirConDetail)



