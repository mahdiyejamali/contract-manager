import React, { Component } from 'react';

const API_BASE_URL = 'http://localhost:3000';

class SuccessSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <img src={require('../../constants/success.png')} style={{width: '100%', height: '100%'}}/>
            </div>
        );
    }
}

export default SuccessSubmit;
