// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { clearTokens } from './AuthService';

// const Logout = ({ setLoggedIn }) => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/accounts/logout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',  // 쿠키를 포함하여 요청
//       });
//       if (response.ok) {
//         clearTokens();  // 로컬 스토리지에서 토큰 삭제
//         setLoggedIn(false);  // 로그인 상태 업데이트
//         console.log('Logout successful');
//         navigate('/');  // 로그인 페이지로 리다이렉트
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default Logout;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // 쿠키를 포함하여 요청
      });
      if (response.ok) {
        setLoggedIn(false);  // 로그인 상태 업데이트
        console.log('Logout successful');
        navigate('/');  // 홈페이지로 리다이렉트
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
