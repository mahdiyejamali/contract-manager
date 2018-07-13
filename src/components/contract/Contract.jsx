import React, { Component } from 'react';
import moment from 'moment';
import Popup from 'react-popup';

import { errorHandler, parseResponse } from "../../helpers/fetchHelpers.js";
import PendingClientSignContract from './PendingClientSignContract';
import InReviewContract from './InReviewContract';
import PendingFinalSignContract from './PendingFinalSignContract';
import ExecutedContract from './ExecutedContract';
import '../../constants/popup.css';

import {NotificationContainer} from 'react-notifications';
import createNotification from '../common/Notification.jsx';
import 'react-notifications/lib/notifications.css';

const YMD = 'YYYY-MM-DD';
const TODAY = moment().format(YMD);

const API_BASE_URL = 'http://localhost:3000';

const PENDING_CLIENT_SIGN = 'PENDING_CLIENT_SIGN';
const IN_REVIEW = 'IN_REVIEW';
const PENDING_FINAL_SIGN = 'PENDING_FINAL_SIGN';
const EXECUTED = 'EXECUTED';

const onEnterParagraphStyle = "background-color:#FCF3CF;cursor:pointer";
const onLeaveParagraphStyle = "";

const defaultPendingClientSignQuery = {
    entity_name: 'Sports Contract',
    mailing_address: '12454 Santa Monica',
    contact_name: 'Allen Jones',
    contact_title: 'Contract Manager',
    contact_phone: '(323)123-1011',
    contact_email: 'cotact@gmail.com',
    billing_contact: 'Jane Zhang',
    billing_phone: '(323)123-1011',
    billing_email: 'billing@gmail.com',
    client_printed_name: 'ALLEN JONES',
    client_title: 'Contract Manager',
    stage: '',
    signed_by: 'Allen Jones',
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
            query: {},
            errors: {},
            min_date: null,
            max_date: null,
            notes: [],
            contractId: null,
            fetchedNotes : []
        }
    }

    componentDidMount() {
        this._fetchContract();

        const { match: { params } } = this.props;
        this.setState({contractId: params.id});
    }

    _fetchContract = () => {
        const { match: { params } } = this.props;
        return fetch(`${API_BASE_URL}/contracts/${params.id}`)
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this.setState(prevState => {
                        let query = {};

                        if (response.stage === PENDING_CLIENT_SIGN) {
                            query = defaultPendingClientSignQuery;
                        } else if (response.stage === PENDING_FINAL_SIGN) {
                            query = defaultPendingFinalSignQuery;
                        }

                        return {
                            ...prevState,
                            contract: response,
                            query
                        }
                    }, () => this._fetchNotes())
                },
                error => {
                    console.log('contract fetch error : ', error);
                    error.json().then(errorBody => {
                        console.log('contract fetch error : ', errorBody);
                    })
                }
            )
    }

    _fetchNotes = () => {
        return fetch(`${API_BASE_URL}/notes`)
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    this.setState(prevState => ({
                        ...prevState,
                        fetchedNotes: response.filter(note => note.contractId === prevState.contractId)
                    }), () => {
                        if (this.state.contract && this.state.contract.stage === IN_REVIEW) {
                            this.state.fetchedNotes.forEach(note => {
                                let target = document.getElementsByName(note.sectionId)[0];
                                if (target) {
                                    target.setAttribute('style', onEnterParagraphStyle)
                                }
                            })
                        }
                        
                    })
                },
                error => {
                    console.log('notes fetch error : ', error);
                    error.json().then(errorBody => {
                        console.log('notes fetch error : ', errorBody);
                    })
                }
            )
    }

    _onBackClick = () => {
        this.props.history.push('/');
    }

    _openSuccessPage = () => {
        this.props.history.push('/success');
    }

    _openReviewSuccessPage = () => {
        this.props.history.push('/review-success');
    }

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

    _updateContractStage = (stage) => {
        const query = {
            ...this.state.contract,
            stage
        }
        delete query._id;
        delete query.createdAt;

        fetch(`${API_BASE_URL}/contracts/${this.state.contractId}`, {
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
                    if (stage === IN_REVIEW) {
                        this._openReviewSuccessPage();
                    } else {
                        this._onBackClick();
                    }
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

    _updateContractToInReview = () => {
        this._updateContractStage(IN_REVIEW);
    }

    _updateContractToClientSign = () => {
        this._updateContractStage(PENDING_CLIENT_SIGN);
    }

    _onSubmit = () => {
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
                    if (stage === PENDING_FINAL_SIGN) {
                        this._openSuccessPage();
                    } else if (stage === EXECUTED) {
                        this._onBackClick()
                    }
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

    _onReview = () => {
        let {contract, contractId, notes} = this.state;

        notes = notes.filter(note => note.note && note.note.trim());

        if (notes.length === 0) {
            // show a notif to add notes
            createNotification('warning', 'Please add at least one note to request review.');
        }

        // Prepare query
        const stage = contract.stage === PENDING_CLIENT_SIGN ? PENDING_FINAL_SIGN : EXECUTED
        const query = notes
        delete query._id;
        delete query.createdAt;

        fetch(`${API_BASE_URL}/notes`, {
            credentials: 'same-origin',
            method: 'POST',
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
                    // update contract stage to IN_REVIEW
                    this._updateContractToInReview();
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

    _onParagraphMouseEnterReview = ({target}) => {
        
    }

    _onParagraphMouseEnter = ({target}) => {
        target.setAttribute('style', onEnterParagraphStyle)
    }

    _onParagraphMouseLeave = ({target}) => {
        target.setAttribute('style', onLeaveParagraphStyle)
    }

    _saveNote = (sectionId, note) => {
        if (!note) {
            return false;
        }

        const {contractId} = this.state;
        let notes = this.state.notes.filter(note => note.sectionId !== sectionId);

        this.setState(prevState => ({
            ...prevState,
            notes: notes.concat({contractId, sectionId, note})
        }), createNotification('success', 'Note Added Successfully.'))
    }

    _onParagraphClick = ({target}) => {
        const sectionId = target.getAttribute('name');
        const note = this.state.notes.find(note => note.sectionId === sectionId);

        /** Call the plugin */
        Popup.plugins().prompt(note ? note.note : '', '', value => this._saveNote(sectionId, value));
    }

    _onParagraphClickReview = ({ target }) => {
        const sectionId = target.getAttribute('name');
        const note = this.state.fetchedNotes.find(note => note.sectionId === sectionId);

        /** Call the plugin */
        if (note && note.note) {
            Popup.alert('Review Note: ' + note.note);
        }
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
                return <div><NotificationContainer /><PendingClientSignContract
                    query={query}
                    contract={contract}
                    min_date={min_date}
                    errors={errors}
                    handleDateChange={this._handleDateChange}
                    onInputChange={this._onInputChange}
                    onParagraphMouseEnter={this._onParagraphMouseEnter}
                    onParagraphMouseLeave={this._onParagraphMouseLeave}
                    onParagraphClick={this._onParagraphClick}
                    onSubmit={this._onSubmit}
                    onReview={this._onReview}
                /><Popup /></div>
            } else if (contract && contract.stage === IN_REVIEW) {
                return <div><InReviewContract
                    query={query}
                    contract={contract}
                    min_date={min_date}
                    errors={errors}
                    handleDateChange={this._handleDateChange}
                    onInputChange={this._onInputChange}
                    onParagraphMouseEnter={this._onParagraphMouseEnterReview}
                    onParagraphMouseLeave={this._onParagraphMouseLeave}
                    onParagraphClick={this._onParagraphClickReview}
                    onApprove={this._updateContractToClientSign}
                    onBackClick={this._onBackClick}
                /><Popup /></div>
            } else if (contract && contract.stage === PENDING_FINAL_SIGN) {
                return <PendingFinalSignContract
                    query={query}
                    contract={contract}
                    min_date={min_date}
                    errors={errors}
                    handleDateChange={this._handleDateChange}
                    onInputChange={this._onInputChange}
                    onSubmit={this._onSubmit}
                    onBackClick={this._onBackClick}
                />
            } else {
                return <ExecutedContract 
                    query={query}
                    contract={contract}
                    onBackClick={this._onBackClick}
                />
            }
        }
    }
}

// POPUP //
/** Prompt plugin */
/** The prompt content component */
class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.onChange = (e) => this._onChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state.value);
        }
    }

    _onChange(e) {
        let value = e.target.value;
        this.setState({ value });
    }

    render() {
        return <textarea 
            type="text" 
            placeholder={this.props.placeholder} 
            className="mm-popup__input" 
            defaultValue={this.props.value}
            onChange={this.onChange}
        />
    }
}

/** Prompt plugin */
Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null;
    let promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: 'Add Review Notes',
        content: <Prompt onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
        buttons: {
            left: ['cancel'],
            right: [{
                text: 'Save',
                key: '⌘+s',
                className: 'success',
                action: function () {
                    callback(promptValue);
                    Popup.close();
                }
            }]
        }
    });
});

export default Contract;