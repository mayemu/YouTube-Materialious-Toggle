// ==UserScript==
// @name YouTube Instance Redirect
// @namespace ViolentMonkeyScripts
// @version 1.7
// @description Adds a button to redirect the current YouTube video to a chosen instance (Invidious fork).
// @match *://www.youtube.com/*
// @grant none
// ==/UserScript==

(function () {
    'use strict';

    function addMaterialiousButton(instanceUrl) {
        // Create a styled button element
        const materialiousButton = document.createElement('button');
        materialiousButton.id = 'materialiousButton'; // Add an ID to the button
        materialiousButton.textContent = 'Watch on Selected Instance';
        materialiousButton.style.backgroundColor = '#333'; // Dark gray to match YouTube's dark mode
        materialiousButton.style.color = '#FFF'; // White text
        materialiousButton.style.border = 'none';
        materialiousButton.style.borderRadius = '20px'; // Increase border radius for curved corners
        materialiousButton.style.padding = '6px 10px'; // Smaller button size
        materialiousButton.style.fontFamily = 'Lucida Sans Unicode, sans-serif'; // Use Lucida Sans Unicode font
        materialiousButton.style.fontSize = '12px'; // Font size
        materialiousButton.style.position = 'fixed';
        materialiousButton.style.bottom = '20px'; // Adjust the distance from the bottom
        materialiousButton.style.right = '20px'; // Position in the bottom right corner
        materialiousButton.style.zIndex = '9999'; // Ensure it's above other elements
        materialiousButton.style.cursor = 'pointer'; // Add hover effect

        // Add hover effect to change cursor
        materialiousButton.addEventListener('mouseenter', () => {
            materialiousButton.style.cursor = 'pointer';
        });

        // Add an event listener to the button
        materialiousButton.addEventListener('click', () => {
            const currentVideoUrl = window.location.href;
            const videoId = currentVideoUrl.match(/v=([^&]+)/)[1]; // Extract video ID from YouTube URL

            // Construct the new instance URL
            const newInstanceUrl = instanceUrl + 'watch/' + videoId;

            // Redirect to the new instance
            window.location.href = newInstanceUrl;
        });

        // Append the button to the body (outside the video player)
        document.body.appendChild(materialiousButton);
    }

    function removeMaterialiousButton() {
        const existingButton = document.getElementById('materialiousButton');
        if (existingButton) {
            existingButton.remove();
        }
    }

    function checkPage(instanceUrl) {
        const currentVideoUrl = window.location.href;
        const isVideoPage = currentVideoUrl.includes('watch?v=');

        if (isVideoPage) {
            if (!document.getElementById('materialiousButton')) {
                addMaterialiousButton(instanceUrl);
            }
        } else {
            removeMaterialiousButton();
        }
    }

    // Retrieve the saved instance from storage and initialize the button
    chrome.storage.local.get('selectedInstance', function(data) {
        const instanceUrl = data.selectedInstance || 'https://app.materialio.us/'; // Default to Materialious if not set
        checkPage(instanceUrl);

        // Observe URL changes to handle navigation within the site
        const observer = new MutationObserver(() => checkPage(instanceUrl));
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
