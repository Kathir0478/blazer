console.log("YouTube Video Extractor Loaded!");

// Function to extract video titles and links dynamically
function extractVideos() {
    let videoElements = document.querySelectorAll('ytd-thumbnail a#thumbnail');
    let videoLinks = [];

    videoElements.forEach(video => {
        let url = video.href;

        // Find the closest container that holds the video title
        let videoContainer = video.closest('ytd-rich-grid-media, ytd-video-renderer');

        // Extract the title
        let titleElement = videoContainer?.querySelector('#video-title');
        let title = titleElement ? titleElement.innerText.trim() : "Unknown Title";

        if (url && title) {
            videoLinks.push({ title, url });
        }
    });

    if (videoLinks.length > 0) {
        chrome.storage.local.set({ videoData: videoLinks }, () => {
            console.log("✅ Updated Video Links:", videoLinks);
        });
    }
}

// Set up a MutationObserver to detect when new videos load
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
            extractVideos();  // Extract videos dynamically when new elements are added
        }
    });
});

// Start observing the main content section for changes
const targetNode = document.querySelector('ytd-page-manager');
if (targetNode) {
    observer.observe(targetNode, { childList: true, subtree: true });
    console.log("🔍 Observer started: Watching for new videos...");
}

// Run the function once on initial load
extractVideos();
