// api.js

export default {
  async login (email, password) {
    const url = 'http://54.254.162.138/api/login';
    const data = {email, password};

    try {
      const response = await fetch (url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (data),
      });

      if (response.ok) {
        const userData = await response.json ();
        // Handle successful login
        console.log ('User details:', userData);
      } else if (response.status === 401) {
        // Unauthorized, invalid credentials
        console.error ('Invalid credentials');
        alert ('Invalid email or password');
      } else {
        // Handle other HTTP errors
        console.error ('Failed to login:', response.statusText);
        alert ('Failed to login. Please try again later.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error ('An error occurred:', error.message);
      alert ('An error occurred. Please try again later.');
    }
  },
};
