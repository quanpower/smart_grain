import React from 'react'
import PropTypes from 'prop-types'
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

AirConStartEndTime.propTypes = {
  airconStartEndTime: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ airconStartEndTime, loading }) => ({ airconStartEndTime, loading }))(AirConStartEndTime)
