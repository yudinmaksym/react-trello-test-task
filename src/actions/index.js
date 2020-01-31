import {
    ADD_TO_DB,
    ADD_CARD_TO_DB,
    GET_COL_DB,
    DELETE_COLUMN,
    DELETE_CARD,
    UPDATE_COL,
    UPDATE_CARD,
    UPDATE_CARDS_DRAGGING,
    UPDATE_COLUMNS_DRAGGING
} from '../constants/index';
import db from '../db';

 

export function addInformationToDb(dbname,data) {
    return (dispatch) => {
        db.table(dbname)
            .add(data)
            .then(() => {
                dispatch({
                    type: ADD_TO_DB
                })
            });
    } 
}

export function addCardToDb(data) {
    return (dispatch) => {
        db.table("cards")
            .add(data)
            .then(() => {
                dispatch({
                    type: ADD_CARD_TO_DB
                })
            })
    }
    
}

export function getColumnFromDb() {
    return(dispatch) => {
        db.table('columns')
            .toArray()
            .then((column) => {
                db.table('cards')
                    .toArray()
                    .then((card) => {
                        dispatch({
                            type: GET_COL_DB,
                            columns: column,
                            cards: card
                        });
                    })
            });
    }
}

export function deleteColumnFromDb(itemid) {

    return (dispatch) => {
        db.table("columns")
            .delete(itemid)
            .then(() => {
                dispatch({
                    type: DELETE_COLUMN,
                    payload: itemid
                })
            });
    }
}

export function deleteCardFromDb(itemid) {
    return (dispatch) => {
        db.table("cards")
            .where('id')
            .equals(itemid)
            .delete()
            .then(() => {
                dispatch({
                    type: DELETE_CARD,
                    payload: itemid
                })
            });
    }
    
  }

export function updateColumnTitle(id, colname) {
    return (dispatch) => {
        db.table("columns")
            .update(id, {columnName: colname})
            .then(() => {
                dispatch({
                    type: UPDATE_COL,
                    payload: {id, colname}
                })
            });
    }

}

export function updateCard(id, newCardData) {
    return (dispatch) => {
        db.table("cards")
            .update(id, newCardData)
            .then(() => {
                dispatch({
                    type: UPDATE_CARD,
                    payload: {id, newCardData}
                })
            });
    }
}

export function draggInCurrentColumn(result, cards) {
    return (dispatch) => {
        const { destination, source, draggableId } = result;
        const newCardsId = cards.filter(data => data.columnId === source.droppableId);
        const draggCard = cards.filter(data => data.id === draggableId);
        let neighbourCard = cards.filter( (data,index) => (data.columnId === source.droppableId));
        neighbourCard = neighbourCard.filter((data,index)=>index===destination.index);

        const oldId = draggCard[0].id,
            newId = neighbourCard[0].id;

        draggCard[0].id = newId;
        neighbourCard[0].id = oldId;

        newCardsId.splice(source.index, 1);
        newCardsId.splice(destination.index, 0, draggCard[0]);
        dispatch(updateAfterDragging(source.droppableId, newCardsId, draggCard[0].id, neighbourCard[0].id));
    }
}

export function updateAfterDragging(columnId, newCardsData) {
    return (dispatch) => {
        db.table("cards")
        .where("columnId")
        .equals(columnId)
        .delete()
        .then(() => {
            newCardsData.map((item) => (
                db.table("cards")
                .add(item)
            ))
            
            db.table("cards")
                .toArray()
                .then((cards) => {
                    dispatch({
                        type: UPDATE_CARDS_DRAGGING,
                        payload: cards
                    })
                })
            
        })
    }
}

