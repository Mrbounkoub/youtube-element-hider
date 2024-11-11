document.addEventListener('DOMContentLoaded', () => {
  const elementsToHide = [
    { id: 'hideH1', selector: 'h1.style-scope.ytd-watch-metadata' },
    { id: 'hideTitle', selector: 'title' },
    { id: 'hideTopRow', selector: '#top-row.style-scope.ytd-watch-metadata' },
    { id: 'hideSecondary', selector: '#secondary.style-scope.ytd-watch-flexy' },
    { id: 'hideContents', selector: '#contents.style-scope.ytd-rich-grid-renderer' },
    { id: 'hideBottomRow', selector: '#bottom-row.style-scope.ytd-watch-metadata' },
    { id: 'hideComments', selector: 'ytd-item-section-renderer#sections.style-scope.ytd-comments' },
  ];

  const toggleAllButton = document.getElementById('toggleAllButton');
  const checkboxes = elementsToHide.map(({ id }) => document.getElementById(id));
  let activeCount = 0;

  // Helper function to apply changes to elements
  const applyChanges = (selector, checked) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (selector, checked) => {
            const element = document.querySelector(selector);
            if (element) {
              element.style.display = checked ? 'none' : '';
            }
          },
          args: [selector, checked],
        });
      }
    });
  };

  // Function to toggle the state of all checkboxes and update UI
  const toggleAllCheckboxes = (checked) => {
    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = checked;
      const id = checkbox.id;
      chrome.storage.sync.set({ [id]: checked }, () => {
        applyChanges(elementsToHide[index].selector, checked);
      });
    });

    updateToggleAllButtonText();
    updateBadge();
  };

  // Update the button's text and color dynamically
  const updateToggleAllButtonText = () => {
    const allChecked = checkboxes.every(checkbox => checkbox.checked);
    toggleAllButton.textContent = allChecked ? 'Unhide All' : 'Hide All';
    toggleAllButton.style.backgroundColor = allChecked ? '#ff2b01' : '#1abc9c';
  };

  // Update the badge with the count of active elements
  const updateBadge = () => {
    activeCount = checkboxes.filter(checkbox => checkbox.checked).length;
    chrome.runtime.sendMessage({ action: 'updateBadge', count: activeCount });
  };

  // Initialize checkboxes based on stored state
  const initializeCheckboxes = () => {
    const storageKeys = elementsToHide.map(el => el.id);
    chrome.storage.sync.get(storageKeys, (result) => {
      elementsToHide.forEach(({ id }, index) => {
        const checkbox = checkboxes[index];
        checkbox.checked = result[id] || false;
        if (checkbox.checked) activeCount++;
      });
      updateBadge();
      updateToggleAllButtonText();
    });
  };

  // Event listener for the "Toggle All" button
  toggleAllButton.addEventListener('click', () => {
    const allChecked = checkboxes.every(checkbox => checkbox.checked);
    toggleAllCheckboxes(!allChecked); // If all are checked, uncheck them, otherwise check all
  });

  // Handle individual checkbox changes
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      const isChecked = checkbox.checked;
      const id = elementsToHide[index].id;
      chrome.storage.sync.set({ [id]: isChecked }, () => {
        applyChanges(elementsToHide[index].selector, isChecked);
        activeCount = isChecked ? activeCount + 1 : activeCount - 1;
        updateBadge();
        updateToggleAllButtonText(); // Update button state dynamically when checkboxes change
      });
    });
  });

  // Initialize checkboxes when the popup is loaded
  initializeCheckboxes();

  // Fetch and display the version from the manifest
  const versionSpan = document.querySelector('.version');
  fetch(chrome.runtime.getURL('manifest.json'))
    .then(response => response.json())
    .then(data => {
      versionSpan.textContent = `Version ${data.version}`;
    })
    .catch(error => {
      console.error('Error loading version:', error);
      versionSpan.textContent = 'Version not found';
    });
});
