onAfterRendering: function(){
    var iHeight = $(window).height() - 400;
    this.byId("wizardNavContainer").setHeight(iHeight + "px");
},