import React, { useEffect, useState } from "react";
import C from "materialize-css/dist/js/materialize.min.js";
import "../static/css/Myspace.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Todocard from "../components/Todo/Todocard";
import Profilecard from "./Profilecard";
import profileimg from "../static/icons/avatar.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Myspace = (props) => {
  const [sportcount, setSportcount] = useState(0);

  let today = new Date();
  const [date, setDate] = useState(today);

  const state = {
    labels: ["Sport", "Bien-etre", "Medecine douce", "Culture", "Conciergerie"],
    datasets: [
      {
        label: "Activity",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [sportcount, 1, 2, 3, 2],
      },
    ],
  };

  useEffect(() => {
    if (localStorage.length === 0) {
      props.history.push("/login");
    }
  }, [ props.history]);

  useEffect(() => {
    var elems = document.querySelectorAll(".carousel");
    C.Carousel.init(elems, { indicators: true });
  }, []);

  const onChange = (date) => setDate(date);

  const localuser = JSON.parse(localStorage.getItem("user"));
  const activeuser = localuser.username;

  let count = 0;

  const findUserInAcc = props.userInfo.find(
    (item) => item.username === activeuser
  );

  count =
    findUserInAcc.count.sport.jogging +
    findUserInAcc.count.sport.swim +
    findUserInAcc.count.sport.football +
    findUserInAcc.count.sport.basketball;

  useEffect(() => {
    setSportcount(count);
  }, [
    count,
    findUserInAcc.count.sport.jogging,
    findUserInAcc.count.sport.swim,
    findUserInAcc.count.sport.football,
    findUserInAcc.count.sport.basketball,
  ]);

  return (
    <div className="my-space container">
      <div className="carousel-section">
        <div className="carousel carousel-slider">
          <Link className="carousel-item" to="#one!">
            <img
              src="https://s8.gifyu.com/images/carousel1.jpg"
              alt="carousel1"
            />
          </Link>
          <Link className="carousel-item" to="#two!">
            <img
              src="https://s8.gifyu.com/images/carousel2.jpg"
              alt="carousel2"
            />
          </Link>
          <Link className="carousel-item" to="#three!">
            <img
              src="https://s8.gifyu.com/images/carousel3.jpg"
              alt="carousel3"
            />
          </Link>
          <Link className="carousel-item" to="#four!">
            <img
              src="https://s8.gifyu.com/images/carousel4.jpg"
              alt="carousel4"
            />
          </Link>
          <Link className="carousel-item" to="#five!">
            <img
              src="https://s8.gifyu.com/images/carousel5.jpg"
              alt="carousel5"
            />
          </Link>
        </div>
      </div>

      <div className="calender-chart-section row ">
        <div className="calender-section col s6 hoverable">
          <Calendar onChange={onChange} value={date} />
        </div>
        <div className="profile-section col">
          <div className="profile-inner-section"></div>
          <Profilecard
            img={profileimg}
            name={activeuser}
            designation={"designer"}
          />
        </div>
      </div>

      <div className="row">
        <div className="to-do-section col s6 ">
          <Todocard />
        </div>
        <div className="chart-section col  hoverable valign-wrapper">
          <Doughnut
            data={state}
            options={{
              title: {
                display: false,
                text: "Activity",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.accReducer.account,
});

export default withRouter(connect(mapStateToProps, null)(Myspace));
