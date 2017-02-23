import React, {Component} from 'react';
import echarts from 'echarts';

class Chartcard extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      menukey:0,
      pricedata:[],
      unitpricedata:[],
      directiondata:[],
      roomcountdata:[{name:'',value:0},{name:'',value:0}],
      followdata:[]
    })
  }

  renderPriceChart(menukey){
    this.props.getChartData(menukey,'price',(data)=>{
      this.setState({
        pricedata:data,
        menukey:menukey
      },()=>{
        const options0 = this.getOption0();
        const myChart0 = echarts.init(this.refs.chartcard0);
        myChart0.setOption(options0);
      })
    });
  }

  renderUnitPriceChart(menukey){
    this.props.getChartData(menukey,'unitprice',(data)=>{
      this.setState({
        unitpricedata:data,
        menukey:menukey
      },()=>{
        const options1 = this.getOption1();
        const myChart1 = echarts.init(this.refs.chartcard1);
        myChart1.setOption(options1);
      })
    });
  }

  renderDirectionChart(menukey){
    this.props.getChartData(menukey,'direction',(data)=>{
      this.setState({
        directiondata:data,
        menukey:menukey
      },()=>{
        const options2 = this.getOption2();
        const myChart2 = echarts.init(this.refs.chartcard2);
        myChart2.setOption(options2);
      })
    });
  }

  renderRoomCountChart(menukey){
    this.props.getChartData(menukey,'roomcount',(data)=>{
      this.setState({
        roomcountdata:data,
        menukey:menukey
      },()=>{
        const options3 = this.getOption3();
        const myChart3 = echarts.init(this.refs.chartcard3);
        myChart3.setOption(options3);
      })
    });
  }

  renderFollowChart(menukey){
    this.props.getChartData(menukey,'follow',(data)=>{
      this.setState({
        followdata:data,
        menukey:menukey
      },()=>{
        const options4 = this.getOption4();
        const myChart4 = echarts.init(this.refs.chartcard4);
        myChart4.setOption(options4);
      })
    });
  }

  componentDidMount() {
    this.renderPriceChart(0);
    this.renderUnitPriceChart(0);
    this.renderDirectionChart(0);
    this.renderRoomCountChart(0);
    this.renderFollowChart(0);
  }

  componentWillReceiveProps(nextProps) {
    this.renderPriceChart(nextProps.menukey);
    this.renderPriceChart(nextProps.menukey);
    this.renderUnitPriceChart(nextProps.menukey);
    this.renderDirectionChart(nextProps.menukey);
    this.renderRoomCountChart(nextProps.menukey);
    this.renderFollowChart(nextProps.menukey);
  }

  render() {
    return (
      <div className='chartcard wraper'>
        <div className='chartcard-item'>
          <div ref='chartcard0' className='chartcard-table'>

          </div>
          <div className='chartcard-text'>
            <li>在链家{this.menuKeyParseArea()}二手房近几月总价数据中：</li>
            <li>最高价格为{Math.max.apply(null,this.state.pricedata.map(item=>item.price))}万</li>
            <li>最低价格为{Math.min.apply(null,this.state.pricedata.map(item=>item.price))}万</li>
            <li>大部分房屋总价都在300万元以下，较上波动较大</li>
            <li>更多详细数据可在下方数据列表中排序查看</li>
          </div>
        </div>
        <div className='chartcard-item'>
          <div className='chartcard-text'>
            <li>在链家{this.menuKeyParseArea()}二手房近几天单价数据中：</li>
            <li>最高价格为{Math.max.apply(null,this.state.unitpricedata.map(item=>item.unitprice))}元</li>
            <li>最低价格为{Math.min.apply(null,this.state.unitpricedata.map(item=>item.unitprice))}元</li>
            <li>大部分房屋单价都在2万元以下，上下波动都较大</li>
            <li>更多详细数据可在下方数据列表中排序查看</li>
          </div>
          <div ref='chartcard1' className='chartcard-table'>

          </div>
        </div>
        <div className='chartcard-item'>
          <div ref='chartcard2' className='chartcard-table'>

          </div>
          <div className='chartcard-text'>
            <li>在链家{this.menuKeyParseArea()}二手房朝向分布数据中：</li>
            <li>验证了传统风俗，坐北朝南的房子最多</li>
            <li>朝东、东南方的房屋也不少</li>
            <li>朝西边、北边的那种房子最少，原因大家都懂的...</li>
            <li>鼠标移至饼状图可见具体分布比例</li>
          </div>
        </div>
        <div className='chartcard-item'>
          <div className='chartcard-text'>
            <li>在链家{this.menuKeyParseArea()}二手房户型分布数据中：</li>
            <li>{this.state.roomcountdata[0]["name"]}和{this.state.roomcountdata[1]["name"]}的户型最抢手</li>
            <li>适合青年朋友居住，毕竟经济适用型</li>
            <li>当然还有少部分车位也在售卖中</li>
            <li>鼠标移至饼状图可见具体分布比例</li>
          </div>
          <div ref='chartcard3' className='chartcard-table'>

          </div>
        </div>
        <div className='chartcard-item'>
          <div ref='chartcard4' className='chartcard-table'>

          </div>
          <div className='chartcard-text'>
            <li>为避免广告嫌疑</li>
            <li>此处无文案...</li>
            <li>排名先后仅供参考</li>
            <li>更多详细数据可在下方数据列表中排序查看</li>
          </div>
        </div>

      </div>
    );
  }

  menuKeyParseArea() {
    const menuitems=['高新','青羊','武侯','锦江','成华','金牛','天府新区','双流','温江','郫都','龙泉驿','新都'];
    return menuitems[this.state.menukey];

  }

  getOption0() {
    return {
        title: {
            text: this.menuKeyParseArea()+'区——二手房屋总价实时数据',
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
            text: this.menuKeyParseArea()+'区——近期房屋单价实时数据',
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
            text: this.menuKeyParseArea()+'区——房屋朝向分布比例',
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
            text: this.menuKeyParseArea()+'区——房屋户型分布比例',
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
                startAngle:180,
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
          text: this.menuKeyParseArea()+'区——最受关注的二手房屋TOP10',
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
