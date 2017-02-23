import React, {Component} from 'react';
import echarts from 'echarts';


class Digitcard extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      pricealldata:[],
      menukey:0
    })

  }

  renderPriceAllChart(menukey){
    this.props.getChartData(menukey,'priceall',(data)=>{
      this.setState({
        pricealldata:data,
        menukey:menukey
      },()=>{
        var options = this.getOption();
        var myChart = echarts.init(this.refs.chartcard);
        myChart.setOption(options);
      })
    });
  }

  componentDidMount() {
    this.renderPriceAllChart(0);
  }

  componentWillReceiveProps(nextProps) {
    this.renderPriceAllChart(nextProps.menukey)
  }

  render() {
    return (
        <div className='digitcard wraper'>
          <div className='digitcard-text'>
            公告：数据每日更新,时间可能会有延迟，信息仅供参考，感谢阅读！
          </div>
          <div className='digitcard-chart' ref='chartcard'></div>
        </div>

    );
  }

  menuKeyParseArea() {
    const menuitems=['高新','青羊','武侯','锦江','成华','金牛','天府新区','双流','温江','郫都','龙泉驿','新都'];
    return menuitems[this.state.menukey];
  }

  getOption() {
    return {
        title: {
            text: this.menuKeyParseArea()+'区——近期二手房屋总价概率密度分布',
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
            name:'价格/万',
            type:'category',
            data: this.state.pricealldata.map(item=>item.price),
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
            name:'概率/百分之',
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
            name: '概率',
            type: 'line',
            smooth:true,
            symbol: 'none',
            data: this.state.pricealldata.map(item=>item.f),
            lineStyle:{
              normal:{
                width:1
              }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(51, 196, 175)'
                    }, {
                        offset: 1,
                        color: 'rgb(26, 149, 134)'
                    }])
                }
            }
        }
    }
  }

}

export default Digitcard;
