# Core

### Bootstrap
[Load the SAPUI5 framework](src/sapui5-walkthrough/webapp/index.html#L7-L17)

### Application descriptor (Manifest)
1. [Define application id](src/sapui5-walkthrough/webapp/manifest.json#L4) - mandatory / must be unique for same launchpad
2. [Define application title and description](src/sapui5-walkthrough/webapp/manifest.json#L6-L8)
3. [Define root view](src/sapui5-walkthrough/webapp/manifest.json#L22-L27)
4. [Define models](src/sapui5-walkthrough/webapp/manifest.json#L38-L49)
5. [Define routing (in-app navigation) properties](src/sapui5-walkthrough/webapp/manifest.json#L50-L78)
6. [Define resource files](src/sapui5-walkthrough/webapp/manifest.json#L79-L83)

### Component
1. [Define application metadata](src/sapui5-walkthrough/webapp/Component.js#L11-L13) - e.g. app descriptor file
2. [Call overridden init function of base component](src/sapui5-walkthrough/webapp/Component.js#L17) - obligatory
3. [Set models or other application defaults](src/sapui5-walkthrough/webapp/Component.js#L20-L26)

### Custom CSS
1. [Create CSS to be used](src/sapui5-walkthrough/webapp/css/style.css)
2. [Introduce CSS file as a resource](src/sapui5-walkthrough/webapp/manifest.json#L80-L82)
3. [Set class attribute of control with custom CSS class](src/sapui5-walkthrough/webapp/view/App.view.xml#L8)

# Model

### JSON (Dynamic instantiation)
1. [Load module](src/sapui5-walkthrough/webapp/Component.js#L3) [into controller](src/sapui5-walkthrough/webapp/Component.js#L6)
2. [Create new JSON data](src/sapui5-walkthrough/webapp/Component.js#L20-L24)
3. [Create model object](src/sapui5-walkthrough/webapp/Component.js#L25)
4. [Set JSON data into model object](src/sapui5-walkthrough/webapp/Component.js#L26)
5. [Bind model property in view](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L23)
6. [Set compatibility version to allow complex binding](src/sapui5-walkthrough/webapp/index.html#L15) - to mix constant values and multiple binding paths like:
   ```
   description="Hello {/recipient/name}"
   ```

### Internationalization (i18n)
1. [Define text id and actual text in i18n.properties file](src/sapui5-walkthrough/webapp/i18n/i18n.properties#L7) - use {i} as placeholders
2. [Define resource model path in app descriptor](src/sapui5-walkthrough/webapp/manifest.json#L39-L44)
3. Access text in controller
    1. [Get resource bundle object](src/sapui5-walkthrough/webapp/controller/HelloPanel.controller.js#L11)
    2. [Get text string](src/sapui5-walkthrough/webapp/controller/HelloPanel.controller.js#L13)  
OR  
4. Access text in view
    1. [Bind text path](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L15)

# Controls

## Action

### Button (Static)
1. [Set icon](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L14)
2. [Set text](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L15)
3. [Set click handler](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L16)
4. [Define click handler function](src/sapui5-walkthrough/webapp/controller/HelloPanel.controller.js#L19-L21)

## Container

### Page
1. [Set page](src/sapui5-walkthrough/webapp/view/Overview.view.xml#L5-L15)
2. [Set header content](src/sapui5-walkthrough/webapp/view/Overview.view.xml#L6-L10)
3. [Set main content](src/sapui5-walkthrough/webapp/view/Overview.view.xml#L11-L14) - aggregation

### Panel
1. [Set panel](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L5-L30)
2. [Set header text](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L6)
3. [Set CSS width](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L8)
4. [Set expandable/collapsible](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L9)
5. [Set expanded state](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L10)

## Popup

### Dialog (in reusable fragment)
1. [Create fragment](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml)
2. [Set dialog control](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L4-L18)
3. [Set title](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L6)
4. [Set content](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L7-L14)
5. [Define close button](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L13-L17)
6. [Set close handler](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L16)
7. [Create a separate controller for dialog](src/sapui5-walkthrough/webapp/controller/HelloDialog.js) - to make it reusable across views
8. [Define close handler function](src/sapui5-walkthrough/webapp/controller/HelloDialog.js#L24-L26)
9. [Load new controller](src/sapui5-walkthrough/webapp/Component.js#L4) [into component](src/sapui5-walkthrough/webapp/Component.js#L6)
10. [Initialize dialog on application start](src/sapui5-walkthrough/webapp/Component.js#L34)
11. [Define open handler function](src/sapui5-walkthrough/webapp/Component.js#L44-L46)
12. [Open dialog in any controller](src/sapui5-walkthrough/webapp/controller/App.controller.js#L12)
13. [Destroy dialog on application exit](src/sapui5-walkthrough/webapp/Component.js#L40-L41)

### Message Toast
1. [Load module into controller](src/sapui5-walkthrough/webapp/controller/HelloPanel.controller.js#L3-L4)
2. [Display message](src/sapui5-walkthrough/webapp/controller/HelloPanel.controller.js#L16)

## User Input

### Input (Static)
1. [Set value binding](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L23)
2. [Set binding update trigger](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L24)
3. [Set layout width](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L25)