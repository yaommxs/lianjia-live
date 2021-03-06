import React, {Component} from 'react';
import { Icon,Menu } from 'antd';

class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      menu:['高新','青羊','武侯','锦江','成华','金牛','天府新区','双流','温江','郫都','龙泉驿','新都']
    }
  }

  render() {
    const arealist=this.state.menu.map((areaitem,index)=>{
      return (<Menu.Item key={index} >
                <span>{areaitem}</span>
              </Menu.Item>)
    })
    return (
        <div className='fixhead'>
          <div className='header'>
            <div className='wraper'>
              <span className='headerlianjia'><a href="http://cd.lianjia.com/">看 链 家 </a></span>
              ——<span className='headercity'><Icon type='environment-o'></Icon><a href="http://cd.lianjia.com/">成都</a></span> 地区二手房源近期季度数据直播平台
            </div>
          </div>
          <Menu className='wraper' mode="horizontal" defaultSelectedKeys={['0']} onSelect={this.props.setKey}>
            {arealist}
          </Menu>
        </div>
    );
  }
}
export default Head;
