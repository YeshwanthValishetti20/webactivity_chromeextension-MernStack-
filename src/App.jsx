// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from 'react';
import ReactDOM from 'react-dom';

const signupUser = async (email, password) => {
    try {
        const response = await fetch('http://your-backend-url.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });
        const data = await response.json();
        console.log('User registered successfully:', data);
        // Handle success, maybe redirect to a success page or show a success message
    } catch (error) {
        console.error('Error registering user:', error);
        // Handle error, show an error message to the user
    }
};

const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://your-backend-url.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });
        const data = await response.json();
        console.log('User logged in successfully:', data);
        // Handle success, maybe redirect to a dashboard or show a success message
    } catch (error) {
        console.error('Error logging in user:', error);
        // Handle error, show an error message to the user
    }
};

const App = () => {
    const handleSignup = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        signupUser(email, password);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        loginUser(email, password);
    };

    return (
        <div>
            <h1>Activity Tracker</h1>
            <h2>Signup</h2>
            <form id="signup-form" onSubmit={handleSignup}>
                <input type="email" name="email" placeholder="Enter email" required /><br />
                <input type="password" name="password" placeholder="Enter password" required /><br />
                <button type="submit">Signup</button>
            </form>
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Enter email" required /><br />
                <input type="password" name="password" placeholder="Enter password" required /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
