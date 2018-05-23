import React, { Component, Fragment } from 'react';
import { connect } from 'dva'
import { Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import List from './List'

const TabPane = Tabs.TabPane

const EnumPostStatus = {
  UNPUBLISH: 1,
  PUBLISHED: 2,
}


@connect(({ grainHistory, loading }) => ({
  grainHistory,
  loading: loading.effects['grainHistory/fetchBarnsOptions'],
}))


export default class GrainHistory extends Component {
  state = {
    barns: 'all',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'grainHistory/fetchBarns',
    });

    this.props.dispatch({
      type: 'grainHistory/fetchAlarmStatus',
    });


    console.log('component did mount!')
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'grainHistory/clear',
    });
  }

  

  render() {
    const { barns_state } = this.state;
    const { grainHistory, loading } = this.props;
    const { list, pagination } = grainHistory


    const listProps = {
      pagination,
      dataSource: list,
      loading: loading.effects['grainhistory/query'],
      onChange (page) {
        dispatch(routerRedux.push({
          pathname,
          search: queryString.stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          }),
        }))
      },
    }

    const handleTabClick = (key) => {
      console.log('tab clicked!')
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          status: key,
        }),
      }))
    }

    return (
      <Fragment>
        <Row gutter={24}>
          <Tabs activeKey={query.status === String(EnumPostStatus.UNPUBLISH) ? String(EnumPostStatus.UNPUBLISH) : String(EnumPostStatus.PUBLISHED)} onTabClick={handleTabClick}>
            <TabPane tab="历史记录" key={String(EnumPostStatus.PUBLISHED)}>
              <List {...listProps} />
            </TabPane>
            <TabPane tab="报警记录" key={String(EnumPostStatus.UNPUBLISH)}>
              <List {...listProps} />
            </TabPane>
          </Tabs>
        </Row>
      </Fragment>
    );
  }
}





