chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed and Running!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "saveData") {
        chrome.storage.local.set({ userPreferences: message.data }, () => {
            console.log("Data saved:", message.data);
            sendResponse({ status: "success" });
        });
        return true; // Required for async response
    }
});
