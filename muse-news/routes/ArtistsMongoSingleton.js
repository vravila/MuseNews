var ArtistsMongoSingleton = (function () {
  var instance;

  async function createInstance() {
    const dbName = "MuseNewsDatabase";
    const collectionName = "artists";
    const MongoClient = require("mongodb").MongoClient;
    const uri =
      "mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri, { useNewUrlParser: true });
    const collection = client.db(dbName).collection(collectionName);
    return collection;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

module.exports = ArtistsMongoSingleton;
