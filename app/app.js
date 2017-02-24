import React, {Component} from 'react';
import axios from 'axios';

import Head from '../components/Head.js';
import Fullpagebtn from '../components/Fullpagebtn.js';
import Digitcard from '../components/Digitcard.js';
import Chartcard from '../components/Chartcard.js';
import Itemscard from '../components/Itemscard.js';
import Foot from '../components/Foot.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      collapsible:true,
      menukey:0
    }
  }

  setKey(a){
    this.setState({menukey:a.key})
  }

  getChartData(menukey,charturl,callback){
    var request='http://lianjia.yaommxs.cn/api/v1/chart/'+charturl+'?menukey='+menukey;
    axios.get(request)
    .then((res) => {
      //加判断状态条件
      callback(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  postItemsData(menukey,page,orderitem,orderby,callback){
    const request='http://lianjia.yaommxs.cn/api/v1/itemlist';
    axios.post(request,{menukey:menukey,p:page,orderitem:orderitem,orderby:orderby})
    .then((res) => {
      //加判断状态条件
      callback(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  postSearchData(menukey,word,callback){
    const request='http://lianjia.yaommxs.cn/api/v1/search';
    axios.post(request,{menukey:menukey,word:word})
    .then((res) => {
        //加判断状态条件
        callback(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    // 下面Head中绑定this因为setKey中要用this.setState
    // getChartData等没绑因为get请求拿到数据后
    return (
      <div>
        <Head setKey={this.setKey.bind(this)}></Head>
        <Fullpagebtn/>
        <Digitcard getChartData={this.getChartData} menukey={this.state.menukey}></Digitcard>
        <Chartcard getChartData={this.getChartData} menukey={this.state.menukey}></Chartcard>
        <Itemscard postItemsData={this.postItemsData} postSearchData={this.postSearchData} menukey={this.state.menukey}></Itemscard>
        <Foot ></Foot>
      </div>
    );
  }
}
export default App;
