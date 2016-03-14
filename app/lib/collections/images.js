var imageStore = new FS.Store.FileSystem("images", {
    //path: "/Users/Sy/Documents/GitHub/carbon/app/public/images/trees", //optional, default is "/cfs/files" path within app container
    //transformWrite: myTransformWriteFunction, //optional
    //transformRead: myTransformReadFunction, //optional
    maxTries: 1 //optional, default 5
});

Images = new FS.Collection("images", {
    stores: [imageStore]
});