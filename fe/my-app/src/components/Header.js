// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../css/home/Header.css';

// const Header = ({ loggedIn }) => {
//   let authLink;

//   if (loggedIn === false) 
//     authLink = <Link to="/login">로그인</Link>;
//   if (loggedIn === true)
//     authLink = <Link to="/logout">로그아웃</Link>;
  

//   return (
//     <div>
//       <header className="header">
//         <nav className="nav">
//           <ul className="nav-list">
//             <li>
//               <Link to="/">남성</Link>
//             </li>
//             <li>
//               <Link to="/">패션리포트</Link>
//             </li>
//             <li className="logo">WHITE</li>
//             <li>
//               <Link to="/">고객센터</Link>
//             </li>
//             <li>
//               <Link to="/">장바구니</Link>
//             </li>
//             <li>
//               {authLink} {/* 여기에 조건에 따라 설정된 링크를 렌더링 */}
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default Header;
import '../css/home/Header.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = ({ loggedIn, setLoggedIn }) => {  // setLoggedIn이 props로 전달됩니다
  const navigate = useNavigate(); // useNavigate 훅을 컴포넌트 내부에서 사용

  // 로그아웃 함수
  const logout = async () => {  // 더 이상 setLoggedIn을 인자로 받지 않음
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
        alert('로그아웃 되었습니다');
        navigate('/');  // 로그아웃 후 홈으로 이동
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
          {loggedIn ? (
            <>
              <button onClick={() => navigate('/mypage')}>MYPAGE</button>
              <button onClick={logout}>LOGOUT</button>
            </>
          ) : (
            <button onClick={() => navigate('/login')}>LOGIN</button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

// const Header = () => {
//   const [loggedIn, setLoggedIn] = useState(null); // 초기값을 null로 설정

//   useEffect(() => {
//     // 쿠키에서 로그인 상태 확인
//     const isLoggedIn = document.cookie.includes('access'); // 예: access 쿠키가 있는지 확인
//     setLoggedIn(isLoggedIn);
//   }, []);

//   if (loggedIn === null) {
//     // 로그인 상태를 아직 확인 중일 때는 아무것도 렌더링하지 않음
//     return null; // 또는 로딩 표시
//   }