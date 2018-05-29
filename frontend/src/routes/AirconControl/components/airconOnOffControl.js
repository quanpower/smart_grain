import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popconfirm, message, InputNumber, Tag } from 'antd'
import styles from './airconOnOffControl.less'
import { routerRedux, Link} from 'dva/router'
import pathToRegexp from 'path-to-regexp'


function AirconOnOffControl ({ dispatch, nodeAddr, content, name, title, avatar, onoff_status }) {

  const onButtonProps = {
    type: 'primary',
    icon: 'poweroff',

    onClick () {
      console.log('clicked ON!')
    },
  }

  const offButtonProps = {
    type: 'danger',
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
        type: 'airconcontrol/airconOnOff',
        payload: {
          airconSwitch: '1',
          nodeAddr: nodeAddr,
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
        type: 'airconcontrol/airconOnOff',
        payload: {
          airconSwitch: '0',
          nodeAddr: nodeAddr,
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
    onChange (value) {
      console.log(`delay ${value} hours to poweroff`)

      dispatch({
        type: 'airconcontrol/updateLoraNode',
        payload: {
          timeDelta: value,
          nodeAddr: nodeAddr,
        },
      })
    },
  }


  return (
    <div className={styles.airconOnOffControl}>
      <div className={styles.inner}>
        {content}
      </div>

      <div className={styles.footer}>
        <div className={styles.description}>
          <p>{name}</p>
          <h3>{title}</h3>

          <div className={styles.anttag}>
            <Tag color={onoff_status.color}>{onoff_status.text}</Tag>
            <InputNumber size={'small'} value={onoff_status.current_value} />
          </div>

        </div>
        <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />
      </div>

      <div>
        <Popconfirm {...onConfirmProps}>
          <Button {...onButtonProps}>启动</Button>
        </Popconfirm>
        <InputNumber {...inputNumberProps} />

      </div>
      <div>
        <Popconfirm {...offConfirmProps}>
          <Button {...offButtonProps}>关闭</Button>
        </Popconfirm>
      </div>


    </div>
  )
}

AirconOnOffControl.propTypes = {
  dispatch: PropTypes.func,

}

export default AirconOnOffControl
