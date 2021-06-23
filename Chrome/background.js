// SoTBot RAT extractor extension (background event handlers)
// (C) 2021 by Winni Neessen <wn@neessen.net>

"use strict";

chrome.runtime.onInstalled.addListener(function() {
    chrome.webRequest.onCompleted.addListener(async reqInfo => {
        const isSoT = reqInfo.url.startsWith('https://www.seaofthieves.com/');
        if(isSoT && reqInfo.type === 'main_frame') {
            chrome.action.setIcon({path: 'img/active_128.png', tabId: reqInfo.tabId})
            chrome.cookies.get({url: 'https://www.seaofthieves.com', name: 'rat'}, async cookieInfo => {
                if(cookieInfo.value !== '') {
                    let responseCookie = {
                        Value: cookieInfo.value,
                        Expiration: Math.floor(cookieInfo.expirationDate)
                    }
                    let cookieJSON = JSON.stringify(responseCookie)
                    let cookieBase64 = btoa(cookieJSON)
                    console.log(`Your RAT cookie string: ${cookieBase64}`)
                    chrome.storage.local.set({rat: cookieBase64}, function() {});
                }
            })
        }
    }, {urls: ["<all_urls>"]})
})

