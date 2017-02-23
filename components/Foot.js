import React, {Component} from 'react';
import WeChat from '../img/WeChat.jpg';
class Foot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='footcard'>
        <div className='wraper foot-wraper'>
          <div className='foot-left'>
            <h4>Created by <a href="https://github.com/yaommxs/lianjia-live">yaommxs</a></h4>
        		<h4>免责声明：以上数据仅供参考，若对您造成了损失，非常抱歉，本网站不承担任何责任</h4>
        		<h4>反馈及合作欢迎邮件yaommxs@163.com，也可扫描右侧的二维码加我微信，共同交流，共同进步</h4>
          </div>
          <img src={WeChat} alt="微信" title='微信' className='wechat'/>
      	</div>
      </div>
    );
  }
}
export default Foot;
