import React from 'react';
import './BoardHeader.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class BoardHeader extends React.Component {

    constructor(props) {
        super(props);
        const currentUser = localStorage.getItem('current-user');
        this.state = {
            userData: JSON.parse(currentUser)
        }
    }

    render() {
        return (
            <div className="board-header">
                <div className="board-header__right-menu">
                    <div className="board-header__user-icon">
                        {this.state.userData.userName} 
                        <img alt="user name" src={this.state.userData.userAvatar} />
                    </div>
                    <Link to="/">Logout</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userAvatar: state.auth.userAvatar
});

const mapDispatchToProps = dispatch => ({
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BoardHeader);