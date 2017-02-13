import React, { Component } from 'react';
import axios from 'axios';
import { Rate,Pagination,Card,Button,Radio,Group,Icon}  from 'antd';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import '../less/lianjia.less';

class App extends Component {

    constructor(props) {
        super(props);
        this.state={
          currentpage:1,
          total:0,
          orderby:'time',
          items:[]
        }
    }
    postItems(page,order){
      const request='http://localhost:3000/api/v1/itemlist';
      axios.post(request,{p:page,orderby:order})
      .then(res => {
        this.setState({ currentpage:page,total:res.data.total,orderby:order,items:res.data.items});
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    componentDidMount(){
      this.postItems(1,'time');
    }
    //页数改变
    onChange(page) {
      console.log(page);
      this.postItems(page,this.state.orderby);
    }

    itemSort(order,e){
      console.log(e.target);
      // var btn_type=e.target.getAttribute("type");
      // console.log(btn_type);
      this.postItems(1,order);
    }
    render() {
      let list=this.state.items.map((item) =>{
        //map中尽量使用箭头函数，要不然就绑定this
        return <li key={item.id}>价格：{item.price}万，链接：{item.alink}，关注度：{item.likes}</li>
      })

      return (
        <div>
          <Card title="链家——成都高新区二手房爬虫数据实时排行">
            <div>
              <RadioGroup >
                <RadioButton value='a' onClick={this.itemSort.bind(this,'time')}>最新<Icon type='clock-circle-o'/></RadioButton>
                <RadioButton value='b' onClick={this.itemSort.bind(this,'up')}>升序<Icon type='up'/></RadioButton>
                <RadioButton value='c' onClick={this.itemSort.bind(this,'down')}>降序<Icon type='down'/></RadioButton>
              </RadioGroup>

              <div>

              </div>
              <div>

              </div>
            </div>


            {list}
          </Card>
          <Pagination current={this.state.currentpage} defaultPageSize={15} total={this.state.total} onChange={this.onChange.bind(this)}/>

        </div>
      );
    }

}

export default App;
