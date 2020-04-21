import requests 
import pymongo
from pymongo import MongoClient
client = pymongo.MongoClient("mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority")
db=client['MuseNewsDatabase']
artistsCollection = db.artists
db.list_collection_names()

for i in range(1,201):
    artist = artistsCollection.find_one({"rank": i})
    print(artist['name'] , artist['stats']['playcount'] , str(type(artist['stats']['playcount'])) , artist['stats']['listeners'] , str(type(artist['stats']['listeners'])))

    playcount = int(artist['stats']['playcount'])
    listeners = int(artist['stats']['listeners'])
    # print(playcount, type(playcount), listeners, type(listeners))
    artistsCollection.update({"rank": i}, {"$set": {"stats" : {"playcount": playcount, "listeners": listeners}}})
    artist = artistsCollection.find_one({"rank": i})
    print(artist['name'] , artist['stats']['playcount'] , str(type(artist['stats']['playcount'])) , artist['stats']['listeners'] , str(type(artist['stats']['listeners'])))

