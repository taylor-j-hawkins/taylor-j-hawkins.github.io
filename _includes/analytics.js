// Check if the user has previously interacted with the banner and consented
const userConsentedToAnalytics = storageType.getItem("GA") === "true"; // Set the user consent status

// Check if user consented to Google Analytics and load it if consented
if (userConsentedToAnalytics) {
    loadGoogleAnalytics(); // Function to load Google Analytics
}

function loadGoogleAnalytics() {
    // Replace this with your actual Google Analytics tracking code
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'G-P1F4L0XWG5', 'auto');
    ga('send', 'pageview');
}

window.addEventListener("storage", (event) => {
    if (event.key === "GA" && event.newValue === "true") {
        loadGoogleAnalytics();
    }
});

