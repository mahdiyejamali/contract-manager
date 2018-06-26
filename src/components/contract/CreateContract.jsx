import React, { Component } from 'react';
import Button from 'gumdrops/Button';
import Modal from 'gumdrops/Modal';

import { errorHandler, parseResponse } from "../../helpers/fetchHelpers.js";

const API_BASE_URL = 'http://localhost:3000';

class CreateContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: []
        }
    }

    _onBackClick = () => {
        this.props.history.push('/');
    }

    _onSave = () => {

    }

    render() {
        return (
            <Button
                onClick={this._onBackClick}
                context="primary"
            >
                <i className="fa fa-check -m-r-2" />
                Home
            </Button>
        );
    }
}

export default CreateContract;