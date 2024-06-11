// Function to toggle the visibility of the specified element
function toggleVisibility(selector) {
  const element = document.querySelector(selector);
  if (element) {
    if (element.style.display === 'none') {
      element.style.display = '';
    } else {
      element.style.display = 'none';
    }
  }
}

// Function to toggle the text of the <title> element
function toggleTitle(newTitle, originalTitle) {
  const titleElement = document.querySelector('title');
  if (titleElement) {
    if (titleElement.textContent === newTitle) {
      titleElement.textContent = originalTitle;
    } else {
      titleElement.textContent = newTitle;
    }
  }
}

// Main function to handle toggling
function toggleElements() {
  const originalTitle = document.title;

  chrome.storage.local.get(['titleState', 'h1State'], (result) => {
    const titleState = result.titleState || originalTitle;
    const h1State = result.h1State || '';

    // Toggle the visibility of the <h1> element with the class "style-scope ytd-watch-metadata"
    const h1Element = document.querySelector('h1.style-scope.ytd-watch-metadata');
    if (h1Element) {
      if (h1Element.style.display === 'none') {
        h1Element.style.display = '';
        chrome.storage.local.set({ h1State: '' });
      } else {
        h1Element.style.display = 'none';
        chrome.storage.local.set({ h1State: 'none' });
      }
    }

    // Toggle the <title> element text
    const titleElement = document.querySelector('title');
    if (titleElement) {
      if (titleElement.textContent === 'No Title') {
        titleElement.textContent = titleState;
        chrome.storage.local.set({ titleState: originalTitle });
      } else {
        titleElement.textContent = 'No Title';
        chrome.storage.local.set({ titleState: originalTitle });
      }
    }
  });
}

// Execute the toggle function
toggleElements();
