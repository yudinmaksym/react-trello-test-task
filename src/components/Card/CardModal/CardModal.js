import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateCard, getColumnFromDb } from '../../../actions/index';

class CardModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardImg: "",
            visible: false
        }
        this.handleChangeFile = this.handleChangeFile.bind(this);
    }

    handleUpdateCard = () => {
        const { updateCard, getData } = this.props;

        let newCardName = ReactDOM.findDOMNode(this.refs.cardName).value,
            newCardDescription = ReactDOM.findDOMNode(this.refs.cardDescription).value,
            newDate = new Date(),
            date = newDate.getDate(),
            month = newDate.getMonth(),
            hours = newDate.getHours(),
            minutes = newDate.getMinutes();

        const newCardData = {
            cardName: newCardName,
            description: newCardDescription,
            timeCreated: date + '.' + month + ' ' + hours + ':' + minutes,
            columnId: this.props.data.columnId
        }

        if(this.state.cardImg !== ""){
           newCardData.img =  this.state.cardImg;
        }

        console.log(newCardData);
        updateCard(this.props.cardId, newCardData);
        getData();
    }

    handleChangeFile(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend=()=>{
            this.setState({cardImg: reader.result, visible: true})
        }
    }


    render() {
        const cardData = this.props.data;
        const userwhocreated = this.props.userwhocreated;
        const { cardId, updateCard, getData, ...rest } = this.props;
        return(
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <input 
                        defaultValue={ cardData.cardName }
                        ref="cardName"
                        />
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card__time-user">{cardData.timeCreated} {userwhocreated.userName} <img src={userwhocreated.userAvatar} width="40" height="40" alt="" /></div>
                    
                    { this.state.visible ? null : <p><img src={cardData.img} width="50%" alt={cardData.img} /></p>}
                    <p><img src={this.state.cardImg} width="50%" alt="" /></p>
                    <input type="file" onChange={(e) =>  this.handleChangeFile(e)} /> 

                    <h4 className="mt-5">Description</h4>
                    <textarea 
                        className="form-control" 
                        defaultValue={cardData.description} 
                        rows="3"
                        ref="cardDescription"></textarea>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.handleUpdateCard}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    columns: state.board.columns,
    cards: state.board.cards
});

const mapDispatchToProps = dispatch => ({
    updateCard: (cardId, data) => dispatch(updateCard(cardId, data)),
    getData: () => dispatch(getColumnFromDb())
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardModal);