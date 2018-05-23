import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popconfirm, message } from 'antd'
import styles from './electricControl.less'
import { routerRedux, Link} from 'dva/router'




function ElectricControl ({ dispatch, powerNo, content, name, title, avatar }) {

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

      dispatch({
        type: 'fireAlarm/switchElectricPower',
        payload: {
          powerSwitch: '1',
          powerNo: powerNo,
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
        type: 'fireAlarm/switchElectricPower',
        payload: {
          powerSwitch: '0',
          powerNo: powerNo,
        },
      })
    },

    onCancel () {
      console.log('取消提交!')
      message.error('取消关闭！')
    },

  }

  return (
    <div className={styles.electricControl}>
      <div className={styles.inner}>
        {content}
      </div>
      <div className={styles.footer}>
        <div className={styles.description}>
          <p>{name}</p>
          <h3>{title}</h3>
        </div>
        <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />
      </div>
      <div>
        <Popconfirm {...onConfirmProps}>
          <Button {...onButtonProps}>启动</Button>
        </Popconfirm>

        <Popconfirm {...offConfirmProps}>
          <Button {...offButtonProps}>关闭</Button>
        </Popconfirm>
      </div>
    </div>
  )
}

ElectricControl.propTypes = {
  dispatch: PropTypes.func,

}

export default ElectricControl
