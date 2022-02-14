var newFilter = new Filter("materialnumber", FilterOperator.EQ, aTokens.map(function (oToken) {
    return oToken.getKey().padStart(18, "0");
}));