import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/home/Header.css';

const LoggedInHeader = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setLoggedIn(false);
        console.log('Logout successful');
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/">남성</Link></li>
          <li><Link to="/">패션리포트</Link></li>
          <li className="logo">WHITE</li>
          <li><Link to="/">고객센터</Link></li>
          <li><Link to="/">장바구니</Link></li>
          <li><button onClick={() => navigate('/mypage')}>MYPAGE</button></li>
          <li><button onClick={logout}>LOGOUT</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default LoggedInHeader;