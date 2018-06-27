import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param columns
 * Example: [{label: 'column1', name: 'col1'}, {label: 'column2', name: 'col2'}]
 * @param entries
 * Example: [{id: 1, col1: 'value1', col2: 'value2'}, {id: 2, col1: 'value3', col2: 'value4'}]
 * @param tableClassName
 * @param size
 * @returns {XML}
 */
const EntriesList = ({
    columns,
    entries,
    tableClassName,
    size
}) => {
    const tableCustomClassName = `gds-table gds-table--${size} ${tableClassName}`;
    return (
        <div className="gds-table--responsive">
            <table className={tableCustomClassName}>
                <thead>
                <tr className="gds-table__row">
                    {
                        columns.map((column, i) => <th key={ i } className="gds-table__header -text-left">{ column.label }</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    entries && entries.map((entry, rowIndex) => {
                        return (
                            <tr key={entry.id ? entry.id : rowIndex} className="gds-table__row">
                                {
                                    columns.map((column, colIndex) => <td key={ colIndex } >{entry[column.name]}</td>)
                                }
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    )
};

EntriesList.defaultProps = {
    entries: [],
    tableClassName: "gds-table--striped",
    size: "sm"
};

EntriesList.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    entries: PropTypes.arrayOf(PropTypes.object),
    tableClassName: PropTypes.string,
    size: PropTypes.string
};

export default EntriesList;
