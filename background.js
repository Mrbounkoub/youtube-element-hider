chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("youtube.com")) {
    // Only execute the script if not already executed (e.g., already on YouTube)
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["popup.js"]
    });

    // Update Badge once, avoid redundant calls
    updateBadge('✓', '#27a34f', '#FFFFFF');
    animateIcon();

    // Clear badge text after a short delay
    setTimeout(() => {
      updateBadge('', '', '');
    }, 1000);
  }
});

// Function to update the badge
function updateBadge(text, backgroundColor, textColor) {
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color: backgroundColor });
  chrome.action.setBadgeTextColor({ color: textColor });
}

// Function to animate the icon
function animateIcon() {
  chrome.action.setIcon({ path: 'images/icon-animated.gif' });
  setTimeout(() => {
    chrome.action.setIcon({ path: 'images/icon48.png' });
  }, 1000);
}

// Listen for messages from the popup (e.g., for badge updates)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'updateBadge':
      const count = message.count;
      if (count > 0) {
        updateBadge(count.toString(), '#FF0000', '#FFFFFF');
      } else {
        updateBadge('', '', '');
      }
      break;
    case 'resetCheckboxes':
      // Clear storage for checkboxes when reset is triggered
      chrome.storage.sync.clear();
      break;
  }
});

// Listen for tab updates to reset checkboxes when navigating to YouTube
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes("youtube.com")) {
    chrome.runtime.sendMessage({ action: 'resetCheckboxes' });
    chrome.runtime.sendMessage('reloadPopup');
  }
});
