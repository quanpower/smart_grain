import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popconfirm, message, InputNumber } from 'antd'
import styles from './airconOnOffControl.less'
import { routerRedux, Link} from 'dva/router'
import pathToRegexp from 'path-to-regexp'


function AirconOnOffAllOneKey ({ dispatch, barnNo }) {

  const onButtonProps = {
    type: 'primary',
    size: 'large',
    icon: 'poweroff',

    onClick () {
      console.log('clicked ON!')
    },
  }

  const offButtonProps = {
    type: 'danger',
    size: 'large',
    icon: 'poweroff',

    onClick () {
      console.log('clicked OFF!')
    },
  }


  const onConfirmProps = {
    title: '确定提交操作？',
    okText: '确定',
    cancelText: '取消',

    onConfirm () {
      console.log('确定启动!')
      message.success('启动成功！')
      console.log('barnno is :', barnNo)

      dispatch({
        type: 'airconControl/airconOnOffAllOneKey',
        payload: {
          airconSwitch: '1',
          barnNo: barnNo,
        },
      })

    },

    onCancel () {
      console.log('取消启动!')
      message.error('取消启动！')
    },
  }



  const offConfirmProps = {
    title: '确定提交操作？',
    okText: '确定',
    cancelText: '取消',

    onConfirm () {
      console.log('确定关闭!')
      message.success('关闭成功！')

      dispatch({
        type: 'airconControl/airconOnOffAllOneKey',
        payload: {
          airconSwitch: '0',
          barnNo: barnNo,
        },
      })
    },

    onCancel () {
      console.log('取消提交!')
      message.error('取消关闭！')
    },

  }

  const inputNumberProps = {
    min: 0,
    max: 24,
    step: 0.1,
    size: 'large',
    onChange (value) {
      console.log(`delay ${value} hours to poweroff`)

      dispatch({
        type: 'airconControl/updateBarnLoraNode',
        payload: {
          timeDelta: value,
          barnNo: barnNo,
        },
      })
    },
  }


  return (
    <div className={styles.airconOnOffControl}>

      <div>
        <Popconfirm {...onConfirmProps}>
          <Button {...onButtonProps}>一键启动</Button>
          <InputNumber {...inputNumberProps} />
        </Popconfirm>
        <Popconfirm {...offConfirmProps}>
          <Button {...offButtonProps}>一键停止</Button>
        </Popconfirm>
      </div>
    </div>
  )
}

AirconOnOffAllOneKey.propTypes = {
  dispatch: PropTypes.func,

}

export default AirconOnOffAllOneKey
