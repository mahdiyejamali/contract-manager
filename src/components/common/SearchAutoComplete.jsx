import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'gumdrops/TextInput';
import arraysEqual from '../../helpers/arraysEqual';

class SearchAutoComplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    componentDidMount() {
        window.addEventListener('click', this._closeOnClickOutside);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {options, selected, searchTerm} = this.props;
        const {isOpen} = this.state;
        const {options: nextOptions, selected: nextSelected, searchTerm: nextSearchTerm} = nextProps;
        const {isOpen: nextIsOpen} = nextState;
        return !(arraysEqual(options, nextOptions) && selected === nextSelected && searchTerm === nextSearchTerm && isOpen === nextIsOpen);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this._closeOnClickOutside);
    }

    _closeOnClickOutside = ({ target }) => {
        const el = this.container;
        if (!el.contains(target)) {
            this._closeSelect();
        }
    };

    _closeSelect = () => this.setState({ isOpen: false });

    _openSelect = () => {
        if (this.state.isOpen) {
            return;
        }
        this.setState({ isOpen: true });
    };

    _handleSelect = (item) => {
        this._closeSelect();
        this.props.onSelect(item);
    };

    _handleRemoveSelectedItem = () => {
        this.props.onRemoveSelectedItem();
    };

    _getContainer = (ref) => this.container = ref;

    render() {
        const { options, searchTerm, selected, filter, placeholder, context, size } = this.props;
        const openClass = (this.state.isOpen) ? 'gds-search-select--open' : '';
        const subNameLength = 15;
        const subName = selected && selected.name && (selected.name.length > subNameLength ? selected.name.substr(0, subNameLength) + '...' : selected.name);

        return (
            <div ref={ this._getContainer } className={ `gds-search-select ${openClass}` }>
                <div className="gds-search-select__control">
                    {selected && Object.keys(selected).length > 0 && <div className={`gds-search-select__tag-indicator gds-tag gds-tag--sm gds-tag--with-button gds-tag--${context}`}>
                        <span className="-user-select--none">{`${subName} (${selected.id})`}</span>
                        <button className="gds-tag__option gds-tag__option--sm gds-tag__option--primary"><i className="btl bt-fw bt-times" onClick={this._handleRemoveSelectedItem}></i></button>
                    </div>}
                    <TextInput
                        onFocus={ this._openSelect }
                        onClick={ this._openSelect }
                        onChange={ filter }
                        value={searchTerm}
                        type="text"
                        placeholder={ placeholder }
                        size={size}
                        className='gds-search-select__input'
                    />
                </div>
                <div className="gds-search-select__menu">
                    <div className="gds-search-select__menu-items">
                        {
                            options.map((item, index) => {
                                const { name, id, title } = options[index];
                                return (
                                    <div
                                        key={ id }
                                        onClick={ () => this._handleSelect(item) }
                                        className="gds-search-select__menu-item"
                                    >
                                        { title ? title : name }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

SearchAutoComplete.defaultProps = {
    searchTerm: '',
    placeholder: '',
    context: 'primary',
    size: 'md'
};

SearchAutoComplete.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        name: PropTypes.string.isRequired,
        title: PropTypes.string
    })).isRequired,
    selected: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        name: PropTypes.string,
        title: PropTypes.string
    }),
    onSelect: PropTypes.func.isRequired,
    onRemoveSelectedItem: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
    filter: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    context: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md']),
};

export default SearchAutoComplete;
