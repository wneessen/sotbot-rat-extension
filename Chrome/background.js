// SoTBot RAT extractor extension (background event handlers)
// (C) 2021 by Winni Neessen <wn@neessen.net>

"use strict";

chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.onUpdated.addListener(async(tabId, changeInfo, tabInfo) => {
        const isSoT = tabInfo.url.startsWith('https://www.seaofthieves.com/');
        if(isSoT) {
            EnableApp(tabInfo.tabId)
        } else {
            DisableApp(tabInfo.tabId)
        }
    })
    chrome.tabs.onActivated.addListener(async(tabInfo) => {
        const curTab = await getCurrentTab()
        if(typeof curTab === 'undefined') {
            console.warn('Unable to query active tab')
            return
        }
        const isSoT = curTab.url.startsWith('https://www.seaofthieves.com/');
        if(isSoT) {
            EnableApp(tabInfo.tabId)
        } else {
            DisableApp(tabInfo.tabId)
        }
    })

    // Enable the action in the browser
    async function EnableApp(tabId) {
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
                chrome.storage.local.set({rat: cookieBase64}, function() {
                });
            }
        })
    }

    // Disable the action in the browser
    async function DisableApp(tabId) {
        chrome.action.disable(tabId)
        chrome.storage.local.set({rat: ''}, function() {
        });
    }

    // Get the currently active tab
    async function getCurrentTab() {
        await delay(300)
        let queryOptions = {active: true, currentWindow: true};
        const tabs = await chrome.tabs.query(queryOptions)
        if(!tabs.length) {
            console.error("No active tabs found")
        }
        return tabs[0]
    }

    // Workaround for the freaking bug(feature), when tab data is not ready, yet
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})

