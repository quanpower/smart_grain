import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popconfirm, message, TimePicker, InputNumber } from 'antd'
import moment from 'moment'

import styles from './airconUpdateOneStartEndTime.less'
import { routerRedux, Link} from 'dva/router'
import pathToRegexp from 'path-to-regexp'


function AirconUpdateOneStartEndTime ({ dispatch, nodeAddr, airconStartEndTime }) {


  const { startTime, endTime } = airconStartEndTime

  console.log('start time is:', startTime)
  console.log('end time is:', endTime)

  console.log('airconStartEndTime is:', airconStartEndTime)


  const format = 'HH:mm'

  const startTimePickerProps = {
    format: format,
    defaultValue: moment('08:00', format),
    // open: false,

    onChange (time, timeString) {
      console.log(time, timeString)
      dispatch({
        type: 'airconStartEndTime/getStartTime',
        payload: {
          startTime: timeString,
        },
      })
    },

    onOpenChange (open) {
      console.log('open is :', open)
    },

    addon() {() => (
      <Button size="small" type="primary" >
        Ok
      </Button>
    )},

  }


  const endTimePickerProps = {
    format: format,
    defaultValue: moment('18:00', format),
    // open: false,

    onChange (time, timeString) {
      console.log(time, timeString)
      dispatch({
        type: 'airconStartEndTime/getEndTime',
        payload: {
          endTime: timeString,
        },
      })
    },

    onOpenChange (open) {
      console.log('open is :', open)
    },

    addon() {() => (
      <Button size="small" type="primary" >
        Ok
      </Button>
    )},

  }


  const onButtonProps = {
    type: 'primary',
    size: 'large',
    icon: 'poweroff',

    onClick () {
      console.log('clicked ON!')
    },
  }


  const onConfirmProps = {
    title: '确定提交操作？',
    okText: '确定',
    cancelText: '取消',

    onConfirm () {
      console.log('确定启动!')

      dispatch({
        type: 'airconStartEndTime/updateOneStartEndTime',
        payload: {
          startTime: startTime,
          endTime: endTime,
          nodeAddr: nodeAddr,
        },
      })
      message.success('启动成功！')


    },

    onCancel () {
      console.log('取消设置!')
      message.error('取消设置！')
    },
  }



  return (
    <div className={styles.airconOnOffControl}>
      <div className={styles.inner}>
        {nodeAddr}号空调设置
      </div>
      <div className={styles.footer}>
        <div className={styles.description}>
          <p>{nodeAddr}</p>
          <h3>{nodeAddr}号空调</h3>
        </div>
        {/*<div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />*/}
      </div>
      <div>
        <TimePicker {...startTimePickerProps } />
        <TimePicker {...endTimePickerProps} />

        <Popconfirm {...onConfirmProps}>
          <Button {...onButtonProps}>启停时间设置</Button>
        </Popconfirm>
      </div>

      <div>
        <InputNumber defaultValue={18} />
        <InputNumber defaultValue={28} />

        <Popconfirm {...onConfirmProps}>
          <Button {...onButtonProps}>上下限设置</Button>
        </Popconfirm>

      </div>
    </div>
  )
}

AirconUpdateOneStartEndTime.propTypes = {
  dispatch: PropTypes.func,

}

export default AirconUpdateOneStartEndTime
