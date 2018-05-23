import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import { color } from 'utils'
import styles from './airconUpdateStartEndTime.less'
import AirconUpdateOneStartEndTime from './airconUpdateOneStartEndTime'
// import AirconOnOffAllOneKey from './airconOnOffAllOneKey'


function AirconUpdateStartEndTime ({ data, location, dispatch, airconStartEndTime }) {

  return (
    <div>
      {/*<Row gutter={24}>*/}

        {/*<AirconUpdateOneStartEndTime dispatch={dispatch} barnNo={1} />*/}

      {/*</Row>*/}

      <Row gutter={24}>

        <Col lg={12} md={24}>
          <Row gutter={24}>

            <Col lg={24} md={12}>
              <Card bordered={false}
                    className={styles.power1}
                    bodyStyle={{
                      padding: 0,
                      height: 204,
                      background: color.green,
                    }}
              >
                <AirconUpdateOneStartEndTime dispatch={dispatch} nodeAddr={1} airconStartEndTime={airconStartEndTime} />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg={12} md={24}>
          <Row gutter={24}>

            <Col lg={24} md={12}>
              <Card bordered={false}
                    className={styles.power1}
                    bodyStyle={{
                      padding: 0,
                      height: 204,
                      background: color.blue,
                    }}
              >
                <AirconUpdateOneStartEndTime dispatch={dispatch} nodeAddr={2} airconStartEndTime={airconStartEndTime} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>


      <Row gutter={24}>

        <Col lg={12} md={24}>
          <Row gutter={24}>

            <Col lg={24} md={12}>
              <Card bordered={false}
                    className={styles.power1}
                    bodyStyle={{
                      padding: 0,
                      height: 204,
                      background: color.purple,
                    }}
              >
                <AirconUpdateOneStartEndTime dispatch={dispatch} nodeAddr={3} airconStartEndTime={airconStartEndTime} />
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg={12} md={24}>
          <Row gutter={24}>

            <Col lg={24} md={12}>
              <Card bordered={false}
                    className={styles.power1}
                    bodyStyle={{
                      padding: 0,
                      height: 204,
                      background: color.red,
                    }}
              >
                <AirconUpdateOneStartEndTime dispatch={dispatch} nodeAddr={4} airconStartEndTime={airconStartEndTime} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

AirconUpdateStartEndTime.propTypes = {
  dispatch: PropTypes.func,
}

export default AirconUpdateStartEndTime
