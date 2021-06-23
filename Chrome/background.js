// SoTBot RAT extractor extension (background event handlers)
// (C) 2021 by Winni Neessen <wn@neessen.net>

"use strict";

chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tabInfo) => {
        const isSoT = tabInfo.url.startsWith('https://www.seaofthieves.com/');
        if(isSoT) {
            chrome.action.enable(tabId)
            chrome.action.setIcon({path: 'img/active_128.png', tabId: tabId})
            chrome.cookies.get({url: 'https://www.seaofthieves.com', name: 'rat'}, async cookieInfo => {
                if(cookieInfo.value !== '') {
                    let responseCookie = {
                        Value: cookieInfo.value,
                        Expiration: Math.floor(cookieInfo.expirationDate)
                    }
                    let cookieJSON = JSON.stringify(responseCookie)
                    let cookieBase64 = btoa(cookieJSON)
                    chrome.storage.local.set({rat: cookieBase64}, function() {});
                }
            })
        }
        else {
            chrome.action.disable(tabId)
        }
    })
})


