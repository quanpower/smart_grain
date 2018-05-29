import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { routerRedux, Link} from 'dva/router'


function AudioAlarm ({ alarmStatus, showAudio, dispatch }) {

  const audioProps = {

    autoPlay: "true",
    src: "http://www.shxf.net/mp3/huozaijingbaosheng.mp3",

    onEnded () {
      console.log('------audio is over--------')

      dispatch({
        type: 'graindash/showAudio',
        payload: {
          showAudio: false,
        },
      })
    }
  }

  return (
      <div>
        {showAudio && alarmStatus &&
          <audio {...audioProps}>
              Your browser does not support the audio element.
          </audio>
        }
      </div>
  )
}

AudioAlarm.propTypes = {
}

export default AudioAlarm
