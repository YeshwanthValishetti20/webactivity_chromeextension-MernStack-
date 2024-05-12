<template>
  <div>
    <form v-if="!showSignupForm && !userId" @submit.prevent="login">
      <h2>Login</h2>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>

    <!-- Signup Form -->
    <div v-if="showSignupForm">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div>
          <label for="new-password">Password:</label>
          <input type="password" id="new-password" v-model="newPassword" />
        </div>
        <div>
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>

    <div v-if="userId && $route.name === 'about'">
      <!-- Logout Button -->
      <button @click="logout">Logout</button>
    </div>


    <!-- Notification Popup -->
    <div v-if="notification" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>

    <!-- Button to toggle between login and signup forms -->
    <button v-if="!showSignupForm && !userId" @click="toggleSignupForm">Sign Up</button>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library

export default {
  data() {
    return {
      username: '',
      password: '',
      notification: null,
      showSignupForm: false,
      name: '',
      email: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://activity-tracker-backend-vrz8.onrender.com/api/login', {
          email: this.username,
          password: this.password
        });
        
        console.log('Login successful:', response.data);
        this.showNotification('success', 'Login successful!');
        
        // Set a cookie named "userId" with the user's ID
        Cookies.set('userId', response.data.user.id);

        // You can handle the successful login response here, like redirecting the user to another page
      } catch (error) {
        console.error('Login failed:', error.response.data);
        this.showNotification('error', 'Login failed. Please check your credentials.');
        // You can handle login errors here, such as displaying an error message to the user
      }
    },

    async signup() {
      try {
        if (this.newPassword !== this.confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        
        const response = await axios.post('https://activity-tracker-backend-vrz8.onrender.com/api/register', {
          user: {
            name: this.name,
            email: this.email,
            password: this.newPassword,
            password_confirmation: this.confirmPassword
          }
        });
        
        console.log('Signup successful:', response.data);
        this.showNotification('success', 'Signup successful!');
        
        // Set a cookie named "userId" with the user's ID
        Cookies.set('userId', response.data.user.id);

        // You can handle the successful signup response here
      } catch (error) {
        console.error('Signup failed:', error.message);
        this.showNotification('error', 'Signup failed. ' + error.message);
        // You can handle signup errors here
      }
    },

    async logout() {
      try {
        // Clear the "userId" cookie
        Cookies.remove('userId');
        
        // Call the logout API endpoint
        await axios.post('https://activity-tracker-backend-vrz8.onrender.com/api/logout');

        // Optional: Perform any additional logout logic, such as redirecting the user
        // Example: this.$router.push('/login'); // Redirect to the login page
        // Show logout success notification
        this.showNotification('success', 'Logged out successfully.');
      } catch (error) {
        console.error('Logout failed:', error);
        // Show logout error notification
        this.showNotification('error', 'Logout failed. Please try again.');
      }
    },

    showNotification(type, message) {
      this.notification = { type, message };
      setTimeout(() => {
        this.notification = null;
      }, 3000); // Hide the notification after 3 seconds
    },
    toggleSignupForm() {
      this.showSignupForm = !this.showSignupForm;
    }
  }
};
</script>

<style>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
}
</style>
