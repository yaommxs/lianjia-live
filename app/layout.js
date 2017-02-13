import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider} = Layout;
import '../css/layout.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      collapsible:true
    }
  }

  onCollapse(collapsed) {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {

    return (

      <div>
        <Header style={{ background: '#fff', padding: 0 }} >链家——成都地区二手房爬虫数据实时排行</Header>
        <Layout>
          <Sider
            width={240}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse.bind(this)}>
            <Menu  mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <span className="nav-text"><i className='area'>锦江</i><span>共<i className='house_count'>2323</i>条房源信息</span></span>
              </Menu.Item>
              <Menu.Item key="2">
                <span className="nav-text"><i className='area'>锦江</i><span>共<i className='house_count'>2323</i>条房源信息</span></span>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout>

            <Content>

              <div style={{ padding: 24, background: '#ccc', minHeight: 360 }}>
                content
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))