export function draggToAnotherColumn(result, cards) {
    return (dispatch) => {
        const { destination, source, draggableId } = result;
        const newCardsId = cards.filter(data => data.columnId === destination.droppableId);
        // let neighbourCard = cards.filter( (data,index) =>  data.columnId === destination.droppableId );
        // neighbourCard = neighbourCard.filter ( (data,index) => index === destination.index );
        const draggCard = cards.filter(data => data.id === draggableId);
        draggCard[0].columnId = destination.droppableId;
        newCardsId.unshift(draggCard[0]);
        dispatch(updateDraggingToAnotherColumn(destination.droppableId, newCardsId, source.droppableId, result.draggableId));
    }
}

export function updateDraggingToAnotherColumn(newColumnId, newCardsId, oldColumnId, oldCardInOldColumn) {
    return (dispatch) => {
        db.table("cards")
            .where("columnId").equals(oldColumnId)
            .toArray()
            .then((oldCard) => {
                let oldCardOldColumn = oldCard.filter((item) => item.id === oldCardInOldColumn);
                db.table("cards")
                    .where("id")
                    .equals(oldCardOldColumn[0].id)
                    .delete()
                    .then(() => {
                        db.table("cards")
                            .where("columnId").equals(newColumnId)
                            .delete()
                            .then(() => {
                                newCardsId.map((item) => (
                                    db.table("cards")
                                    .add(item)
                                ))

                                db.table("cards")
                                    .toArray()
                                    .then((cards) => {
                                        dispatch({
                                            type: UPDATE_CARDS_DRAGGING,
                                            payload: cards
                                        })
                                    })
                            })
                    })
                
                
            })
    }
}

export function draggColumns(result, columns, cards) {
    return (dispatch) => {
        const { destination, draggableId } = result;
        let newColumnsData = columns;
        const draggColumn = columns.filter((data) => data.id === draggableId);
        const neighbourColumn = columns.filter((data,index) => index === destination.index);

        newColumnsData = newColumnsData.filter((item) => {
            if(item.id !== draggColumn[0].id && item.id !== neighbourColumn[0].id){
                return item
            }
            return false
        })

        const oldId = draggColumn[0].id,
            newId = neighbourColumn[0].id,
            tempId = 999;
        
        draggColumn[0].id = newId;
        neighbourColumn[0].id = oldId;

        let updateDragColumnCards = cards.filter((item) => {
            if(item.columnId === oldId){
                item.columnId = tempId;
                return item;
            }
            return false
        });
    
        const updateNeighbourColumnCards = cards.filter((item) => {
            if(item.columnId === newId){
                item.columnId = oldId;
                return item;
            }
            return false
        });

        updateDragColumnCards = updateDragColumnCards.filter((item) => {
            if(item.columnId === tempId){
                item.columnId = newId;
                return item;
            }
            return false
        })

        newColumnsData.unshift(neighbourColumn[0]);
        newColumnsData.unshift(draggColumn[0]);
        dispatch(updateDraggedColumns(newColumnsData, cards, oldId, newId, updateDragColumnCards, updateNeighbourColumnCards));
    }
}

export function updateDraggedColumns(newColumnsData, cards, oldColumnId, newColumnId, updateDragColumnCards, updateNeighbourColumnCards) {
    return (dispatch) => {
        db.table("columns")
            .clear()
            .then(() => {
                newColumnsData.map((item) => (
                    db.table("columns")
                        .add(item)
                ))
                db.table("cards")
                    .where("columnId")
                    .equals(oldColumnId)
                    .delete()
                    .then(() => {
                        db.table("cards")
                        .where("columnId")
                        .equals(newColumnId)
                        .delete()
                        .then(() => {
                            updateDragColumnCards.map((item) => (
                                db.table("cards")
                                    .add(item)
                            ))
    
                            updateNeighbourColumnCards.map((item) => (
                                db.table("cards")
                                    .add(item)
                            ))
                        })
                    })

                db.table("columns")
                    .toArray()
                    .then((columns) => {
                        dispatch({
                            type: UPDATE_COLUMNS_DRAGGING,
                            payload: columns
                        })
                    })
            })
         
    }
}