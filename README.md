# Zoom For Yunus

A Chrome extension designed to help sight-challenged users on the web. Inspired by this persona, https://www.w3.org/WAI/intro/people-use-web/stories#retiree. The intent behind this project is to create a localized area of zoom around the current location of the user's mouse cursor. The zoomed items would return to normal size once the mouse had moved a significant distance away.

## Structure
1. Uses NPM to manage packages and dependencies. To get your project rolling enter the ```npm install``` command in the top level project directory.
2. Gulp is used for project builds http://gulpjs.com/.
3. Testing is done using QUnit https://qunitjs.com/. 
4. In order to get rolling on development enter the ```gulp develop``` command in your top level directory. This will start a job that will lint your project and run the unit tests on project save.
5. Find instructions here on how to get a custom extension running in your browser