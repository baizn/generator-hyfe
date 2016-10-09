import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import echarts from 'echarts'
import { loadDefaultChartData, loadTestData, loadItems } from '../actions/items'
import { Map } from 'immutable'

const styles = {
  h1: {
    color: 'red',
    fontSize: '50px',
    marginTop: '100px'
  },
  a: {
    color: '#fff'
  },
  table: {
    background: 'aquamarine',
    width: '500px'
  }
}

function mapStateToProps(state) {
  debugger
  return {
    chartData: state.charts,
  }
}

@connect(mapStateToProps, { loadDefaultChartData, loadTestData })
export default class Default extends Component {
  static fetchData({params, query}) {
    console.log('参数为：' + params, query)
    // return store.dispatch(loadTestData())
    return [loadItems(params), loadTestData()]
  }

  componentDidMount() {
    this.props.loadDefaultChartData()
    //this.props.loadTestData()
    
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {
    debugger
    if(this.props.chartData !== nextProps.chartData) {
      const data = nextProps.chartData
      let charts = echarts.init(this.refs.charts)
      charts.setOption({
        title: {
          text: 'Echarts示例'
        },
        xAxis: {
          data: data.get('xData').toArray()
        },
        yAxis: {},
        series: [
          {
            name: '数量',
            type: 'bar',
            data: data.get('yData').toArray()
          }
        ]
      })
    }
  }

  render() {
    let testData = this.props.chartData.get('test')
    let state = testData.get('status')
    let data = testData.get('result')
    let message = testData.get('msg')
    //console.log(state, data, message)
    return (
      <div className='intro'>
        <h1 style={styles.h1}>示例项目</h1>
        <div ref='charts' style={{width: 600, height: 400}}></div>
        <div>
            <h2>{message}</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>用户名</th>
                  <th>角色</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map( col => {
                    return <tr key={col.get('id')}>
                      <td>{col.get('id')}</td>
                      <td>{col.get('userName')}</td>
                      <td>{col.get('role')}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
        </div>
        <Link style={styles.a} to='/list'>Next Page(路由)</Link>
      </div>
    );
  }
}