document.addEventListener('DOMContentLoaded', function() {
    // Fetch website activity data from storage
    chrome.storage.local.get('websiteData', function(result) {
      const websiteData = result.websiteData || {};
      displayActivityData(websiteData);
    });
  });
  
  function displayActivityData(websiteData) {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
  
    for (const [url, data] of Object.entries(websiteData)) {
      const listItem = document.createElement('div');
      listItem.innerHTML = `<strong>${url}</strong>: Total Time: ${data.totalTime} seconds`;
  
      activityList.appendChild(listItem);
    }
  }
  