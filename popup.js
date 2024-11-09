document.getElementById('toggleButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggleElements' });
  });
  