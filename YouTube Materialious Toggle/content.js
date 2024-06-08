// ==UserScript==
// @name YouTube Materialious Toggle
// @namespace ViolentMonkeyScripts
// @version 1.7
// @description Adds a button to redirect the current YouTube video to Materialious (an Invidious fork).
// @match *://www.youtube.com/*
// @grant none
// ==/UserScript==

(function () {
    'use strict';

    // Create a styled button element
    const materialiousButton = document.createElement('button');
    materialiousButton.textContent = 'Watch on Materialious';
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

    // Append the button to the body (outside the video player)
    document.body.appendChild(materialiousButton);

    // Add an event listener to the button
    materialiousButton.addEventListener('click', () => {
        const currentVideoUrl = window.location.href;
        const materialiousBaseUrl = 'https://app.materialio.us/';
        const videoId = currentVideoUrl.match(/v=([^&]+)/)[1]; // Extract video ID from YouTube URL

        // Construct the Materialious URL
        const materialiousUrl = materialiousBaseUrl + 'watch/' + videoId;

        // Redirect to Materialious
        window.location.href = materialiousUrl;
    });
})();
