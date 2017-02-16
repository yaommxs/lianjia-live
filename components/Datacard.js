import React, {Component} from 'react';
import { Pagination,Card,Button,Group,Icon,Radio,Table} from 'antd';
import axios from 'axios';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class Datacard extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        currentpage:1,
        total:0,
        orderby:'time',
        items:[]
      }
  }
  //post封装
  postItems(page,order){
    const request='http://localhost:3000/api/v1/itemlist';
    axios.post(request,{p:page,orderby:order})
    .then((res) => {
      this.setState({ currentpage:page,total:res.data.total,orderby:order,items:res.data.items});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //初始化
  componentDidMount(){
    this.postItems(1,'time');
  }
  //页数改变
  onChange(page) {
    console.log(page);
    this.postItems(page,this.state.orderby);
  }
  //排序
  itemSort(order){
    this.postItems(1,order);
  }
  render() {
    const datatop=this.state.items;
    const columns = [{
      title: '排行',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span><span className='pricestrong'>{text}</span>{' 万'}</span>
    },{
      title: '单价',
      dataIndex: 'unitprice',
      key: 'unitprice'
    },{
      title: '地址',
      dataIndex: 'title',
      key: 'title',
      render: (text,record) => <a href={record.alink} target='_blank'>{text}</a>
    },{
      title: '面积/平方',
      dataIndex: 'square',
      key: 'square'
    },{
      title: '户型',
      dataIndex: 'roomcount',
      key: 'roomcount'
    },{
      title: '朝向',
      dataIndex: 'direction',
      key: 'direction'
    },{
      title: '关注度',
      dataIndex: 'follow',
      key: 'follow'
    },{
      title: '看房次数',
      dataIndex: 'see',
      key: 'see'
    },{
      title: '发布时间',
      dataIndex: 'time',
      key: 'time'
    }];
    return (
      <div className='datacard wraper'>
        <Card title="链家——二手房源数据排行榜">
          <div>
            <RadioGroup >
              <RadioButton value='a' onClick={this.itemSort.bind(this,'time')}>最新<Icon type='clock-circle-o'/></RadioButton>
              <RadioButton value='b' onClick={this.itemSort.bind(this,'up')}>升序<Icon type='up'/></RadioButton>
              <RadioButton value='c' onClick={this.itemSort.bind(this,'down')}>降序<Icon type='down'/></RadioButton>
            </RadioGroup>

          </div>



        <Table columns={columns} dataSource={datatop} pagination={false} size='small' rowKey={(record) => record.id}/>
        <Pagination current={this.state.currentpage} defaultPageSize={20}
          total={this.state.total} onChange={this.onChange.bind(this)} showQuickJumper={true}/>
        </Card>

      </div>
    );
  }
}
