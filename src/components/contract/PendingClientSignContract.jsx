import React from 'react';
import moment from 'moment';
import Button from 'gumdrops/Button';
import LayoutContainer from 'gumdrops/LayoutContainer';
import Row from 'gumdrops/Row';
import Column from 'gumdrops/Column';
import Card from 'gumdrops/Card';
import CardBlock from 'gumdrops/CardBlock';
import FormGroupTextHelp from 'gumdrops/FormGroupTextHelp';
import TextInput from 'gumdrops/TextInput';

import DateInput from '../common/DateInput.jsx';

const FONT_FAMILY = '-webkit-pictograph';
const SIGN_FONT_FAMILY = 'Quintessential';
const YMD = 'YYYY-MM-DD';

const tableThStyle={ height: '', width: '20%' };
const tableTdStyle = { width: '80%'};
const textInputStyle = { backgroundColor: 'aliceblue' };
const staticTextStyle = { backgroundColor: '#EAECEE', padding: '6px', borderRadius: '3px' }

const PendingClientSignContract = ({
    query, 
    contract, 
    min_date, 
    errors,
    handleDateChange,
    onInputChange,
    onSubmit
}) => {
    const { signed_at, signed_by } = query;
    return (
        <div className="-p-t-3">
            <LayoutContainer>
                <Row>
                    <Column>
                        <Card>
                            <CardBlock>
                                <div className="-m-a-5" style={{ fontFamily: FONT_FAMILY, textAlign: 'left' }}>
                                    <Row>
                                        <Column md="12">
                                            <h1>
                                                <center style={{ fontWeight: 'bold' }}>GUMGUM, INC. <br /></center>
                                                <center style={{ fontWeight: 'bold' }}>MEDIA VALUATION SERVICES AGREEMENT </center>
                                            </h1><br />

                                            <p>
                                                This Media Valuation Services Agreement (the “Agreement”) is entered into by and between GumGum, Inc.
                                                (“GumGum Sports”) with offices located at 1314 7 th Street, 4 th Floor, Santa Monica, California 90401 and the
                                                Client identified below.
                                                </p>

                                            <table style={{ width: '100%', paddingTop: '20px' }}>
                                                <tbody>
                                                    <tr>
                                                        <th style={tableThStyle}>Full Legal Entity Name:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Full Legal Entity Name"
                                                                name="entity_name"
                                                                defaultValue={query.entity_name}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Mailing Address:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Mailing Address"
                                                                name="mailing_address"
                                                                defaultValue={query.mailing_address}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Primary Contact Name:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Primary Contact Name"
                                                                name="contact_name"
                                                                defaultValue={query.contact_name}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Primary Contact Title:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Primary Contact Title"
                                                                name="contact_title"
                                                                defaultValue={query.contact_title}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Primary Contact Phone:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Primary Contact Phone"
                                                                name="contact_phone"
                                                                defaultValue={query.contact_phone}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Primary Contact Email:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Primary Contact Email"
                                                                name="contact_email"
                                                                defaultValue={query.contact_email}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Billing Contact:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Billing Contact"
                                                                name="billing_contact"
                                                                defaultValue={query.billing_contact}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Billing Phone:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Billing Phone"
                                                                name="billing_phone"
                                                                defaultValue={query.billing_phone}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Billing Email:</th>
                                                        <td style={tableTdStyle}>
                                                            <TextInput
                                                                placeholder="Billing Email"
                                                                name="billing_email"
                                                                defaultValue={query.billing_email}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>The services:</th>
                                                        <td style={tableTdStyle}>
                                                            All Services shall be performed in accordance with Exhibit B attached hereto.
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Valuation Period:</th>
                                                        <td style={tableTdStyle}>
                                                            Measured Exposure collection and analysis shall commence on <b style={staticTextStyle}>{contract && contract.start_date}</b> and
                                                                will continue through <b style={staticTextStyle}>{contract && contract.end_date}</b>.
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Fee:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>${contract && contract.total_fee}</b> - The Fee shall be invoiced in full upon execution of the Agreement.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Column>
                                    </Row>
                                    <Row className="-m-b-3 -p-t-3">
                                        <Column md="12">
                                            <p>
                                                This Agreement, including any applicable Exhibits, contains all terms and conditions which govern our contractual
                                                relationship. By signing below both parties are acknowledging that they have each read and hereby accept the
                                                terms stated herein, and that each party is duly authorized to bind its company to this Agreement.
                                                    <br />
                                                ACCEPTED AND AGREED:
                                                </p>
                                            <table style={{ width: '50%' }} className="-p-t-1 -p-b-1">
                                                <tbody>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>By:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <TextInput
                                                                placeholder=""
                                                                name="signed_by"
                                                                defaultValue={query.signed_by}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>Printed Name:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <TextInput
                                                                placeholder=""
                                                                name="client_printed_name"
                                                                defaultValue={query.client_printed_name}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>Title:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <TextInput
                                                                placeholder=""
                                                                name="client_title"
                                                                defaultValue={query.client_title}
                                                                onChange={onInputChange}
                                                                size="sm"
                                                                style={textInputStyle}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>Date:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <DateInput
                                                                selected={signed_at && moment(signed_at, YMD)}
                                                                onChange={(date) => handleDateChange(date, 'signed_at')}
                                                                minDate={min_date}
                                                                size="sm"
                                                                isClearable={false}
                                                            />
                                                            {errors && errors.signed_at &&
                                                                <FormGroupTextHelp text={errors.signed_at} />
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>Signature:</th>
                                                        <td style={{ width: '40%', border: 'solid 1px', fontFamily: SIGN_FONT_FAMILY, textAlign: 'center' }}>
                                                            <span>{signed_by}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Column>
                                    </Row>
                                    <Row className="-m-t-3">
                                        <Column md="2" style={{ float: 'right' }}>
                                            <Button
                                                group
                                                size="sm"
                                                context="success"
                                                onClick={onSubmit}
                                                style={{ float: 'right' }}
                                            >
                                                Submit
                                            </Button>
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

export default PendingClientSignContract;