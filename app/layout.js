import React, {Component} from 'react';

import Head from '../components/Head.js';
import Digitcard from '../components/Digitcard.js';
import Chartcard from '../components/Chartcard.js';
import Datacard from '../components/Datacard.js';
import Foot from '../components/Foot.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      collapsible:true
    }
  }

  render() {
    return (

      <div>
        <Head></Head>
        <Digitcard>

        </Digitcard>
        <Chartcard >

        </Chartcard>
        <Datacard >

        </Datacard>
        <Foot >

        </Foot>


      </div>
    );
  }
}
export default App;
