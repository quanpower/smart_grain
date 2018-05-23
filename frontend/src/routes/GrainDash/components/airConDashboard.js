import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { color } from 'utils/utils'
import styles from './airConDashboard.less'
import { routerRedux, Link} from 'dva/router'

const status = {
  0: {
    color: color.green,
    text: '停止运行',
  },
  1: {
    color: color.green,
    text: '正常状态',
  },
  2: {
    color: color.yellow,
    text: '一般警告',
  },
  3: {
    color: color.red,
    text: '严重警告',
  },
}

function AirConDashboard ({ data }) {


  console.log('******AirConDashboard******', data)

  const columns = [
    {
      title: 'avatar',
      dataIndex: 'avatar',
      width: 48,
      className: styles.avatarcolumn,
      render: text => <span style={{ backgroundImage: `url(${text})` }} className={styles.avatar} />,
    }, {
      title: 'content',
      dataIndex: 'content',
      render: (text, it) => (<div>
        <h1 className={styles.name}><Link to={`/aircondetail/${it.nodeAddr}`}>{it.name}</Link></h1>
        <p className={styles.content}>{it.content}</p>
        <div className={styles.daterow}>
          <Tag color={status[it.status].color}>{status[it.status].text}</Tag>
          <span className={styles.date}>{it.date}</span>
        </div>
      </div>),
    },
  ]

  return (
    <div className={styles.dashboard}>
      <Table pagination={false} showHeader={false} columns={columns} rowKey={(record, key) => key} dataSource={data.filter((item, key) => key < 4)} />
    </div>
  )
}

AirConDashboard.propTypes = {
  data: PropTypes.array,
}

export default AirConDashboard
