import React from 'react';
import { Link } from 'react-router-dom';
import { SCHEDULE, LEADERBOARD } from './../constant';
import style from './styles/Header.module.css';


const Header = () => {
  return (
    <header className={style.container}>
      <img className={style.appLogo} src='/Images/logo.svg' alt="App Logo" />
      <span className={style.buttonContainer}>
        <Link className={style.link} to={`/${SCHEDULE}`}>
          <span className={style.button}>
            <img className={style.logo} src='/Images/schedule.png' alt="S Logo" />
            <label className={style.label}>Schedule</label>
          </span>
        </Link>
        <Link className={style.link} to={`/${LEADERBOARD}`}>
          <span className={style.button}>
            <img className={style.logo} src='/Images/leaderboard.png' alt="LB Logo" />
            <label className={style.label}>Leaderboard</label>
          </span>
        </Link>
      </span>
    </header>
  );
}

export default Header
