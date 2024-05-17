# Website Tracker Chrome Extension

The **Website Tracker** Chrome extension helps you monitor and manage your web browsing habits by tracking the time spent on each website. Additionally, it provides analytics in the form of graphs and charts, allowing you to visualize your usage patterns.

![The "Website Tracker" Chrome extension helps you monitor and manage your web browsing habits by tracking the time spent on each website. Additionally, it provides analytics in the form of graphs and charts, allowing you to visualize your usage patterns.](assets/video/popup.gif)
![The "Website Tracker" Chrome extension helps you monitor and manage your web browsing habits by tracking the time spent on each website. Additionally, it provides analytics in the form of graphs and charts, allowing you to visualize your usage patterns.](assets/video/graph.gif)


## Features

- **Real-time Tracking:** Tracks the websites you are currently using in real-time.
- **Popup Analytics:** Clicking on the extension icon opens a popup displaying the time spent on the currently open website.
- **Daily and Monthly Analytics:** View detailed analytics of your website usage on a daily and monthly basis.
- **Pie Chart:** Provides a pie chart summarizing the overall distribution of your time spent on different websites.
- **You can limit the website usage to:**
  - **None:** No limitations on website usage.
  - **Ignore:** Ignores tracking for specified websites.
  - **Time Limit:** Sets a daily time limit for specific websites. Exceeding the limit may block the website for the remainder of the day.
  - **Block:** Blocks access to specified websites.


## Installation

To install the extension, follow these steps:

1. Clone the repository to your local machine:

   ````bash
   git clone [https://github.com/YeshwanthValishetti20/webactivity.git]
   ````

2. Open Chrome and navigate to chrome://extensions/.

3. Enable "Developer mode" in the top right corner.

4. Click on "Load unpacked" and select the directory where you cloned the extension repository.

5. The extension will be added to Chrome, and you can start using it immediately.

## Usage

1. Install the extension.
2. Click on the extension icon to access the popup with real-time analytics.
3. Explore the daily and monthly graphs to understand your browsing habits.
4. Set limitations or blocks for specific websites through the extension settings.

## Technology Used

This Chrome extension leverages a stack of technologies, with a primary focus on JavaScript:

- **JavaScript**: The core programming language driving the dynamic behavior and functionality of the extension.

- **HTML**: Used for structuring the content and defining the basic layout of the extension.

- **CSS**: Employed for styling and presentation, ensuring a visually pleasing and consistent user interface.

- **Bootstrap**: Integrated to enhance the design and responsiveness of the extension's UI components.

- **Chart.js**: Utilized for creating interactive and visually appealing charts within the extension.

- **Chrome Storage (chrome.storage.local)**: Incorporated to manage local storage, enabling the extension to persistently store and retrieve data.
