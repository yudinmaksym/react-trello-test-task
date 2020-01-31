import React from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getUsers } from '../../actions/auth';

class Login extends React.Component {

    handleLogIn = () => {
        const { checkUserForLogin  } = this.props;

        var userEmail = ReactDOM.findDOMNode(this.refs.userEmail).value,
            userPass = ReactDOM.findDOMNode(this.refs.userPass).value;

        const userData = {
            email: userEmail,
            password: userPass
        }

        checkUserForLogin(userData);
    } 

    render() {
        const { currentUser, isAuthenticated, userAvatar } = this.props;
        return(
            <div className="login__login-form">
                <h3>Sign In</h3>
                <div>
                    <p>
                        <input 
                        type="email"
                        placeholder="Email"
                        ref="userEmail"
                        />
                    </p>
                    <p>
                    <input
                        type="password"
                        placeholder="Password"
                        ref="userPass"
                        />
                    </p>
                    <button
                        onClick={this.handleLogIn}
                        >
                            Sign In
                        </button>
                </div>

                <p>
                    <Link to="/registration">Registration</Link>
                </p>

                {isAuthenticated === true
                    ? 
                        <h1>Welcome {currentUser.firstName} 
                        <img src={userAvatar} width="50" height="50" alt="" />
                        <Link to="/board">Go to Board</Link></h1>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.auth.users,
    currentUser: state.auth.currentUser,
    isAuthenticated: state.auth.isAuthenticated,
    userAvatar: state.auth.userAvatar
});

const mapDispatchToProps = dispatch => ({
    checkUserForLogin: (data) => dispatch(getUsers(data)),
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login);