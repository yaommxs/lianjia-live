import React, {Component} from 'react';
import { Pagination,Card,Button,Radio,Icon,Input,Table} from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Search = Input.Search;

class Itemscard extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        menukey:0,
        issearch:false,
        currentpage:1,
        onbtn:'9',
        total:0,
        orderitem:'time',
        orderby:'down',
        items:[]
      }
  }
  //renderPostItemsData函数中有回调函数，一般数据render(setState)完也就了事
  //但是要拿dom做别的事的话就得再次用回调封装render,比如echarts
  renderPostItemsData(menukey,page,orderitem,orderby){
    //函数套函数，es6中箭头函数自动绑定this
    this.props.postItemsData(menukey,page,orderitem,orderby,(data)=>{
      this.setState({
        currentpage:page,
        total:data.total,
        orderitem:orderitem,
        orderby:orderby,
        items:data.items
      });
      // 渲染之后要拿state干别的事就在这里干，不能在renderPostItemsData函数外的下边干
    })
  }

  renderSearchData(word){
    this.props.postSearchData(this.state.menukey,word,(data)=>{
      this.setState({
        issearch:data.total?true:false,
        currentpage:0,
        onbtn:'9',
        total:0,
        items:data.items
      });
      // 渲染之后要拿state干别的事就在这里干，不能在renderSearchData函数外的下边干
    })
  }

  //数据第一次render
  componentDidMount(){
    this.renderPostItemsData(0,1,this.state.orderitem,this.state.orderby);
  }

  //父级属性更新
  componentWillReceiveProps(nextProps) {
    //函数套函数，es6中箭头函数自动绑定this
    this.setState({
      menukey:nextProps.menukey,
      issearch:false,
      currentpage:1,
      onbtn:'9',
      total:0,
      orderitem:'time',
      orderby:'down',
      items:[]
    },()=>{
      this.renderPostItemsData(this.state.menukey,1,this.state.orderitem,this.state.orderby)
    })
  }
  //页数改变
  changePage(page) {
    this.renderPostItemsData(this.state.menukey,page,this.state.orderitem,this.state.orderby);
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
      this.renderPostItemsData(this.state.menukey,1,orderitem,orderby);
    }
  }
  // 搜索之后的排序没去后端请求了，直接在state里拿
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
      this.renderSearchData(word);
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
      render: (text,record) => <a href={record.alink} >{text}</a>
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
      <div className='itemscard wraper'>
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
          <Table columns={columns} dataSource={datatop} locale={empty} pagination={false} size='small' rowKey={(record) => record.alink}/>
          <Pagination current={this.state.currentpage} defaultPageSize={20}
          total={this.state.total} onChange={this.changePage.bind(this)} showQuickJumper={true}/>
        </Card>

      </div>
    );
  }

}

export default Itemscard;
