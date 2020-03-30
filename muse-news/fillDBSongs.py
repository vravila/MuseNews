import requests 
import pymongo
from pymongo import MongoClient
client = pymongo.MongoClient("mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority")
db=client['MuseNewsDatabase']
songsCollection = db.songs
db.list_collection_names()

#TO ADD MORE, START ON PAGE 17 RANK 304 (we have 303 up to page 16)
# api-endpoint 
URL = "https://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettoptracks&api_key=10b860590d5168c53783ae9728a9b395&page=17"
  
# sending get request and saving the response as response object 
r = requests.get(url = URL) 
  
# extracting data in json format 
data = r.json() 

# songsCollection.remove({}) #////////////////////////////////////////////////////////////////////////////////////////////////////

rank = 304;
for song in data['tracks']['track']:
    songName = song['name']
    songArtist = song['artist']['name']
    songURL = "https://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist="+songArtist+"&track="+songName+"&api_key=10b860590d5168c53783ae9728a9b395&format=json"
    songResp = requests.get(url=songURL)
    songData = songResp.json()['track']
    # print(songName)
    if 'wiki' not in songData:
        songData['wiki']= { 'content': "No Wiki for this Song!", 'summary':'No Wiki for this Song!', 'published':'N/A'}
        
   


    query = songName + " by " + songArtist + " album cover"
    bingURL = "https://eastus.api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + query + "&count=1"
    bingHeader = {'Ocp-Apim-Subscription-Key': '384f9b339bb6489a9f8d69652d148cb9'}
    bingResp = requests.get(url=bingURL,headers=bingHeader)
    bingData = bingResp.json()
    songData['bingImageURL'] = bingData['value'][0]['contentUrl']

    # songData['bingImageURL'] = "https://pbs.twimg.com/media/ESOKhaHWsAA6q2A.jpg"
    songData['rank'] = rank
    print(songData)
    print("\n\n")
    result = songsCollection.insert_one(songData)
    rank = rank + 1
    # print(songData['wiki'])
    # db.list_collection_names()
