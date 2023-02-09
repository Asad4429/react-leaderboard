import React from 'react';
import style from './styles/Footer.module.css';


const Footer = () => {
  return (
    <footer className={style.container}>
      <label className={style.text}>API Version: 1.0</label>
    </footer>
  );
}

export default Footer
