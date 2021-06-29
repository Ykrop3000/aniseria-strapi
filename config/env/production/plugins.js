module.exports = {
  upload: {
    provider: "google-cloud-storage",
    providerOptions: {
      bucketName: "atrapi",
      publicFiles: true,
      uniform: true,
      basePath: ""
    }
  }
  //...
};
