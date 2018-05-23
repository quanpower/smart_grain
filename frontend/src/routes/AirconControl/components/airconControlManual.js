import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import { color } from 'utils'
import styles from './airconControlManual.less'
import AirconOnOffControl from './airconOnOffControl'
import AirconOnOffAllOneKey from './airconOnOffAllOneKey'


function AirconControlManual ({ airConControlItems, barnNo, location, dispatch }) {


  const airconOnOffControlItems = airConControlItems.map((item, key) => (
    <Col lg={12} md={24}>
      <Row gutter={24}>
        <Col key={key} lg={24} md={12}>
          <Card bordered={false}
            className={styles.power1}
            bodyStyle={{
              padding: 0,
              height: 240,
              background: color.blue,
            }}
          >
            <AirconOnOffControl {...item} location={location} dispatch={dispatch} />
          </Card>
        </Col>
      </Row>
    </Col>
  ))

  return (
    <div>

      <Card bordered={false}
        className={styles.power1}
        bodyStyle={{
          padding: 0,
          height: 100,
          background: color.sky,
        }}
      >
        <AirconOnOffAllOneKey dispatch={dispatch} barnNo={barnNo} />
      </Card>


      <Row gutter={24}>
        { airconOnOffControlItems }
      </Row>

    </div>
  )
}

AirconControlManual.propTypes = {
  dispatch: PropTypes.func,
}

export default AirconControlManual
