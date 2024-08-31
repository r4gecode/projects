chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "readText") {
      // Extracts the visible text from the page
      const text = document.body.innerText || document.body.textContent;
      sendResponse({ text: text.trim() });
    }
  });