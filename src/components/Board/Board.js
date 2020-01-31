import React, { Component } from 'react'
import Column from '../Column/Column';
import AddNewColumn from '../Column/AddNewColumn';
import BoardHeader from './BoardHeader/BoardHeader';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { draggToAnotherColumn, draggInCurrentColumn, draggColumns  } from '../../actions/index';
import './Board.css';

class Board extends Component {

    onDragEnd = result => {
        const { destination, source, type } = result;
        const { 
            columns, 
            cards, 
            draggInCurrentColumn, 
            draggToAnotherColumn, 
            draggColumns 
        } = this.props;

        console.log(result);
        if(type === 'column') {
            if( destination !== null ) {
                draggColumns(result, columns, cards);
            }
        }
        if(type === 'card') {
            if( destination !== null ) {
                if( source.droppableId === destination.droppableId ){ 
                    draggInCurrentColumn(result, cards);
                }
                else {
                    draggToAnotherColumn(result, cards);
                }
            }
        }
    }

    render() {
        const { columns, cards } = this.props;
        return(
            <div>
                <BoardHeader />
                <div className="board-container">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                    
                        <Droppable droppableId="colId" direction="horizontal" type="column">
                            {provided => (
                                <div className="board" ref={provided.innerRef} {...provided.droppableProps}>
                                    {columns.map((data,index) => ( 
                                    <div key={data.id}>
                                        <Draggable draggableId={data.id} index={index} key={data.id}>
                                            {provided => (
                                                <div {...provided.draggableProps}  {...provided.dragHandleProps}  ref={provided.innerRef}  >
                                                    <Column key={data.id} data={data} cards={cards} />
                                                </div>
                                            )}
                                        </Draggable>
                                        {provided.placeholder}
                                    </div> 
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    
                        <AddNewColumn />
                    </DragDropContext>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    columns: state.board.columns,
    cards: state.board.cards,
    currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
    draggInCurrentColumn: (result, cards) => dispatch(draggInCurrentColumn(result, cards)),
    draggToAnotherColumn: (result, cards) => dispatch(draggToAnotherColumn(result, cards)),
    draggColumns: (result, columns, cards) => dispatch(draggColumns(result, columns, cards))
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board);