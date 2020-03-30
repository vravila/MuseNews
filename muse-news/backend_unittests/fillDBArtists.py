import requests 
import pymongo
from pymongo import MongoClient
client = pymongo.MongoClient("localhost", 27017)#Change to Atlas DB to actually edit DB
db=client['MuseNewsDatabase']
artistsCollection = db.artists
db.list_collection_names()


def GetTopArtists():
    URL = "https://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettopartists&api_key=10b860590d5168c53783ae9728a9b395&page=1"
    r = requests.get(url = URL) 
    data = r.json() 
    return data

def GetArtistData(artistName):
    artistURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+artistName+"&api_key=10b860590d5168c53783ae9728a9b395&format=json"
    artistResp = requests.get(url=artistURL)
    artistData = artistResp.json()['artist']

    if 'bio' not in artistData:
        artistData['wiki']= { 'content': "No Wiki for this Artist!", 'summary':'No Wiki for this Artist!', 'published':'N/A'}
    return artistData

def GetArtistImage(artistName):
    bingURL = "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + artistName + "&count=1"
    bingHeader = {'Ocp-Apim-Subscription-Key': 'ceb6ef645abd43d59fbbbeb722120f8f'}
    bingResp = requests.get(url=bingURL,headers=bingHeader)
    bingData = bingResp.json()
    return bingData

def FillArtistsCollection():
    data = GetTopArtists()
    rank = 1
    for artist in data['artists']['artist']:
        artistName = artist['name']
        artistData = GetArtistData(artistName)
        # bingData = GetArtistImage(artistName)
        # artistData['bingImageURL'] = bingData['value'][0]['contentUrl']
        artistData['bingImageURL'] = "www.espn.com"
        artistData['rank'] = rank;
        print(artistData)
        print("\n\n")
        result = artistsCollection.insert_one(artistData)
        rank = rank + 1

#Commented out to not waste API calls to Bing Images API
# artistsCollection.remove({})
# FillArtistsCollection()
# print(db.list_collection_names())