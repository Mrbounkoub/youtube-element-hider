// Utility function to toggle visibility of an element
function toggleVisibility(element, stateKey) {
  if (element) {
    const currentState = element.style.display === 'none' ? 'none' : '';
    element.style.display = currentState;
    chrome.storage.local.set({ [stateKey]: currentState });
  }
}

// Function to toggle the text of the <title> element
function toggleTitle(newTitle, originalTitle) {
  const titleElement = document.querySelector('title');
  if (titleElement) {
    const currentTitle = titleElement.textContent;
    titleElement.textContent = (currentTitle === newTitle) ? originalTitle : newTitle;
    chrome.storage.local.set({ titleState: (currentTitle === newTitle) ? originalTitle : newTitle });
  }
}

// Main function to handle toggling of elements
function toggleElements() {
  const originalTitle = document.title;

  // Fetch current states from storage
  chrome.storage.local.get(['titleState', 'h1State'], (result) => {
    const titleState = result.titleState || originalTitle;
    const h1State = result.h1State || '';

    // Toggle visibility of <h1> element with specific class
    const h1Element = document.querySelector('h1.style-scope.ytd-watch-metadata');
    toggleVisibility(h1Element, 'h1State');

    // Toggle <title> text content
    toggleTitle('No Title', titleState);
  });
}

// Execute the toggle function on page load or event
toggleElements();
