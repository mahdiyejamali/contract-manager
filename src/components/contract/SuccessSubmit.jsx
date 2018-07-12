import React, { Component } from 'react';
import LayoutContainer from 'gumdrops/LayoutContainer';
import Row from 'gumdrops/Row';
import Column from 'gumdrops/Column';

const API_BASE_URL = 'http://localhost:3000';

class SuccessSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const { 
            
        } = this.state;

        return (
            <div className="-p-t-3">
                <LayoutContainer>
                    <Row>
                        <Column>
                            Thank You For Submitting The Contract.
                        </Column>
                    </Row>
                </LayoutContainer>
            </div>
        );
    }
}

export default SuccessSubmit;
