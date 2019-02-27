# Core

## Bootstrap
[Load the SAPUI5 framework](src/sapui5-walkthrough/webapp/index.html#L7-L17)

# Model

## JSON
1. [Load module](src/sapui5-walkthrough/webapp/Component.js#L3) [into controller](src/sapui5-walkthrough/webapp/Component.js#L6)
2. [Create new JSON data](src/sapui5-walkthrough/webapp/Component.js#L20-L24)
3. [Create model object](src/sapui5-walkthrough/webapp/Component.js#L25)
4. [Set JSON data into model object](src/sapui5-walkthrough/webapp/Component.js#L26)
5. [Bind model property in view](src/sapui5-walkthrough/webapp/view/HelloPanel.view.xml#L23)
6. [Set compatibility version to allow complex binding](src/sapui5-walkthrough/webapp/index.html#L15) - e.g. mixing constant values and multiple binding paths like:
   ```
   description="Hello {/recipient/name}"
   ```

# Controls

## Message Toast
1. [Load module into controller](src/sapui5-walkthrough/webapp/controller/HelloPanel.controller.js#L3-L4)
2. [Display message](src/sapui5-walkthrough/webapp/controller/HelloPanel.controller.js#L16)