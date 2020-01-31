import React, {Component} from 'react'
import './AddNewColumn.css'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addInformationToDb, getColumnFromDb } from '../../actions/index';

class AddNewColumn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }
    
    handleAddNewColumn = () => {
        const { addColumn, getColumn } = this.props;
        const column = {
          columnName: this.state.value,
        }
        addColumn("columns", column);
        getColumn();
        this.setState({value:""})
    }

    handlerOnChangeValue = () => {
        var title = ReactDOM.findDOMNode(this.refs.inputRef).value;
        this.setState({value: title});
    }

    render() {
        return(
            <div className="column__add-new-column">
                <p>Add new column here</p>
                <div className="column__add-new-column__form">
                    <input
                        type="text"
                        name="newColumn"
                        defaultValue={this.state.value}
                        onChange={this.handlerOnChangeValue}
                        placeholder="Enter Column Name"
                        ref="inputRef"
                    />
                    <button onClick={ this.handleAddNewColumn }>Add</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    columns: state.board.columns,
    cards: state.board.cards
});

const mapDispatchToProps = dispatch => ({
    addColumn: (dbname,data) => dispatch(addInformationToDb(dbname,data)),
    getColumn: () => dispatch(getColumnFromDb())
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddNewColumn);