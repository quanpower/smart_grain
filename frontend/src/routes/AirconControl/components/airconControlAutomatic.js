import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import { color } from 'utils/utils'
import styles from './airconControlAutomatic.less'
import AirconOnOffControl from './airconOnOffControl'



function AirconControlAutomatic ({ data, location, dispatch, nodeAddr }) {


    return (
      <div>
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
                  <AirconOnOffControl location={location} dispatch={dispatch} nodeAddr={nodeAddr} content={'2号配电箱开关控制'} name={'2'} title={'2号配电箱'} avatar={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506180316165&di=f56b4ef5671e23987359bc9b6f00dbb3&imgtype=0&src=http%3A%2F%2Fwww.dgjs123.com%2Fd%2Ffile%2F2015-05%2F124608p0eg0m07mz00ed7d.jpg'} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }


AirconControlAutomatic.propTypes = {

}

export default AirconControlAutomatic
