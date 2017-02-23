import React, {Component} from 'react';
import { Button} from 'antd';

class Fullpagebtn extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      icon:'arrows-alt'
    }
  }

  fullPageSwitch(){
    const icon=this.state.icon=='arrows-alt'?'shrink':'arrows-alt';
    this.setState({
      icon:icon
    })
  }

  render() {
    return (
      <div>
        <Button icon={this.state.icon}  className='fullscreenbtn' onClick={this.fullPageSwitch.bind(this)}/>
      </div>
    );
  }
}

export default Fullpagebtn;
