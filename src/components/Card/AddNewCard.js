import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addCardToDb, getColumnFromDb } from '../../actions/index';

class AddNewCard extends Component {

    constructor(props) {
        super(props);
        const currentUser = localStorage.getItem('current-user');
        this.state = {
            value: "",
            currentUser: JSON.parse(currentUser)
        }
    }

    handleAddNewCard = () => {
        const { addCard, getData } = this.props;

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth();
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        
        const card = {
            cardName: this.state.value,
            description: "",
            columnId: this.props.columnId,
            timeCreated: date + '.' + month + ' ' + hours + ':' + minutes,
            userWhoCreated: this.state.currentUser,
            img: ""
        }
        addCard(card);
        getData();
        this.setState({value: ""});
    }

    handlerOnChangeValue = () => {
        var title = ReactDOM.findDOMNode(this.refs.newCard).value;
        this.setState({value: title});
    }

    render() {
        return(
            <div className="card__add-new-card">
                <input
                    type="text"
                    name="newCard"
                    placeholder="Enter Card Name"
                    value={this.state.value}
                    ref="newCard"
                    onChange={ this.handlerOnChangeValue }
                />
                <button onClick={ this.handleAddNewCard }>Add</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    columns: state.board.columns,
    cards: state.board.cards
});

const mapDispatchToProps = dispatch => ({
    addCard: (data) => dispatch(addCardToDb(data)),
    getData: () => dispatch(getColumnFromDb())
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddNewCard);
