import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux, Link } from 'dva/router'
import { Row, Col, Card} from 'antd'
import { color } from 'utils'

import styles from './airconBlockItem.less'

function AirconBlockItem ({ background, name, content, link, title, avatar }) {

  console.log('background:', background)

  return (


  <Col lg={6} md={24}>
    <Row gutter={24}>
    
      <Col lg={24} md={12}>
        <Card bordered={false}
              className={styles.quote}
              bodyStyle={{
                padding: 0,
                height: 204,
                background: `${background}`,
              }}
        >

          <div className={styles.airconBlockItem}>
            <div className={styles.inner}>
              {content}
            </div>
            <div className={styles.footer}>
              <div className={styles.description}>
                <p>{name}</p>
                <h1><Link to={`${link}`}> {title} </Link></h1>
              </div>
              <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />
            </div>
          </div>

        </Card>
      </Col>
    </Row>
  </Col>
  



  )

}

AirconBlockItem.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  avatar: PropTypes.string,
}

export default AirconBlockItem
