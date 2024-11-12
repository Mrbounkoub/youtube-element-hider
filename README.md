# YouTube Element Hider

![Extension Icon](images/icon_128.png)

## `Yeh! Focus` Extension

The `Yeh! Focus` file allows users to toggle specific YouTube elements such as the sidebar, comments, and other sections. Here's a breakdown:

- **Event Listeners**: 
  - A button toggle for hiding all elements (`toggleAllButton`).
  - Individual checkboxes for hiding specific elements like the sidebar, comments, etc.
  
- **Storage and UI Updates**: 
  - The extension saves the user’s choices using `chrome.storage.sync` to persist settings across sessions.
  - The `toggleAllButton` dynamically changes text and color based on whether all elements are hidden or visible.

- **Element Hiding**: 
  - JavaScript uses `chrome.scripting.executeScript` to hide or show elements on YouTube based on user preferences.
  
- **Badge Count**: 
  - Updates the extension’s badge to reflect the number of active hidden elements.

- **Version Info**: 
  - Displays the current extension version in the popup.

---

## Version
Current Version: `1.3.0`  
_Fetches and displays the version from `manifest.json`._

![Footer Logo](images/logo-badge.png)

This code offers an interactive and customizable way to hide YouTube elements directly from the extension’s popup.
