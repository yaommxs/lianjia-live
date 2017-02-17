import React, {Component} from 'react';
import { Pagination,Card,Button,Radio,Icon,Input,Table} from 'antd';
import axios from 'axios';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Search = Input.Search;

export default class Datacard extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        issearch:false,
        currentpage:1,
        onbtn:'9',
        total:0,
        orderitem:'time',
        orderby:'down',
        items:[]
      }
  }
  //postItems封装
  postItems(page,orderitem,orderby){
    const request='http://localhost:3000/api/v1/itemlist';
    axios.post(request,{p:page,orderitem:orderitem,orderby:orderby})
    .then((res) => {
      this.setState({
        currentpage:page,
        total:res.data.total,
        orderitem:orderitem,
        orderby:orderby,
        items:res.data.items
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //postsearch封装
  postsearch(word){
    const request='http://localhost:3000/api/v1/search';
    axios.post(request,{word:word})
    .then((res) => {
        this.setState({
          issearch:res.data.total?true:false,
          currentpage:0,
          onbtn:'9',
          total:0,
          items:res.data.items
        });

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //初始化
  componentDidMount(){
    this.postItems(1,this.state.orderitem,this.state.orderby);
  }
  //页数改变
  changePage(page) {
    this.postItems(page,this.state.orderitem,this.state.orderby);
  }
  //排序
  itemSort(e){
    //踩一坑，想把高亮和属性值同时获取，结果不行，选中颜色高亮得用value，传递其他属性用别的属性
    var onbtn=e.target.value;
    var orderbyarr=e.target.orderby.split('-');
    this.setState({onbtn:e.target.value});
    var orderitem=orderbyarr[0];
    var orderby=orderbyarr[1];
    if (this.state.issearch) {
      this.itemAfterSearchSort(orderitem,orderby);
    }else {
      this.postItems(1,orderitem,orderby);
    }
  }
  itemAfterSearchSort(orderitem,orderby){
    if (orderby=='down') {
      var sortitems=this.state.items;
      sortitems.sort(function(a,b){
        return b[orderitem]-a[orderitem];
      })
      this.setState({
        items:sortitems
      })
    }else {
      var sortitems=this.state.items;
      sortitems.sort(function(a,b){
        return a[orderitem]-b[orderitem];
      })
      this.setState({
        items:sortitems
      })
    }
  }
  searchHouse(word){
    word=word.trim();
    if (word) {
      this.postsearch(word);
    }
  }
  render() {
    const datatop=this.state.items;
    const columns = [{
      title: '排行',
      dataIndex: 'top',
      key: 'top',
    },{
      title: '总价',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span><span className='pricestrong'>{text}</span>{' 万'}</span>
    },{
      title: '单价/元',
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

    const empty={emptyText: '暂无房源 点击排序按钮载入数据...'}
    return (
      <div className='datacard wraper'>
        <Card title="链家——二手房源近期季度数据排行榜">
          <div >
            <RadioGroup size='large' value={this.state.onbtn} className='sortbtngroup' onChange={this.itemSort.bind(this)}>
              <RadioButton value='1' orderby='price-up'>总价升序</RadioButton>
              <RadioButton value='2' orderby='price-down'>总价降序</RadioButton>
              <RadioButton value='3' orderby="unitprice-up">单价升序</RadioButton>
              <RadioButton value='4' orderby="unitprice-down">单价降序</RadioButton>
              <RadioButton value='5' orderby="square-up">面积升序</RadioButton>
              <RadioButton value='6' orderby="square-down">面积降序</RadioButton>
              <RadioButton value='7' orderby="follow-down">关注度降序</RadioButton>
              <RadioButton value='8' orderby="see-down">看房数降序</RadioButton>
              <RadioButton value='9' orderby="time-down">最新发布</RadioButton>
            </RadioGroup>
            <Search style={{width:250,float:'right'}} size='large' placeholder="搜索房源..." onSearch={this.searchHouse.bind(this)} />
          </div>
          <Table columns={columns} dataSource={datatop} locale={empty} pagination={false} size='small' rowKey={(record) => record.id}/>
          <Pagination current={this.state.currentpage} defaultPageSize={20}
          total={this.state.total} onChange={this.changePage.bind(this)} showQuickJumper={true}/>
        </Card>

      </div>
    );
  }
}
