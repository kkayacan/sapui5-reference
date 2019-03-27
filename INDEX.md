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

### Routing (In app navigation)
1. Set routing [configuration](src/sapui5-walkthrough/webapp/manifest.json#L51-L58), [routes](src/sapui5-walkthrough/webapp/manifest.json#L59-L67) and [targets](src/sapui5-walkthrough/webapp/manifest.json#L68-L77) in manifest
2. [Add parameter path](src/sapui5-walkthrough/webapp/manifest.json#L64) if data is passed accross views. Format is "/{parameterName}".
2. [Initialize router](src/sapui5-walkthrough/webapp/Component.js#L36) in component
3. [Get router object](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L33)
4. [Set parameter](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L33) and [navigate to a router](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L34-L36)
5. In next controller, [attach PatternMatched event handler to the route](src/sapui5-walkthrough/webapp/controller/Detail.controller.js#L18-L19)
6. [Get value of passed parameter](src/sapui5-walkthrough/webapp/controller/Detail.controller.js#L25) in PatternMatched event handler

### Route back
1. [Add navigation button to page](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L8)
2. [Set handler for navigation button](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L9)
3. [Load history module](src/sapui5-walkthrough/webapp/controller/Detail.controller.js#L3) [into controller](src/sapui5-walkthrough/webapp/controller/Detail.controller.js#L7)
4. [Define navigation button handler](src/sapui5-walkthrough/webapp/controller/Detail.controller.js#L30-L40)

### Custom CSS
1. [Create CSS to be used](src/sapui5-walkthrough/webapp/css/style.css)
2. [Introduce CSS file as a resource](src/sapui5-walkthrough/webapp/manifest.json#L80-L82)
3. [Set class attribute of control with custom CSS class](src/sapui5-walkthrough/webapp/view/App.view.xml#L8)

### Custom control
1. [Create control](src/sapui5-walkthrough/webapp/control/ProductRating.js) with init, renderer and other required functions
2. [Load custom control library](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L5) into view
3. [Place custom control](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L27-L30) in view
4. [Set handler for fired custom event](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L30)
5. [Define event handler function of custom event](src/sapui5-walkthrough/webapp/controller/Detail.controller.js#L42-L47)

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

# Data Binding

### Aggregation binding
1. [Place parent control](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L5-L74)
2. [Set absolute path of aggregation items](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L10)
3. [Set sorting and grouping](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L11-L14)
4. [Place control aggregation](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L49-L73)
5. [Set relative path of item property](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L57)

### Currency
1. [Set value and currency key paths](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L63)
2. [Set number type as currency](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L64)
3. [Set format options](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L65-67)

### Custom formatter
1. [Define formatter function](src/sapui5-walkthrough/webapp/model/formatter.js#L4-L16)
2. [Load module](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L4) [into controller](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L7)
3. [Set formatter module to a controller property](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L10)
4. [Call formatter function in XML view](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L58)

### Expression binding
[Write JavaScript code in XML view with equals sign](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L70)

### Filter (Dynamic)
1. [Set id of aggregation parent](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L6)
2. [Load modules into controller](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L5-L7)
3. [Create an array of filter objects](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L23)
4. [Get binding object of aggregation](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L27-L28)
5. [Set filter array into binding object](src/sapui5-walkthrough/webapp/controller/InvoiceList.controller.js#L29)

### Sort & Group
1. [Add sorter object to aggregation binding](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L11-L14)
2. [Set relative sorting path](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L12)
3. [Set group to true](src/sapui5-walkthrough/webapp/view/InvoiceList.view.xml#L13) - if grouping required

# Controls

## Action

### Button (Static)
1. [Set icon](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L14)
2. [Set text](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L15)
3. [Set click handler](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L16)
4. [Define click handler function](src/sapui5-walkthrough/webapp/controller/HelloPanel.controller.js#L19-L21)

## Container

### Page
1. [Place page control](src/sapui5-walkthrough/webapp/view/Overview.view.xml#L5-L15)
2. [Set header content](src/sapui5-walkthrough/webapp/view/Overview.view.xml#L6-L10)
3. [Set main content](src/sapui5-walkthrough/webapp/view/Overview.view.xml#L11-L14) - aggregation

### Panel
1. [Place panel control](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L5-L30)
2. [Set header text](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L6)
3. [Set CSS width](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L8)
4. [Set expandable/collapsible](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L9)
5. [Set initial expanded state](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L10)

## Display

### Icon (static)
1. [Load core library](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L3)
2. [Place icon control](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L8-L11)
3. [Set icon image](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L9) - Browse [icon gallery](https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html)
4. [Set CSS font-size](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L10)

### ObjectHeader (static)
1. [Place control](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L10-L26)
2. [Set number and unit](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L13-L14)
3. [Set title](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L16)
4. [Set attributes](src/sapui5-walkthrough/webapp/view/Detail.view.xml#L17-L25)

## Popup

### Dialog (in reusable fragment)
1. [Create fragment](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml)
2. [Place dialog control](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L4-L18)
3. [Set title](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L6)
4. [Set content](src/sapui5-walkthrough/webapp/view/HelloDialog.fragment.xml#L7-L12)
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