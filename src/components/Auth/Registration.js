import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUsers } from '../../actions/auth';

class Registration extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleAddUserToDb = () => {
        const { addUserstoDb } = this.props;
        var firstName = ReactDOM.findDOMNode(this.refs.firstName).value,
            lastName = ReactDOM.findDOMNode(this.refs.lastName).value,
            email = ReactDOM.findDOMNode(this.refs.userEmail).value,
            password = ReactDOM.findDOMNode(this.refs.userPass).value;

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        if(addUserstoDb(userData)) { return console.log("success") };

    }

    render() {
        return(
            <div className="login__login-form">
                <h3>Sign Up</h3>
                <form onSubmit={this.handleAddUserToDb}>
                    <p>
                        <input 
                        type="text"
                        placeholder="First name"
                        ref="firstName"
                        />
                    </p>
                    <p>
                        <input 
                        type="text"
                        placeholder="Last Name"
                        ref="lastName"
                        />
                    </p>
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
                        type="submit"
                        >
                            Sign Up
                        </button>
                </form>

                <p>
                    <Link to="/">Login</Link>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch => ({
    addUserstoDb: (userData) => dispatch(addUsers(userData))
  });
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Registration);