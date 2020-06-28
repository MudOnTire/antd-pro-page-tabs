import { Card, Col, Row, Statistic } from 'antd';
import { FormattedMessage, connect, formatMessage, Dispatch } from 'umi';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import { StateType } from './model';
import { Pie, WaterWave, Gauge, TagCloud, Map } from './components/Charts';
import ActiveChart from './components/ActiveChart';
import styles from './style.less';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

interface MonitorProps {
  dashboardAndMonitor: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

class Monitor extends Component<MonitorProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndMonitor/fetchTags',
    });
  }

  render() {
    const { dashboardAndMonitor, loading } = this.props;
    const { tags } = dashboardAndMonitor;
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={24}>
            <Col
              xl={18}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <Card title="Real-Time Trading Activity" bordered={false}>
                <Row>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title="Total transactions today"
                      suffix="元"
                      value={numeral(124543233).format('0,0')}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic title="Sales target completion rate" value="92%" />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Countdown
                      title="Remaining time of activity"
                      value={deadline}
                      format="HH:mm:ss:SSS"
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title="Total transactions per second"
                      suffix="元"
                      value={numeral(234).format('0,0')}
                    />
                  </Col>
                </Row>
                <div className={styles.mapChart}>
                  <Map />
                </div>
              </Card>
            </Col>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card
                title="Activity forecast"
                style={{
                  marginBottom: 24,
                }}
                bordered={false}
              >
                <ActiveChart />
              </Card>
              <Card
                title="Efficiency"
                style={{
                  marginBottom: 24,
                }}
                bodyStyle={{
                  textAlign: 'center',
                }}
                bordered={false}
              >
                <Gauge title="Ratio" height={180} percent={87} />
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col
              xl={12}
              lg={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <Card title="Proportion Per Category" bordered={false} className={styles.pieCard}>
                <Row
                  style={{
                    padding: '16px 0',
                  }}
                >
                  <Col span={8}>
                    <Pie
                      animate={false}
                      percent={28}
                      title="Fast food"
                      total="28%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      color="#5DDECF"
                      percent={22}
                      title="Western food"
                      total="22%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      color="#2FC25B"
                      percent={32}
                      title="Hot pot"
                      total="32%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col
              xl={6}
              lg={12}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <Card
                title="Popular Searches"
                loading={loading}
                bordered={false}
                bodyStyle={{
                  overflow: 'hidden',
                }}
              >
                <TagCloud data={tags || []} height={161} />
              </Card>
            </Col>
            <Col
              xl={6}
              lg={12}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <Card
                title="Resource Surplus"
                bodyStyle={{
                  textAlign: 'center',
                  fontSize: 0,
                }}
                bordered={false}
              >
                <WaterWave height={161} title="Fund Surplus" percent={34} />
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    dashboardAndMonitor,
    loading,
  }: {
    dashboardAndMonitor: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    dashboardAndMonitor,
    loading: loading.models.dashboardAndMonitor,
  }),
)(Monitor);
