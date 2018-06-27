import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroup from 'gumdrops/ButtonGroup';
import Button from 'gumdrops/Button';
import Row from 'gumdrops/Row';
import Column from 'gumdrops/Column';
import FormGroup from 'gumdrops/FormGroup';
import FormGroupLabel from 'gumdrops/FormGroupLabel';
import TextInput from 'gumdrops/TextInput';

const SearchForm = ({
    formData
}) => {
    return (
        <div className="-m-b-3">
            <Row>
                <Column md="4">
                    <FormGroup>
                        <FormGroupLabel text="Title"/>
                        <TextInput
                            placeholder="Title"
                            name="title"
                            value={''}
                            onChange={() => {}}
                        />
                    </FormGroup>
                </Column>
                <Column md="3" style={{marginTop: '1.9em'}}>
                    <ButtonGroup>
                        <Button
                            group
                            size="md"
                            context="primary"
                            onClick={() => {}}
                        >
                            Search
                        </Button>
                    </ButtonGroup>
                </Column>
            </Row>
        </div>
    );
};

SearchForm.propTypes = {
    formData: PropTypes.object
};

export default SearchForm;
