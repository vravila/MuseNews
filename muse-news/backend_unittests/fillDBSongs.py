import requests 
import pymongo
from pymongo import MongoClient
client = pymongo.MongoClient("localhost", 27017)#Change to Atlas DB to actually edit DB
db=client['MuseNewsDatabase']
songsCollection = db.songs
db.list_collection_names()

def GetTopSongs():
    URL = "https://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettoptracks&api_key=10b860590d5168c53783ae9728a9b395&page=1"
    r = requests.get(url = URL) 
    data = r.json() 
    return data

def GetSongData(songName, songArtist):
    songURL = "https://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist="+songArtist+"&track="+songName+"&api_key=10b860590d5168c53783ae9728a9b395&format=json"
    songResp = requests.get(url=songURL)
    songData = songResp.json()['track']
    # print(songName)
    if 'wiki' not in songData:
        songData['wiki']= { 'content': "No Wiki for this Song!", 'summary':'No Wiki for this Song!', 'published':'N/A'}
    return songData

def GetSongImage(songName, songArtist):
    query = songName + " by " + songArtist + " album cover"
    bingURL = "https://eastus.api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + query + "&count=1"
    bingHeader = {'Ocp-Apim-Subscription-Key': '384f9b339bb6489a9f8d69652d148cb9'}
    bingResp = requests.get(url=bingURL,headers=bingHeader)
    bingData = bingResp.json()
    return bingData

def FillSongsCollection():
    data = GetTopSongs()
    rank = 1;
    for song in data['tracks']['track']:
        songName = song['name']
        songArtist = song['artist']['name']
        songData = GetSongData(songName, songArtist)
        songData['bingImageURL'] = "www.espn.com"
        # bingData = GetSongImage(songName, songArtist)
        # songData['bingImageURL'] = bingData['value'][0]['contentUrl']
        # songData['bingImageURL'] = "https://pbs.twimg.com/media/ESOKhaHWsAA6q2A.jpg"
        songData['rank'] = rank
        print(songData)
        print("\n\n")
        result = songsCollection.insert_one(songData)
        rank = rank + 1

#Commented out to not waste API calls to Bing Images API
# songsCollection.remove({})
# FillSongsCollection()
# print(db.list_collection_names())
