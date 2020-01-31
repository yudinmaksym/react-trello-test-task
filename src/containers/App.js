
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from '../actions/index';
import * as authActions from '../actions/auth';
import App from '../components/App';

  function mapStateToProps(state) {
    return {
      columns: state.columns,
      cards: state.cards,
      users: state.users,
      currentUser: state.currentUser
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      pageActions: bindActionCreators(pageActions,dispatch),
      authActions: bindActionCreators(authActions,dispatch)
    }
  }
  
  

export default connect(mapStateToProps, mapDispatchToProps)(App)