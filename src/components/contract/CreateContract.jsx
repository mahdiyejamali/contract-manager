import React, { Component } from 'react';
import moment from 'moment';
import Button from 'gumdrops/Button';
import LayoutContainer from 'gumdrops/LayoutContainer';
import Row from 'gumdrops/Row';
import Column from 'gumdrops/Column';
import Card from 'gumdrops/Card';
import CardBlock from 'gumdrops/CardBlock';
import ButtonGroup from 'gumdrops/ButtonGroup';
import FormGroup from 'gumdrops/FormGroup';
import FormGroupLabel from 'gumdrops/FormGroupLabel';
import TextInput from 'gumdrops/TextInput';
import FormGroupTextHelp from 'gumdrops/FormGroupTextHelp';
import Select from 'gumdrops/Select';
import DateInput from '../common/DateInput.jsx';

import { errorHandler, parseResponse } from "../../helpers/fetchHelpers.js";
import data from '../../constants/data.js';

const API_BASE_URL = 'http://localhost:3000';
const REQUIRED_FIELDS = [
    'name', 'start_date', 'end_date', 'total_fee'
]
const YMD = 'YYYY-MM-DD';
const TODAY = moment().format(YMD);
const NEXT_MONTH_TODAY = moment().add(1, 'months').format(YMD);

class CreateContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {
                name: '', 
                start_date: '', 
                end_date: '', 
                total_fee: '',
                start_date: TODAY,
                end_date: NEXT_MONTH_TODAY
            },
            users: data.users,
            clients: data.clients,
            contract_types: data.contract_types,
            errors: {},
            min_date: null,
            max_date: null,
        }
    }

    _onBackClick = () => {
        this.props.history.push('/');
    }

    _validateFields = () => {
        let query = this.state.query;
        let errors = {};
        Object.keys(query).forEach(key => {
            if (!query[key] || !query[key].trim()) {
                errors[key] = 'This field is required';
            }
        });

        if (parseInt(query.total_fee) <= 0) {
            errors.total_fee = 'Total fee can not be less than or equal to zero.'
        }

        this.setState({
            query,
            errors
        });

        return errors;
    };

    _onSave = () => {
        const errors = this._validateFields();

        console.log(errors);

        if (Object.keys(errors).length > 0) {
            return false;
        }

        const query = {
            ...this.state.query,
            owner_id: '1',
            client_id: '11',
            executor_id: '1'
        }
        fetch(`${API_BASE_URL}/contracts`, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        })
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this._onBackClick();
                },
                error => error.json().then(errorBody => {
                    console.log('save contract error : ', errorBody);
                    alert(errorBody.message);
                })
            );
    }

    _onInputChange = ({target}) => {
        const { name, value } = target;
        this.setState(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                [name]: value
            }
        }))
    }

    _handleDateChange = (date, field) => {
        this.setState(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                [field]: date ? date.format(YMD) : null
            },
            errors: {
                [field]: ''
            }
        }));
    };

    _onTypeChange = () => {

    }

    render() {
        const { users, clients, contract_types, query, errors, query: { start_date, end_date }, min_date, max_date } = this.state;
        return (
            <div className="-p-t-3">
                <LayoutContainer>
                    <Row>
                        <Column>
                            <div className="gds-flex gds-flex--justify-between">
                                <Button size="sm" context="success" onClick={this._onBackClick}>
                                    Home
                                </Button>
                            </div>
                            <Card>
                                <CardBlock>
                                    <div className="-m-b-3">
                                        <Row>
                                            <Column md="12">
                                                <FormGroup>
                                                    <FormGroupLabel text="Contract Type" />
                                                    <Select
                                                        placeholder="Type Of Contract"
                                                        name="type"
                                                        options={contract_types}
                                                        onChange={this._onTypeChange}
                                                    />
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Contract Name" />
                                                    <TextInput
                                                        placeholder="Contract Name"
                                                        name="name"
                                                        defaultValue={query.name}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.name &&
                                                        <FormGroupTextHelp text={errors.name} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Total Fee" />
                                                    <TextInput
                                                        placeholder="Total Fee"
                                                        name="total_fee"
                                                        defaultValue={query.total_fee}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.total_fee &&
                                                        <FormGroupTextHelp text={errors.total_fee} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Client" />
                                                    <Select
                                                        placeholder="Client"
                                                        name="client_id"
                                                        options={clients}
                                                        onChange={this._onInputChange}
                                                    />
                                                </FormGroup>
                                            </Column>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Executor" />
                                                    <Select
                                                        placeholder="Executor"
                                                        name="executor_id"
                                                        options={users}
                                                        onChange={this._onInputChange}
                                                    />
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="3">
                                                <FormGroup>
                                                    <DateInput
                                                        title="Start Date"
                                                        selected={start_date && moment(start_date, YMD)}
                                                        onChange={(date) => this._handleDateChange(date, 'start_date')}
                                                        minDate={min_date}
                                                        isClearable={false}
                                                    />
                                                    {errors && errors.start_date &&
                                                        <FormGroupTextHelp text={errors.start_date} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                            <Column md="3">
                                                <FormGroup>
                                                    <DateInput
                                                        title="End Date"
                                                        selected={end_date && moment(end_date, YMD)}
                                                        onChange={(date) => this._handleDateChange(date, 'end_date')}
                                                        minDate={min_date}
                                                        isClearable={false}
                                                    />
                                                    {errors && errors.end_date &&
                                                        <FormGroupTextHelp text={errors.end_date} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                            <Column md="6" style={{ marginTop: '1.9em' }}>
                                                <ButtonGroup>
                                                    <Button
                                                        group
                                                        size="md"
                                                        context="primary"
                                                        onClick={this._onSave}
                                                    >
                                                        <i className="fa fa-check -m-r-2" />
                                                        Create and Submit
                                                    </Button>
                                                </ButtonGroup>
                                            </Column>
                                        </Row>
                                    </div>
                                </CardBlock>
                            </Card>
                        </Column>
                    </Row>
                </LayoutContainer>
            </div>   
        );
    }
}

export default CreateContract;