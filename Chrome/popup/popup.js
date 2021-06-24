// SoTBot RAT extractor extension (background event handlers)
// (C) 2021 by Winni Neessen <wn@neessen.net>

"use strict";

document.addEventListener('readystatechange', function() {
    if(document.readyState === 'complete') {
        new ClipboardJS('.btn')
        chrome.storage.local.get(['rat'], function(ratObj) {
            let ratField = document.querySelector('#rat')
            if(typeof ratField !== 'undefined') {
                ratField.addEventListener('click', () => {
                    ratField.select()
                })
                ratField.textContent = ratObj.rat
            }

            let copyBtn = document.querySelector('#copyBtn')
            if(typeof copyBtn !== 'undefined') {
                copyBtn.addEventListener('click', () => {
                })
            }
        });
    }
})