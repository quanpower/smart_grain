import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Card } from 'antd'
import styles from './storeHouse.less'
import { routerRedux, Link} from 'dva/router'

function StoreHouse ({ icon, color, title, number, barnNo }) {

  // let data = {barnNo:barnNo};
  // let path = {
  // pathname:'grain-dash',
  // query:data,
  // }
  
  return (
    <Card className={styles.storeHouse} bordered={false} bodyStyle={{ padding: 0 }}>
      <Icon className={styles.iconWarp} style={{ color }} type={icon} />
      <div className={styles.content}>
        <h1 className={styles.title}><Link to={`grain-dash/${barnNo}`}>{title || 'No Title'}</Link></h1>
        <p className={styles.number}>
          {number}℃
        </p>
      </div>
    </Card>
  )
}

StoreHouse.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  barnNo: PropTypes.string,

}

export default StoreHouse
