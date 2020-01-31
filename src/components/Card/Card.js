import React, { Component } from 'react'
import AddNewCard from './AddNewCard'
import './Card.css'
import deleteIcon from '../../img/delete.svg'
import { connect } from 'react-redux';
import { deleteCardFromDb, getColumnFromDb } from '../../actions/index';
import CardModal from './CardModal/CardModal';
import {Draggable} from 'react-beautiful-dnd';

class Card extends Component { 

    constructor(props) {
        super(props);
    
        this.state = { 
            modalShow: false,
            modalData: [], 
            userwhocreated: [] ,
            thisCardId: 0
        };
    }

    handleDeleteCard = (cardId) => {
        const { deleteCard, getData } = this.props;
        deleteCard(cardId);
        getData();
    }

    render() {
        const { columns, cards } = this.props;
        var columnId = this.props.columnId;

        let modalClose = () => this.setState({ modalShow: false });

        var cardsForThisColumn = cards.filter(data => data.columnId === columnId);

        return(
            <div>
                {cardsForThisColumn.map((data,index) => (
                    <Draggable draggableId={data.id} index={index} key={data.id}>
                        {provided => (
                             <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                <div className="card">
                                    <p className="card__title" onClick={() => this.setState({ modalShow: true, modalData: data, userwhocreated: data.userWhoCreated, thisCardId: data.id })}><strong>{data.cardName}</strong></p>
                                    <div className="card__img"><img src={data.img} width="100%" alt="" /></div>
                                    <button
                                        className="card__delete-btn"
                                        onClick={ () => this.handleDeleteCard(data.id) }
                                        >
                                        <img src={deleteIcon} alt="delete" width="15" height="15" />
                                    </button>
                                    <div className="card__time-user">{data.timeCreated} <img src={data.userWhoCreated.userAvatar} width="20" height="20" alt="" /></div>
                                </div>
                            </div>
                        )}
                   
                    </Draggable>
                ))}
                <AddNewCard columns={columns} columnId={columnId} />

                <CardModal
                    show={this.state.modalShow}
                    data={this.state.modalData}
                    userwhocreated={this.state.userwhocreated}
                    cardId={this.state.thisCardId}
                    onHide={modalClose}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    columns: state.board.columns,
    cards: state.board.cards
});

const mapDispatchToProps = dispatch => ({
    deleteCard: (cardId) => dispatch(deleteCardFromDb(cardId)),
    getData: () => dispatch(getColumnFromDb())
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Card);