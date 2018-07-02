import React, { Component } from 'react';
import qs from "qs";

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
    { name: 'stage', label: 'Stage' },
    { name: 'name', label: 'Name' },
    { name: 'content', label: 'Content' },
    { name: 'createdAt', label: 'Created At' }
]

class ContractManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: {
                name: ''
            },
            contracts: [],
            stages: []
        }
    }

    componentDidMount() {
        this._fetchContracts();
        this._fetchStages();
    }

    _fetchContracts = () => {
        return fetch(`${API_BASE_URL}/contracts?${qs.stringify(this.state.searchQuery)}`)
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState,
                        contracts: response
                    }))
                },
            error => {
                console.log('contracts fetch error : ', error);
                error.json().then(errorBody => {

                })}
            )
    }

    _fetchStages = () => {
        return fetch(`${API_BASE_URL}/stages`)
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState,
                        stages: response
                    }))
                },
                error => {
                    console.log('stages fetch error : ', error);
                    error.json().then(errorBody => {
                })}
            )
    }

    _onInputChange = ({ target }) => {
        const { name, value } = target;
        this.setState(prevState => ({
            ...prevState,
            searchQuery: {
                ...prevState.searchQuery,
                [name]: value
            }
        }))
    }

    _onCreateClick = () => {
        this.props.history.push('/create');
    }

    render() {
        const {
            contracts,
            searchQuery
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
                                    <SearchForm
                                        formData={searchQuery}
                                        onChange={this._onInputChange}
                                        onSearch={this._fetchContracts}
                                    />
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
