import React, { Component } from 'react';

class ReviewSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <img src={require('../../constants/review.png')} style={{width: '100%', height: '100%'}}/>
            </div>
        );
    }
}

export default ReviewSubmit;
