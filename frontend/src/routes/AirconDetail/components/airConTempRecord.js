import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, Button ,DatePicker, message} from 'antd'

const AirConTempRecord = ({ airConTempRecord }) => {
  const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  }, {
    title: '1',
    dataIndex: 'Temp1',
    key: 'Temp1',
  }, {
    title: '2',
    dataIndex: 'Temp2',
    key: 'Temp2',
  }, {
    title: '3',
    dataIndex: 'Temp3',
    key: 'Temp3',
  },
  ]
  console.log('airConTempRecord', airConTempRecord)

  return (
    <Table
      dataSource={airConTempRecord}
      columns={columns}
    />
  )
}

AirConTempRecord.propTypes = {
  airConTempRecord: PropTypes.array,
}

export default AirConTempRecord
