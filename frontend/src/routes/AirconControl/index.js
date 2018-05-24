import React, { Component, Fragment } from 'react';
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Cascader, Card } from 'antd'
import List from './List'
// import Filter from './Filter'
// import Modal from './Modal'
import { AirconControlAutomatic, AirconControlManual } from './components'


@connect(({ airconControl, loading }) => ({
  airconControl,
  loading: loading.effects['airconControl/fetchBarns'],
}))




export default class AirConControl extends Component {
  state = {
    barns: 'all',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'airconControl/fetchBarns',
    });

    this.props.dispatch({
      type: 'airconControl/fetchAlarmStatus',
    });


    console.log('component did mount!')
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'airconControl/clear',
    });
  }


  render() {
    const { barns_state } = this.state;
    const { airconControl, dispatch, loading } = this.props;
    const { barnsOptions, airConControlItems, barnNo, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = airconControl
    const { pageSize } = pagination

    // const modalProps = {
    //     item: modalType === 'create' ? {} : currentItem,
    //     visible: modalVisible,
    //     maskClosable: false,
    //     confirmLoading: loading.effects['user/update'],
    //     title: `${modalType === 'create' ? '空调远程控制' : 'Update User'}`,
    //     wrapClassName: 'vertical-center-modal',
    //     onOk (data) {
    //       dispatch({
    //         // type: `airconcontrol/${modalType}`,
    //         type: 'airconcontrol/create',
    //         payload: data,
    //       })
    //       console.log('airconcontrol')
    //     },
    //     onCancel () {
    //       dispatch({
    //         type: 'airconcontrol/hideModal',
    //       })
    //       console.log('airconcontrol Cancel')
    //     },
    //   }

    //   console.log('----airConControlItems-----')
    //   console.log(airConControlItems)


    const cascaderProps = {

      size: 'large',
      defaultValue: ['1', '1'],
      options: barnsOptions,

      onChange (value) {
        console.log('------select value is:--------')
        console.log(value)
        const barn_no = value[1]
        dispatch(routerRedux.push(`/aircon_control/${barn_no}`))

      }
    }


    // const filterProps = {
    //   isMotion,
    //   filter: {
    //     ...location.query,
    //   },

    //   onFilterChange (value) {
    //     dispatch(routerRedux.push({
    //       pathname: location.pathname,
    //       search: queryString.stringify({
    //         ...value,
    //         page: 1,
    //         pageSize,
    //       }),
    //     }))
    //   },

    //   onSearch (fieldsValue) {
    //     fieldsValue.keyword.length ? dispatch(routerRedux.push({
    //       pathname: '/user',
    //       search: queryString.stringify({
    //         field: fieldsValue.field,
    //         keyword: fieldsValue.keyword,
    //       }),
    //     })) : dispatch(routerRedux.push({
    //       pathname: '/user',
    //     }))
    //   },

    //   onAdd () {
    //     dispatch({
    //       type: 'airconcontrol/showModal',
    //       payload: {
    //         modalType: 'create',
    //       },
    //     })
    //   },

    //   switchIsMotion () {
    //     dispatch({ type: 'airconcontrol/switchIsMotion' })
    //   },
    // }

    return (
      <Fragment>
        <Card bordered={false} bodyStyle={{ padding: '24px 36px 24px 0', }}>
        <Cascader {...cascaderProps} />

      </Card>

      // <Filter {...filterProps} />

      // <Modal {...modalProps} />

      <AirconControlManual dispatch={dispatch} location={location} barnNo={barnNo} airConControlItems={airConControlItems} />

      </Fragment>
    );
  }
}

