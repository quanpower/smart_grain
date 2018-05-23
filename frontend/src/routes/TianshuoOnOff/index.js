import React, { Component, Fragment } from 'react';
import { connect } from 'dva'
import { Card, Row, Col } from 'antd'
import { color } from 'utils'
import styles from './index.less'
import { OnOffControl } from './components'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}


@connect(({ tianshuoOnOff, loading }) => ({
  tianshuoOnOff,
  loading: loading.effects['tianshuoOnOff/fetchBarnsOptions'],
}))



export default class TianshuoOnOffControl extends Component {
  state = {
    barns: 'all',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'tianshuoOnOff/fetchBarns',
    });

    this.props.dispatch({
      type: 'tianshuoOnOff/fetchAlarmStatus',
    });


    console.log('component did mount!')
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tianshuoOnOff/clear',
    });
  }


  render() {
    const { barns_state } = this.state;
    const { tianshuoOnOff, loading } = this.props;
    const { list, pagination } = tianshuoOnOff


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
          <Col lg={12} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card bordered={false}
                      className={styles.power1}
                      bodyStyle={{
                        padding: 0,
                        height: 204,
                        background: color.sky,
                      }}
                >
                  <OnOffControl dispatch={dispatch} tianshuoNo={1} content={'天硕1号空调开关控制'} name={'1'} title={'1号空调'} avatar={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506180316165&di=f56b4ef5671e23987359bc9b6f00dbb3&imgtype=0&src=http%3A%2F%2Fwww.dgjs123.com%2Fd%2Ffile%2F2015-05%2F124608p0eg0m07mz00ed7d.jpg'}/>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col lg={12} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card bordered={false}
                      className={styles.power2}
                      bodyStyle={{
                        padding: 0,
                        height: 204,
                        background: color.grass,
                      }}
                >
                  <OnOffControl dispatch={dispatch} tianshuoNo={2} content={'天硕2号空调开关控制'} name={'2'} title={'2号空调'} avatar={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506180316165&di=f56b4ef5671e23987359bc9b6f00dbb3&imgtype=0&src=http%3A%2F%2Fwww.dgjs123.com%2Fd%2Ffile%2F2015-05%2F124608p0eg0m07mz00ed7d.jpg'}/>
                </Card>
              </Col>
            </Row>
          </Col>

        </Row>
      </Fragment>
    );
  }
}

