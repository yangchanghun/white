// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomeScreen from "./screens/HomeScreen";
// import Header from "./components/Header";
// import Login from "./components/Loginup";
// import Signup from "./components/SignUp";
// import Logout from "./components/LogInOut";
// import { isLoggedIn } from "./components/AuthService";

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     setLoggedIn(isLoggedIn());
//   }, []);

//   return (
//     <Router>
//       <Header loggedIn={loggedIn} />
//       <main className="py-3">
//         <Routes>
//           <Route path="/" element={<HomeScreen loggedIn={loggedIn} />} />
//           <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />  {/* 여기를 확인하세요 */}
//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./components/Loginup";
import Signup from "./components/SignUp";
import Logout from "./components/LogOut";
import { isLoggedIn as checkLoggedIn } from "./components/AuthService";
import LoggedInHeader from "./components/LoggedInHeader";
import LoggedOutHeader from "./components/LoggedOutHeader";
import GoodsMain from "./screens/GoodsMain";
import ProductDetail from "./components/Productdetail"; // 컴포넌트 이름 수정

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await checkLoggedIn();
      setLoggedIn(isLoggedIn);
      localStorage.setItem("loggedIn", isLoggedIn);
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      {loggedIn ? (
        <LoggedInHeader setLoggedIn={setLoggedIn} />
      ) : (
        <LoggedOutHeader />
      )}
      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
          <Route path="/goods/list" element={<GoodsMain loggedIn={loggedIn} />} />
          {/* ProductDetail 컴포넌트의 경로 설정 */}
          <Route path="/goods/:id" element={<ProductDetail loggedIn={loggedIn} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
