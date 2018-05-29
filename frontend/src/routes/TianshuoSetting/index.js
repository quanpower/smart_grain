import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

import { AirconUpdateStartEndTime } from './components'

const AirConStartEndTime = ({ location, dispatch, airconStartEndTime, loading }) => {
  const { startTime, endTime } = airconStartEndTime

  console.log('---start time is---:',startTime)

  return (
    <div className="content-inner">

      <AirconUpdateStartEndTime dispatch={dispatch} location={location} airconStartEndTime={airconStartEndTime} />

    </div>
  )
}



export default connect(({ airconStartEndTime, loading }) => ({ airconStartEndTime, loading }))(AirConStartEndTime)
