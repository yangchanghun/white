import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/home/Header.css';

const LoggedOutHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/">남성</Link></li>
          <li><Link to="/">패션리포트</Link></li>
          <li className="logo">WHITE</li>
          <li><Link to="/">고객센터</Link></li>
          <li><Link to="/">장바구니</Link></li>
          <li><button onClick={() => navigate('/login')}>LOGIN</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default LoggedOutHeader;