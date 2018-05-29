import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List = ({ ...tableProps }) => {
  const columns = [
    {
      title: '仓号',
      dataIndex: 'grain_barn_id',
      className: styles.image,
      width: 64,
      render: text => <img alt="Feture" width={26} src={text} />,
    }, {
      title: '网关',
      dataIndex: 'lora_gateway_id',
      key: 'lora_gateway_id',
    }, {
      title: '节点',
      dataIndex: 'lora_node_addr',
      key: 'lora_node_addr',
    }, {
      title: '温度1',
      dataIndex: 'temp1',
      key: 'temp1',
    }, {
      title: '温度2',
      dataIndex: 'temp2',
      key: 'temp2',
    }, {
      title: '温度3',
      dataIndex: 'temp3',
      key: 'temp3',
    }, {
      title: '电池',
      dataIndex: 'battery_vol',
      key: 'battery_vol',
    }, {
      title: '日期时间',
      dataIndex: 'datetime',
      key: 'datetime',
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        bordered
        scroll={{ x: 850 }}
        columns={columns}
        simple
        className={styles.table}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default List
