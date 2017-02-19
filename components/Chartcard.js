import React, {Component} from 'react';
import echarts from 'echarts';

class Chartcard extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      pricedata:[],
      unitpricedata:[],
      directiondata:[],
      roomcountdata:[],
      followdata:[]
    })
  }

  renderPriceChart(){
    this.props.getChartData('price',(data)=>{
      this.setState({
        pricedata:data
      });
      const options0 = this.getOption0();
      const myChart0 = echarts.init(this.refs.chartcard0);
      myChart0.setOption(options0);
    });
  }

  renderUnitPriceChart(){
    this.props.getChartData('unitprice',(data)=>{
      this.setState({
        unitpricedata:data
      });
      const options1 = this.getOption1();
      const myChart1 = echarts.init(this.refs.chartcard1);
      myChart1.setOption(options1);
    });
  }

  renderDirectionChart(){
    this.props.getChartData('direction',(data)=>{
      this.setState({
        directiondata:data
      });
      const options2 = this.getOption2();
      const myChart2 = echarts.init(this.refs.chartcard2);
      myChart2.setOption(options2);
    });
  }

  RoomCountChart(){
    this.props.getChartData('roomcount',(data)=>{
      this.setState({
        roomcountdata:data
      });
      const options3 = this.getOption3();
      const myChart3 = echarts.init(this.refs.chartcard3);
      myChart3.setOption(options3);
    });
  }

  renderFollowChart(){
    this.props.getChartData('follow',(data)=>{
      this.setState({
        followdata:data
      });
      const options4 = this.getOption4();
      const myChart4 = echarts.init(this.refs.chartcard4);
      myChart4.setOption(options4);
    });
  }

  componentDidMount() {
    this.renderPriceChart();
    this.renderUnitPriceChart();
    this.renderDirectionChart();
    this.RoomCountChart();
    this.renderFollowChart();
  }

  render() {
    return (
      <div className='chartcard wraper'>
        <div className='chartcard-item'>
          <div ref='chartcard0' className='chartcard-table'>

          </div>
          <div className='chartcard-text'>
            <li>在链家成华区二手房近一周总价数据中：</li>
            <li>最高价格为，在，我还是看看就好</li>
            <li>最低价格为，在</li>
            <li>5000</li>
            <li>大部分房屋总价都在100万元左右，上下波动较大</li>
          </div>
        </div>
        <div className='chartcard-item'>
          <div className='chartcard-text'>
            <li>在链家成华区二手房近一周数据中：</li>
            <li>最高价格为，在，我还是看看就好</li>
            <li>最低价格为，在</li>
            <li>5000</li>
            <li>大部分房屋单价都在10000元左右，上下波动较大</li>
          </div>
          <div ref='chartcard1' className='chartcard-table'>

          </div>
        </div>
        <div className='chartcard-item'>
          <div ref='chartcard2' className='chartcard-table'>

          </div>
          <div className='chartcard-text'>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
          </div>
        </div>
        <div className='chartcard-item'>
          <div className='chartcard-text'>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
          </div>
          <div ref='chartcard3' className='chartcard-table'>

          </div>
        </div>
        <div className='chartcard-item'>
          <div ref='chartcard4' className='chartcard-table'>

          </div>
          <div className='chartcard-text'>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
            <li>ssssssssssssssssssssssss</li>
          </div>
        </div>

      </div>
    );
  }

  getOption0() {
    return {
        title: {
            text: '成华区——最近一季度二手房屋总价实时数据',
            left: 'center',
            textStyle:{
              color:'#ccc',
              fontWeight:'normal'
            }
        },

        color: ['#00c187'],
        textStyle:{
          color:'#ababab',
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type:'category',
            data: this.state.pricedata.map(item=>item.time),
            axisLine:{
              onZero:false,
              lineStyle:{
                color:'#47816f'
              }
            },
            axisTick:{
              show:true
            }
        },
        yAxis: {
            name:'总价/万',
            splitLine: {
              lineStyle: {
                  color: ['#2b456a'],
                  type:'dashed'
              }
            },
            axisLine:{
              onZero:false,
              lineStyle:{
                color:'#47816f'
              }
            }
        },
        series: {
            name: '总价/万',
            type: 'line',
            smooth:true,
            symbol: 'none',
            data: this.state.pricedata.map(item=>item.price),
            lineStyle:{
              normal:{
                width:1
              }
            }
        }
    }
  }

  getOption1() {
    return {
        title: {
            text: '成华区——最近一周房屋单价实时数据',
            left: 'center',
            textStyle:{
              color:'#ccc',
              fontWeight:'normal'
            }
        },

        color: ['#00c187'],
        textStyle:{
          color:'#ababab',
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type:'category',
            data: this.state.unitpricedata.map(item=>item.time),
            axisLine:{
              onZero:false,
              lineStyle:{
                color:'#47816f'
              }
            },
            axisTick:{
              show:true
            }
        },
        yAxis: {
            name:'单价/（元/平米）',
            splitLine: {
              lineStyle: {
                  color: ['#2b456a'],
                  type:'dashed'
              }
            },
            axisLine:{
              onZero:false,
              lineStyle:{
                color:'#47816f'
              }
            }
        },
        series: {
            name: '单价/（元/平米）',
            type: 'line',
            smooth:true,
            symbol: 'none',
            data: this.state.unitpricedata.map(item=>item.unitprice),
            lineStyle:{
              normal:{
                width:1
              }
            }
        }
    }
  }

  getOption2(){
    return {
        title: {
            text: '成华区——房屋朝向分布比例',
            left: 'center',
            textStyle:{
              color:'#ccc',
              fontWeight:'normal'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series : [
            {
                name:'房屋朝向/个',
                type:'pie',
                radius : '60%',
                center: ['50%', '50%'],
                data:this.state.directiondata,
                label: {
                    normal: {
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#ccc'
                        },
                        smooth: 0,
                        length: 10,
                        length2: 20
                    }
                }
            }
        ]
    }
  }

  getOption3(){
    return {
        title: {
            text: '成华区——房屋户型分布比例',
            left: 'center',
            textStyle:{
              color:'#ccc',
              fontWeight:'normal'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series : [
            {
                name:'户型/个',
                type:'pie',
                startAngle:340,
                radius : '60%',
                center: ['50%', '50%'],
                data:this.state.roomcountdata,
                label: {
                    normal: {
                        textStyle: {
                            color: '#ccc'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#ccc'
                        },
                        smooth: 0,
                        length: 10,
                        length2: 20
                    }
                }
            }
        ]
    }
  }

  getOption4() {
    return {
      title: {
          left:'center',
          text: '成华区——最受关注的二手房屋TOP10',
          textStyle:{
            color:'#ccc',
            fontWeight:'normal'
          }
      },
      color: ['#00c187'],
      textStyle:{
        color:'#ababab',
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      grid: {
          left: '20%'
      },
      xAxis: {
          name:'关注人数',
          type: 'value',
          splitLine: {
            lineStyle: {
                color: ['#2b456a'],
                type:'dashed'
            }
          },
          axisLine:{
            lineStyle:{
              color:'#47816f'
            }
          },
          nameLocation:'middle',
          nameGap:30
      },
      yAxis: {
          name:'地址',
          type: 'category',
          data: this.state.followdata.map(item=>item.title),
          axisLine:{
            lineStyle:{
              color:'#47816f'
            }
          }
      },
      series: [
          {
              name: '关注人数',
              type: 'bar',
              data: this.state.followdata.map(item=>item.follow),
              lineStyle:{
                normal:{
                  width:1
                }
              }
          }
      ]
    }
  }

}

export default Chartcard;
