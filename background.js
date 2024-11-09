chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("youtube.com")) {
    // Execute the content script on the YouTube page
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["contentScript.js"]
    });

    // Change the badge text to indicate action (e.g., '✓' for success)
    chrome.action.setBadgeText({ text: '✓' });
    chrome.action.setBadgeBackgroundColor({ color: '#00FF00' });  // Green background for success
    
    // Animate the icon (temporary change to an animated icon)
    animateIcon();

    // Reset the badge after 1 second
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '' });  // Clear the badge text after 1 second
    }, 1000);
  }
});

// Function to animate the extension icon (use a GIF or change the icon temporarily)
function animateIcon() {
  chrome.action.setIcon({ path: 'images/icon-animated.gif' });  // Use an animated GIF for the icon
  setTimeout(() => {
    chrome.action.setIcon({ path: 'images/icon48.png' });  // Reset the icon to default after 1 second
  }, 1000);  // Reset after 1 second
}
