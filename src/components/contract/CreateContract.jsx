import React, { Component } from 'react';
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

import SignaturePad from 'react-signature-pad';

import { errorHandler, parseResponse } from "../../helpers/fetchHelpers.js";
import defaultData from '../../constants/defaultData.js';

const API_BASE_URL = 'http://localhost:3000';
const REQUIRED_FIELDS = [
    'name', 'entity_name', 'mailing_address', 'primary_contact_name', 'primary_contact_title',
    'primary_contact_phone', 'primary_contact_email', 'billing_contact', 'billing_phone',
    'billing_email', 'services', 'valuation_period', 'total_fee'
]

class CreateContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {
                name: 'aaa', entity_name: 'aaa', mailing_address: 'aaa', primary_contact_name: 'aaa', primary_contact_title: 'aaa',
                primary_contact_phone: 'aaa', primary_contact_email: 'aaa', billing_contact: 'aaa', billing_phone: 'aaa',
                billing_email: 'aaa', services: 'aaa', valuation_period: 'aaa', total_fee: 'aaa'
            },
            errors: {}
        }
    }

    _onBackClick = () => {
        this.props.history.push('/');
    }

    _validateFields = () => {
        let query = this.state.query;
        let errors = {};
        Object.keys(query).forEach(key => {
            query[key] = query[key].trim();

            if (!query[key]) {
                errors[key] = 'This field is required';
            }
        });

        this.setState({
            query,
            errors
        });

        return errors;
    };

    _onSave = () => {
        const errors = this._validateFields();

        if (Object.keys(errors).length > 0) {
            return false;
        }

        const query = {
            ...this.state.query,
            owner_id: defaultData.user._id,
            client_id: defaultData.client._id,
            reviewer_id: defaultData.user._id,
            executor_id: defaultData.user._id
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

    render() {
        const { query, errors } = this.state;
        return (
            <div>
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
                                        </Row>
                                        <Row>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Entity Name" />
                                                    <TextInput
                                                        placeholder="Entity Name"
                                                        name="entity_name"
                                                        defaultValue={query.entity_name}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.entity_name &&
                                                        <FormGroupTextHelp text={errors.entity_name} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Mailing Address" />
                                                    <TextInput
                                                        placeholder="Mailing Address"
                                                        name="mailing_address"
                                                        defaultValue={query.mailing_address}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.mailing_address &&
                                                        <FormGroupTextHelp text={errors.mailing_address} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Primary Contact Name" />
                                                    <TextInput
                                                        placeholder="Primary Contact Name"
                                                        name="primary_contact_name"
                                                        defaultValue={query.primary_contact_name}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.primary_contact_name &&
                                                        <FormGroupTextHelp text={errors.primary_contact_name} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Primary Contact Title" />
                                                    <TextInput
                                                        placeholder="Primary Contact Title"
                                                        name="primary_contact_title"
                                                        defaultValue={query.primary_contact_title}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.primary_contact_title &&
                                                        <FormGroupTextHelp text={errors.primary_contact_title} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Primary Contact Phone" />
                                                    <TextInput
                                                        placeholder="Primary Contact Phone"
                                                        name="primary_contact_phone"
                                                        defaultValue={query.primary_contact_phone}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.primary_contact_phone &&
                                                        <FormGroupTextHelp text={errors.primary_contact_phone} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Primary Contact Email" />
                                                    <TextInput
                                                        placeholder="Primary Contact Email"
                                                        name="primary_contact_email"
                                                        defaultValue={query.primary_contact_email}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.primary_contact_email &&
                                                        <FormGroupTextHelp text={errors.primary_contact_email} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Billing Contact" />
                                                    <TextInput
                                                        placeholder="Billing Contact"
                                                        name="billing_contact"
                                                        defaultValue={query.billing_contact}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.billing_contact &&
                                                        <FormGroupTextHelp text={errors.billing_contact} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Billing Phone" />
                                                    <TextInput
                                                        placeholder="Billing Phone"
                                                        name="billing_phone"
                                                        defaultValue={query.billing_phone}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.billing_phone &&
                                                        <FormGroupTextHelp text={errors.billing_phone} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Billing Email" />
                                                    <TextInput
                                                        placeholder="Billing Email"
                                                        name="billing_email"
                                                        defaultValue={query.billing_email}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.billing_email &&
                                                        <FormGroupTextHelp text={errors.billing_email} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="The Services" />
                                                    <TextInput
                                                        placeholder="The Services"
                                                        name="services"
                                                        defaultValue={query.services}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.services &&
                                                        <FormGroupTextHelp text={errors.services} />
                                                    }
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="6">
                                                <FormGroup>
                                                    <FormGroupLabel text="Valuation Period" />
                                                    <TextInput
                                                        placeholder="Valuation Period"
                                                        name="valuation_period"
                                                        defaultValue={query.valuation_period}
                                                        onChange={this._onInputChange}
                                                    />
                                                    {errors && errors.valuation_period &&
                                                        <FormGroupTextHelp text={errors.valuation_period} />
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
                                            <Column md="3" style={{ marginTop: '0.8em' }}>
                                                <ButtonGroup>
                                                    <Button
                                                        group
                                                        size="md"
                                                        context="primary"
                                                        onClick={this._onSave}
                                                    >
                                                        <i className="fa fa-check -m-r-2" />
                                                        Create
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