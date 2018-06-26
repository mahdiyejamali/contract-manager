import React, { Component } from 'react';
import Button from 'gumdrops/Button';

import { errorHandler, parseResponse } from "../../helpers/fetchHelpers.js";

const API_BASE_URL = 'http://localhost:3000';

class ContractManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: []
        }
    }

    componentDidMount() {
        this._fetchContracts();
    }

    _fetchContracts = () => {
        return fetch(`${API_BASE_URL}/contracts`)
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this.setState({
                        contracts: response
                    })
                },
                error => error.json().then(errorBody => {

                })
            )
    }

    _onCreateClick = () => {
        this.props.history.push('/create');
    }

    render() {
        return (
            <div>
                <Button
                    onClick={this._onCreateClick}
                    context="primary"
                >
                    <i className="fa fa-check -m-r-2" />
                    Create New Contract
                </Button>   
            </div>
        );
    }
}

export default ContractManager;