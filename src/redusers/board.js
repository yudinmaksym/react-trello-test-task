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

const initialState = {
    columns: [],
    cards: []
}

export default function (state = initialState, {type,payload,columns,cards}) {
    switch(type) {
        case ADD_TO_DB: return state;
        case ADD_CARD_TO_DB: return state;
        case GET_COL_DB: return { columns: columns, cards: cards };
        case DELETE_COLUMN: return state;
        case DELETE_CARD: return state;
        case UPDATE_COL: {
            const colToUpdate = state.columns.find((column) => column.id === payload.id);
            return { columns: [
                ...state.columns.filter((column) => column.id !== payload.id),
                Object.assign({}, colToUpdate, { columnName: payload.colname }),
            ], cards: state.cards };
        };
        case UPDATE_CARD: return state;
        case UPDATE_CARDS_DRAGGING: return {...state, cards: payload};
        case UPDATE_COLUMNS_DRAGGING: return { columns:payload, ...state }

        default: return state;
    }
}