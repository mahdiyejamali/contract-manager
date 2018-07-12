import React from 'react';
import moment from 'moment';
import Button from 'gumdrops/Button';
import LayoutContainer from 'gumdrops/LayoutContainer';
import Row from 'gumdrops/Row';
import Column from 'gumdrops/Column';
import Card from 'gumdrops/Card';
import CardBlock from 'gumdrops/CardBlock';

const FONT_FAMILY = '-webkit-pictograph';
const SIGN_FONT_FAMILY = 'cursive';
const YMD = 'YYYY-MM-DD';

const tableThStyle={ height: '', width: '20%', fontWeight: 'bold' };
const tableTdStyle = { width: '80%'};
const staticTextStyle = {backgroundColor: '#EAECEE',padding: '6px',borderRadius: '3px'}

const ExecutedContract = ({
    query,
    contract,
    onBackClick
}) => {

    return (
        <div className="-p-t-3">
            <LayoutContainer>
                <Row>
                    <Column>
                        <div className="gds-flex gds-flex--justify-between">
                            <Button size="sm" context="success" onClick={onBackClick}>
                                Home
                            </Button>
                        </div>
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
                                                            <b style={staticTextStyle}>{contract && contract.entity_name}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Mailing Address:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>{contract && contract.mailing_address}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Primary Contact Name:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>{contract && contract.contact_name}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Primary Contact Title:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>{contract && contract.contact_title}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Primary Contact Phone:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>{contract && contract.contact_phone}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Primary Contact Email:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>{contract && contract.contact_email}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Billing Contact:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>{contract && contract.billing_contact}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Billing Phone:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>{contract && contract.billing_phone}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={tableThStyle}>Billing Email:</th>
                                                        <td style={tableTdStyle}>
                                                            <b style={staticTextStyle}>{contract && contract.billing_email}</b>
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

                                            <table style={{ width: '100%' }} className="-p-t-1 -p-b-1">
                                                <tbody>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>By:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <b style={staticTextStyle}>{contract && contract.signed_by}</b>
                                                        </td>

                                                        <th className="-p-l-1" style={{ width: '10%', textAlign: 'left' }}>By:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <b style={staticTextStyle}>{contract && contract.executed_by}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>Printed Name:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <b style={staticTextStyle}>{contract && contract.client_printed_name}</b>
                                                        </td>

                                                        <th className="-p-l-1" style={{ width: '10%', textAlign: 'left' }}>Printed Name:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <b style={staticTextStyle}>{contract && contract.executor_printed_name}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>Title:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <b style={staticTextStyle}>{contract && contract.client_title}</b>
                                                        </td>

                                                        <th className="-p-l-1" style={{ width: '10%', textAlign: 'left' }}>Title:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <b style={staticTextStyle}>{contract && contract.executor_title}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>Date:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <b style={staticTextStyle}>{contract && contract.signed_at && moment(contract.signed_at).format(YMD)}</b>
                                                        </td>

                                                        <th className="-p-l-1" style={{ width: '10%', textAlign: 'left' }}>Date:</th>
                                                        <td style={{ width: '40%' }}>
                                                            <b style={staticTextStyle}>{contract && contract.executed_at && moment(contract.executed_at).format(YMD)}</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ width: '10%', textAlign: 'left' }}>Signature:</th>
                                                        <td style={{ width: '40%', border: 'solid 1px', fontFamily: SIGN_FONT_FAMILY, textAlign: 'center' }}>
                                                            <b>{contract && contract.signed_by}</b>
                                                        </td>

                                                        <th className="-p-l-1" style={{ width: '10%', textAlign: 'left' }}>Signature:</th>
                                                        <td style={{ width: '40%', border: 'solid 1px', fontFamily: SIGN_FONT_FAMILY, textAlign: 'center' }}>
                                                            <span>{contract && contract.executed_by}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

export default ExecutedContract;