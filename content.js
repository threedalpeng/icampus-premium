function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    });
}

async function getWhenExists(selector) {
    return new Promise(resolve => {
        while(!$(selector).length)
            await sleep(100);
        
        resolve($(selector)[0]);
    });
}

$(async () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type == 'attributes' ||
                $(video).attr('src').includes('/settings/viewer/uniplayer/')) {
                video.currentTime = video.duration;
            }
        });
    });

    const video = await getWhenExists('video.vc-vplay-video1');
    const config = { attributes: true };
    observer.observe(video, config);
});

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting == "hello")
//         sendResponse({farewell: "goodbye"});
//     }
// );