// background.js

// Listen for messages from content scripts or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'signup') {
    // Track signup
    console.log('Signup tracked:', message.data);
  } else if (message.type === 'login') {
    // Track login
    console.log('Login tracked:', message.data);
  }
});
