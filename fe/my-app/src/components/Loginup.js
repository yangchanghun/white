// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { setTokens } from './AuthService';

// const Login = ({setLoggedIn }) => {
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const email = form.email.value;
//     const password = form.password.value;

//     try {
//       const response = await fetch('http://127.0.0.1:8000/accounts/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//         credentials: 'include',  // 쿠키를 포함하여 요청
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log("Login successful:", data);
//         setTokens(data.token.access, data.token.refresh);  // 토큰 저장
//         setLoggedIn(true);  // 로그인 상태 업데이트
//         navigate('/');  // 홈페이지로 리다이렉트
//       } else {
//         console.error("Login failed:", data);
//         alert(`Login failed: ${JSON.stringify(data)}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name='email' placeholder='email' type='email' required />
//       <input name='password' placeholder='password' type='password' required />
//       <button type='submit'>로그인</button>
//     </form>
//   );
// };

// export default Login;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',  // 쿠키를 포함하여 요청
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        setLoggedIn(true);  // 로그인 상태 업데이트
        navigate('/');  // 홈페이지로 리다이렉트
      } else {
        console.error("Login failed:", data);
        alert(`Login failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
    <form onSubmit={handleSubmit}>
      <input name='email' placeholder='email' type='email' required />
      <input name='password' placeholder='password' type='password' required />
      <button type='submit'>로그인</button>
    </form>
    </Container>

  );
};

const Container = styled.section`
  ${props => props.theme.flex.flexBox('column')}
  margin: auto;
  margin-top: 9.375rem;
  max-width: 25rem;
`;
export default Login;



// ////////////////// 그 뭐야 새로고침하면 로그인이 풀림 