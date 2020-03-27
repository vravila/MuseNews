import requests 
import pymongo
from pymongo import MongoClient
client = pymongo.MongoClient("mongodb+srv://musenews:musenew5@musenewsdatabase-cbkjn.gcp.mongodb.net/test?retryWrites=true&w=majority")
db=client['MuseNewsDatabase']
artistsCollection = db.artists
db.list_collection_names()

#THERE ARE CURRENTLY 200 INSTANCES OF ARTISTS IN THE DATABASE (UP TO AND INCLUDING PAGE 4 OF LAST.FM)... TO LOAD MORE, START ON PAGE 5, RANK = 201, AND MAKE SURE REMOVE (LINE 20) IS COMMENTED OUT
#NOTE: page 2 is a repeat of page 1 plus some songs so idrk
# api-endpoint 
URL = "https://ws.audioscrobbler.com/2.0/?format=json&method=chart.gettopartists&api_key=10b860590d5168c53783ae9728a9b395&page=4"
  
# sending get request and saving the response as response object 
r = requests.get(url = URL) 
  
# extracting data in json format 
data = r.json() 

# artistsCollection.remove({}) #////////////////////////////////////////////////////////////////////////////////////////////////////
# print(data)
rank = 151;
for artist in data['artists']['artist']:
    artistName = artist['name']
    artistURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+artistName+"&api_key=10b860590d5168c53783ae9728a9b395&format=json"
    artistResp = requests.get(url=artistURL)
    artistData = artistResp.json()['artist']

    if 'bio' not in artistData:
        artistData['wiki']= { 'content': "No Wiki for this Artist!", 'summary':'No Wiki for this Artist!', 'published':'N/A'}

    bingURL = "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + artistName + "&count=1"
    bingHeader = {'Ocp-Apim-Subscription-Key': 'ceb6ef645abd43d59fbbbeb722120f8f'}
    bingResp = requests.get(url=bingURL,headers=bingHeader)
    bingData = bingResp.json()
    artistData['bingImageURL'] = bingData['value'][0]['contentUrl']


    artistData['rank'] = rank;
    print(artistData)
    print("\n\n")
    result = artistsCollection.insert_one(artistData)
    rank = rank + 1
    # db.list_collection_names()


# print(data['artists']['artist'][0])
