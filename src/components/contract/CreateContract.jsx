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
import TextArea from 'gumdrops/TextArea';

import SignaturePad from 'react-signature-pad';

import { errorHandler, parseResponse } from "../../helpers/fetchHelpers.js";

const API_BASE_URL = 'http://localhost:3000';

class CreateContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {}
        }
    }

    _onBackClick = () => {
        this.props.history.push('/');
    }

    _onSave = () => {
        fetch(`${API_BASE_URL}/contracts`, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.query)
        })
            .then(errorHandler)
            .then(parseResponse)
            .then(
                response => {
                    console.log(response);
                    this._onBackClick();
                },
                error => error.json().then(errorBody => {
                    console.log(errorBody);
                })
            );
    }

    _onInputChange = ({target}) => {
        const { name, value } = target;
        this.setState(prevState => ({
            query: {
                ...prevState.query,
                [name]: value
            }
        }))
    }

    render() {
        const { query } = this.state;
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
                                                    <FormGroupLabel text="Title" />
                                                    <TextInput
                                                        placeholder="Title"
                                                        name="title"
                                                        defaultValue={query.title}
                                                        onChange={this._onInputChange}
                                                    />
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column md="12">
                                                <FormGroup>
                                                    <FormGroupLabel text="Content" />
                                                    <TextArea
                                                        placeholder="Content"
                                                        name="content"
                                                        defaultValue={query.content}
                                                        onChange={this._onInputChange}
                                                    />
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