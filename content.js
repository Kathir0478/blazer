console.log("YouTube Video Extractor Loaded!");

// Function to extract video links and titles
function getVideoLinks() {
    let videoElements = document.querySelectorAll('ytd-thumbnail a#thumbnail');
    let videoLinks = [];

    videoElements.forEach(video => {
        let url = video.href;

        // Find the closest parent containing video info
        let videoContainer = video.closest('ytd-rich-grid-media, ytd-video-renderer');

        // Try to get the title
        let titleElement = videoContainer?.querySelector('#video-title');
        let title = titleElement ? titleElement.innerText.trim() : "Unknown Title";

        if (url && title) {
            videoLinks.push({ title, url });
        }
    });

    if (videoLinks.length > 0) {
        chrome.storage.local.set({ videoData: videoLinks }, () => {
            console.log("✅ Stored Video Links:", videoLinks);
        });
    } else {
        console.log("⚠️ No videos found.");
    }
}

// Wait for videos to fully load
setTimeout(getVideoLinks, 5000);
