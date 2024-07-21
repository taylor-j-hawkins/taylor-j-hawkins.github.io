(function() {
    const interactedWithCookiesBanner = "interacted_with_cookies_banner";
    const storageType = localStorage;
    const cookieContainerId = "cookieContainer";
    
    window.cookiesAcceptDefaultFn = () => {
        const cookieContainer = document.getElementById(cookieContainerId);
        cookieContainer.classList.add("hidden");
        window.setTimeout(cookieContainer.remove.bind(cookieContainer), 1000);
        storageType.setItem(interactedWithCookiesBanner, true);
        storageType.setItem("GA", true);
    };

    window.cookiesDisagreeDefaultFn = () => {
        const cookieContainer = document.getElementById(cookieContainerId);
        cookieContainer.classList.add("hidden");
        window.setTimeout(cookieContainer.remove.bind(cookieContainer), 1000);
        storageType.setItem(interactedWithCookiesBanner, true);
        window.location = "{{ "/cookies" | relative_url }}";
    };

    window.addEventListener("load", () => {
        if(storageType.getItem(interactedWithCookiesBanner) === "true" || window.location.href.indexOf("cookies") !== -1) {
            return;
        }
        const cookieContainer = document.createElement("div");
        cookieContainer.setAttribute("id", cookieContainerId);
        cookieContainer.classList.add("hidden");
    
        const cookieHeader = document.createElement("h2");
        const cookieHeaderContent = document.createTextNode("{{ site.data.metaData.cookies.header }}");
    
        const cookieParagraph = document.createElement("p");
        const cookieParagraphContent = document.createTextNode("{{ site.data.metaData.cookies.message }}");
    
        const cookieButtonsContainer = document.createElement("div");
        cookieButtonsContainer.classList.add("cookie-container--buttons");
    
        const cookieAgreeButton = document.createElement("button");
        const cookieButtonContent = document.createTextNode("{{ site.data.metaData.cookies.agreeButtonText }}");
        cookieAgreeButton.appendChild(cookieButtonContent);
        eval("cookieAgreeButton.onclick = cookiesAcceptDefaultFn;");
    
        const cookieButtonDisagree = document.createElement("button");
        const cookieButtonDisagreeContent = document.createTextNode("{{ site.data.metaData.cookies.disagreeButtonText }}");
        cookieButtonDisagree.append(cookieButtonDisagreeContent);
        eval("cookieButtonDisagree.onclick = cookiesDisagreeDefaultFn;");
    
        cookieHeader.append(cookieHeaderContent);
        cookieParagraph.append(cookieParagraphContent);
        cookieButtonsContainer.append(cookieAgreeButton, cookieButtonDisagree)
        cookieContainer.append(cookieHeader, cookieParagraph, cookieButtonsContainer);
        cookieContainer.classList.add("cookie-container")
        document.body.appendChild(cookieContainer);
        window.setTimeout(() => cookieContainer.classList.remove("hidden"));
    });
})();
