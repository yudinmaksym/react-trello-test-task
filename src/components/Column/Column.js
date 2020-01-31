import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Card from '../Card/Card';
import './Column.css';
import deleteIcon from '../../img/delete.svg';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { 
    deleteColumnFromDb, 
    getColumnFromDb, 
    updateColumnTitle,
} from '../../actions/index';

class Column extends Component {

    constructor(props){
        super(props);
        this.state = {
            columnName: this.props.data.columnName,
            visible: true,
        }
        this.updateColumnTitle = this.updateColumnTitle.bind(this);
    }

    handleDeleteColumn = (columnId) => {
        const { deleteColumn, getData } = this.props;
        deleteColumn(columnId);
        getData();
    }

    passColId = (colId) => {
        this.setState({ columnId: colId});
    }

    updateColumnTitle = (colId) => {
        const { updateColTitle } = this.props;
        var newColumnTitle = ReactDOM.findDOMNode(this.refs.newColumnName).value;
        updateColTitle(colId, newColumnTitle);
    }

    render() {
        const { columns, cards } = this.props;
        var data = this.props.data;
        return(
            <div className="column" key={data.id}>
                <input 
                    className="column__title"
                    onChange={() => this.updateColumnTitle(data.id)}
                    defaultValue={data.columnName}
                    type="text"
                    ref="newColumnName"
                    />
                <button
                    className="column__delete-btn"
                    onClick={ () => this.handleDeleteColumn(data.id) }
                    >
                    <img src={deleteIcon} alt="delete" width="17" height="17" />
                </button>
                <Droppable droppableId={data.id} type="card">
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="column__wrapper">
                            <Card 
                                columnId={data.id}
                                columns={columns}
                                cards={cards}
                            />
                            {provided.placeholder}          
                        </div>
                    )}
                </Droppable>
            </div> 
        );
    }
}

const mapStateToProps = state => ({
    columns: state.board.columns,
    cards: state.board.cards
});

const mapDispatchToProps = dispatch => ({
    deleteColumn: (colId) => dispatch(deleteColumnFromDb(colId)),
    getData: () => dispatch(getColumnFromDb()),
    updateColTitle: (colId, newTitle) => dispatch(updateColumnTitle(colId, newTitle)),
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Column);