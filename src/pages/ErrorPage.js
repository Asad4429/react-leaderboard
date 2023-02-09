import React from 'react';
import style from './styles/ErrorPage.module.css';


const ErrorPage = () => {
  return (
    <main className={style.container}>
      <img className={style.image} src='/Images/404.png' alt="404 Not Found" />
    </main>
  );
}

export default ErrorPage
