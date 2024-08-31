document.getElementById('readButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      
      // Check if the content script is already injected
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ['content.js']
        },
        () => {
          // Send the message to the content script after ensuring it's injected
          chrome.tabs.sendMessage(tabId, { action: "readText" }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error:", chrome.runtime.lastError.message);
            } else if (response && response.text) {
              readAloud(response.text);
            } else {
              console.error("No response received or no text to read.");
            }
          });
        }
      );
    });
  });
  
  document.getElementById('stopButton').addEventListener('click', stopReading);
  
  let speechSynthesisUtterance;
  
  function readAloud(text) {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Stop any ongoing speech before starting a new one
    }
    speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    speechSynthesisUtterance.rate = 1; // Adjust this value to change the reading speed
    speechSynthesis.speak(speechSynthesisUtterance);
  }
  
  function stopReading() {
    speechSynthesis.cancel(); // Stop the ongoing speech
  }