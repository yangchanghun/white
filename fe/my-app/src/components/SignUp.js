import React from 'react';

const Signup = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const nickname = form.nickname.value;
    const email = form.email.value;
    const password1 = form.password1.value;
    const password2 = form.password2.value;

    if (password1 !== password2) {
      alert("Passwords do not match!");
      return;
    }

    console.log("nickname:", nickname);
    console.log("email:", email);
    console.log("Password:", password1);

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          email,
          password: password1,
          password2,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful:", data);
        // 추가적인 로직 (예: 로그인 페이지로 이동)
      } else {
        console.error("Registration failed:", data);
        alert(`Registration failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='nickname' placeholder='nickname' required />
      <input name='email' placeholder='email' type='email' required />
      <input name='password1' placeholder='password1' type='password' required />
      <input name='password2' placeholder='password2' type='password' required />
      <button type='submit'>회원가입</button>
    </form>
  );
};

export default Signup;
