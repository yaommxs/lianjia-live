import React, {Component} from 'react';
import { BackTop,Affix } from 'antd';
import axios from 'axios';

import Head from '../components/Head.js';
import Digitcard from '../components/Digitcard.js';
import Chartcard from '../components/Chartcard.js';
import Itemscard from '../components/Itemscard.js';
import Foot from '../components/Foot.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      collapsible:true
    }
  }

  getChartData(charturl,callback){
    var request='http://localhost:3000/api/v1/chart/'+charturl;
    axios.get(request)
    .then((res) => {
      //加判断状态条件
      callback(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  postItemsData(page,orderitem,orderby,callback){
    const request='http://localhost:3000/api/v1/itemlist';
    axios.post(request,{p:page,orderitem:orderitem,orderby:orderby})
    .then((res) => {
      //加判断状态条件
      callback(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  postSearchData(word,callback){
    const request='http://localhost:3000/api/v1/search';
    axios.post(request,{word:word})
    .then((res) => {
        //加判断状态条件
        callback(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (

      <div>

          <Head></Head>

        <Digitcard getChartData={this.getChartData}>

        </Digitcard>
        <Chartcard getChartData={this.getChartData}>

        </Chartcard>
        <Itemscard postItemsData={this.postItemsData} postSearchData={this.postSearchData}>

        </Itemscard>
        <Foot >

        </Foot>
        <BackTop />
      </div>
    );
  }
}
export default App;
