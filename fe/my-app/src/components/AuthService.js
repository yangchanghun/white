// export const setTokens = (accessToken, refreshToken) => {
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
// };

// export const getAccessToken = () => {
//     return localStorage.getItem('accessToken');
// };

// export const getRefreshToken = () => {
//     return localStorage.getItem('refreshToken');
// };

// export const clearTokens = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
// };

// export const isLoggedIn = () => {
//     return !!localStorage.getItem('accessToken');
// };

export async function isLoggedIn() {
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/verify-token', {
        method: 'POST',
        credentials: 'include',  // 쿠키를 포함하여 요청
      });
  
      if (response.ok) {
        return true; // 토큰이 유효하면 로그인 상태로 간주
      } else {
        return false; // 토큰이 유효하지 않으면 로그아웃 상태로 간주
      }
    } catch (error) {
      console.error('Error verifying login status:', error);
      return false;
    }
  }
  