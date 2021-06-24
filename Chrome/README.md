# SoTBot RAT Token - Chrome Extension
The webpage of the game Sea of Thieves (SoT) exposes a nice REST-API for gathering stats about your profile, for example
collected gold or sailed miles. Interaction with it is only possible by using a remote access token (RAT). The RAT is a
JWT token obtained after a login to Microsoft Live during an OAuth code flow. It is stored in your browser as a cookie
and should be valid for 14 days.

This browser extension makes it easy to extract the required token. Simply install the extension, log into the
SoT website and click on the extension icon. It will extract your cookie and the expiration date and convert it into
a format that the SoTBot Discord bot can understand. By clicking the "Copy to clipboard" button, the token is copied
to your systems clipboard, so you can simply paste it into the `/setrat` command of the SoTBot.

## Security warning
Allowing a 3rd party browser extension access to your seaofthives.com RAT cookie is dangerous. Even if you do,
credentials should be handled very carefully and not be stored in the browsers local stoage. 

Use this extension as an example on how to extract your RAT cookie on your own. If you still want to use this code, use
it at your own risk. Binary builds are for the authors own use and shouldn't be trusted.

To the authors knowledge, the RAT is not easily revokable and gives full access to your account on seaofthieves.com 
until it expires.

## Usage
### Developer mode
To use this extension, you need to enable the "Developer mode" in your Chrome browser. To do so, follow these 
instructions:
* Click the little "burger" menu button in your Chrome browser
* Click on `More tools` followed by a click on `Extensions`
* Locate the `Developer mode` button in the upper right corner and activate it

### Installation
Once the `Developer mode` is enable, you can install the extension. To do so, follow these instructions:
* Download the extension's sources from Github
* In the same `Extensions` screen as before, locate the `Load unpacked` button in the upper left of the screen
* Click the button. A file dialog will open. Point the browser to the `Chrome` directory of the extension sources
Once completed, the extension is installed and a little SoT-icon should show up in the extensions bar of your browser