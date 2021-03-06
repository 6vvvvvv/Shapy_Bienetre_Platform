import React from "react";
import { Link } from "react-router-dom";
import "../static/css/Logout.css";
import avatar from "../static/icons/avatar.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedin } from "./redux/Account/action-creator/acc-actionCreators";

const Logout = (props) => {
  const submit = (e) => {
    e.preventDefault();
    localStorage.clear();
    props.clearloggedin();
    props.history.push("/");
  };

  return (
    <div className="row log-out-form">
      <form className="col s12 logout-inner-form">
        <i className="material-icons exit_to_app">exit_to_app</i>
        <div className="row avatar-icon">
          <img src={avatar} className="avatar-icon" alt="avatar-icon"></img>
        </div>
        <div className="row logout-btn-section">
          <button
            className="btn waves-effect waves-light logout-btn"
            type="submit"
            name="action"
            onClick={submit}
          >
            Exit
            <i className="material-icons right">send</i>
          </button>
        </div>
        <p className="return-home">
          Reture <Link to="/">Home</Link>
        </p>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearloggedin: () => dispatch(setLoggedin()),
});

export default withRouter(connect(null, mapDispatchToProps)(Logout));
