#This script fixes the playcount and listeners fields in a mongodb collection. It was used for both the songs and artists model.

import requests 
import pymongo
from pymongo import MongoClient
client = pymongo.MongoClient("mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority")
db=client['MuseNewsDatabase']
artistsCollection = db.songs
db.list_collection_names()

for i in range(1,304):
    artist = artistsCollection.find_one({"rank": i})
    print(artist['name'] , artist['playcount'] , str(type(artist['playcount'])) , artist['listeners'] , str(type(artist['listeners'])))

    playcount = int(artist['playcount'])
    listeners = int(artist['listeners'])
    artistsCollection.update({"rank": i}, {"$set": {"playcount": playcount, "listeners": listeners}})
    artist = artistsCollection.find_one({"rank": i})
    print(artist['name'] , artist['playcount'] , str(type(artist['playcount'])) , artist['listeners'] , str(type(artist['listeners'])))

