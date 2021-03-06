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
    formData,
    onChange,
    onSearch
}) => {
    return (
        <div className="">
            <Row>
                <Column md="4">
                    <FormGroup>
                        <FormGroupLabel text="Name"/>
                        <TextInput
                            placeholder="Name"
                            name="name"
                            defaultValue={formData.name}
                            onChange={onChange}
                            size="sm"
                        />
                    </FormGroup>
                </Column>
                <Column md="3" style={{marginTop: '1.9em'}}>
                    <ButtonGroup>
                        <Button
                            group
                            size="md"
                            context="primary"
                            onClick={onSearch}
                            size="sm"
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
