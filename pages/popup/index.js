'use strict';
chrome.runtime.getBackgroundPage((bgWindow) => {
    console.log(bgWindow);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var { title, url } = tabs[0];

        copyUrl.onclick = (_) => {
            bgWindow.copyUrl(url);
            window.close();
        };
        copyUrlWithTitle.onclick = (_) => {
            bgWindow.copyUrlWithTitle(title, url);
            window.close();
        };
        copyUrlAsLinkedText.onclick = (_) => {
            bgWindow.copyUrlAsLinkedText(title, url);
            window.close();
        };
    });
});

const textElements = document.querySelectorAll('[data-localize]');
textElements.forEach((e) => {
    const ref = e.dataset.localize;
    if (ref) {
        const translated= ref.replace(/__MSG_(\w+)__/g, (match, theGroup) => chrome.i18n.getMessage(theGroup));
        if (translated) {
            e.innerText = translated;
        }
    }
});

