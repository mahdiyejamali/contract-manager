import React, { Component } from 'react';
import moment from 'moment';

import SignaturePad from 'react-signature-pad';

import { errorHandler, parseResponse } from "../../helpers/fetchHelpers.js";
import PendingClientSignContract from './PendingClientSignContract';
import PendingFinalSignContract from './PendingFinalSignContract';

const YMD = 'YYYY-MM-DD';
const TODAY = moment().format(YMD);

const API_BASE_URL = 'http://localhost:3000';

const PENDING_CLIENT_SIGN = 'PENDING_CLIENT_SIGN';
const PENDING_FINAL_SIGN = 'PENDING_FINAL_SIGN';
const EXECUTED = 'EXECUTED';

const defaultPendingClientSignQuery = {
    entity_name: '',
    mailing_address: '',
    contact_name: '',
    contact_title: '',
    contact_phone: '',
    contact_email: '',
    billing_contact: '',
    billing_phone: '',
    billing_email: '',
    stage: '',
    signed_at: TODAY
}

const defaultPendingFinalSignQuery = {
    stage: '',
    executed_at: TODAY
}

class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: defaultPendingClientSignQuery,
            errors: {},
            min_date: null,
            max_date: null,
        }
    }

    componentDidMount() {
        this._fetchContract();
    }

    _fetchContract = () => {
        const { match: { params } } = this.props;
        return fetch(`${API_BASE_URL}/contracts/${params.id}`)
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState,
                        contract: response,
                        query: response.stage === PENDING_CLIENT_SIGN ? defaultPendingClientSignQuery : defaultPendingFinalSignQuery
                    }))
                },
                error => {
                    console.log('contract fetch error : ', error);
                    error.json().then(errorBody => {
                        console.log('contract fetch error : ', errorBody);
                    })
                }
            )
    }

    _onBackClick = () => {
        this.props.history.push('/');
    }

    // _onClearSignature = () => {
    //     let signature = this.refs.mySignature;
    //     signature.clear();
    // }

    // _onSign = () => {
    //     let signature = this.refs.mySignature;

    //     if (signature.isEmpty()) {
    //         return false;
    //     }

    //     this.setState(prevState => ({
    //         ...prevState,
    //         query: {
    //             ...prevState.query,
    //             client_signature_image_url: signature.toDataURL()
    //         }
    //     }));
    // }

    // _handleFocus(text) {
    //     console.log('Focused with text: ' + text);
    // }

    // _handleFocusOut(text, field) {
    //     if (text.trim() === '') {
    //         alert('test');
    //     }

    //     this.setState(prevState => ({
    //         ...prevState,
    //         query: {
    //             ...prevState.query,
    //             [field]: text.trim() === '' ? prevState.query[field] : text
    //         }
    //     }))
    // }

    _onInputChange = ({ target }) => {
        const { name, value } = target;
        this.setState(prevState => ({
            ...prevState,
            query: {
                ...prevState.query,
                [name]: value
            }
        }))
    }

    // _removeSignature = () => {
    //     this.setState(prevState => ({
    //         ...prevState,
    //         query: {
    //             ...prevState.query,
    //             client_signature_image_url: ''
    //         }
    //     }))
    // }

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

    _onSubmit = () => {
        //const errors = this._validateFields();

        //console.log(errors);

        // if (Object.keys(errors).length > 0) {
        //     return false;
        // }

        const { match: { params } } = this.props;
        const {contract} = this.state;

        // Prepare query
        const stage = contract.stage === PENDING_CLIENT_SIGN ? PENDING_FINAL_SIGN : EXECUTED
        const query = {
            ...this.state.contract,
            ...this.state.query,
            stage
        }
        delete query._id;
        delete query.createdAt;

        fetch(`${API_BASE_URL}/contracts/${params.id}`, {
            credentials: 'same-origin',
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this.props.history.push('/success')
                },
                error => {
                    console.log(error);
                    return error.json().then(errorBody => {
                        console.log('save contract error : ', errorBody);
                        alert(errorBody.message);
                    })
                }
            );
    }

    render() {
        const {
            query,
            contract,
            min_date,
            errors
        } = this.state;
        {
            if (contract && contract.stage === PENDING_CLIENT_SIGN) {
                return <PendingClientSignContract
                    query={query}
                    contract={contract}
                    min_date={min_date}
                    errors={errors}
                    handleDateChange={this._handleDateChange}
                    onInputChange={this._onInputChange}
                    onSubmit={this._onSubmit}
                />
            } else if (contract && contract.stage === PENDING_FINAL_SIGN) {
                return <PendingFinalSignContract
                    query={query}
                    contract={contract}
                    min_date={min_date}
                    errors={errors}
                    handleDateChange={this._handleDateChange}
                    onInputChange={this._onInputChange}
                    onSubmit={this._onSubmit}
                />
            } else {
                // Retun all text contract no edit
                return null;
            }
        }
    }
}

export default Contract;