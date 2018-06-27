import React, { Component } from 'react';

import Button from 'gumdrops/Button';
import LayoutContainer from 'gumdrops/LayoutContainer';
import Row from 'gumdrops/Row';
import Column from 'gumdrops/Column';
import Card from 'gumdrops/Card';
import CardBlock from 'gumdrops/CardBlock';

import { errorHandler, parseResponse } from "../../helpers/fetchHelpers.js";
import EntriesList from '../common/EntriesList'
import SearchForm from './SearchForm'

const API_BASE_URL = 'http://localhost:3000';
const COLUMNS = [
    { name: 'id', label: 'ID' },
    { name: 'title', label: 'Title' },
    { name: 'created_at', label: 'Created At' }
]

class ContractManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: [],
            stages: []
        }
    }

    componentDidMount() {
        this._fetchContracts();
        this._fetchStages();
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

    _fetchStages = () => {
        return fetch(`${API_BASE_URL}/stages`)
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this.setState({
                        stages: response
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
        const {
            contracts
        } = this.state;

        return (
            <div>
                <LayoutContainer>
                    <Row>
                        <Column>
                            <div className="gds-flex gds-flex--justify-between">
                                <Button size="sm" context="success" onClick={this._onCreateClick}>
                                    <i className="fa fa-check -m-r-2" />
                                    Create New Contract
                                </Button>
                            </div>
                            <Card>
                                <CardBlock>
                                    <SearchForm />
                                </CardBlock>
                                <CardBlock>
                                    {contracts && contracts.length > 0 &&
                                        <EntriesList
                                            entries={contracts}
                                            columns={COLUMNS}
                                        />
                                    }
                                </CardBlock>
                            </Card>
                        </Column>
                    </Row>
                </LayoutContainer>
            </div>   
        );
    }
}

export default ContractManager;
