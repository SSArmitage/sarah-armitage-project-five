import React, {Component} from 'react';
import animalNames from './animalNames.js'

class Aside extends Component {
    constructor() {
        super();
        this.state = {
            userName: ""
        }
    }

    componentDidMount() {
        console.log(`Aside mounted`);
        console.log(animalNames);
        
    }
   componentDidUpdate() {
       console.log(`I am updating`);
       
   }

    render() {        
        return (
            <div className="aside">
                <div className="top"></div>
                <div className="main">
                <h2>{this.props.passUser}</h2>
                    <div className="onlineUsers">
                        <h3>Who's online</h3>
                    </div>
                </div>
                <div className="bottom"></div>
            </div>
        )
    }
}

export default Aside;

