import requests 
import pymongo
from pymongo import MongoClient
client = pymongo.MongoClient("localhost", 27017)#Change to Atlas DB to actually edit DB
db=client['MuseNewsDatabase']
newsCollection = db.news
db.list_collection_names()


artists = ["The Weeknd", "Billie Eilish", "Lady Gaga", "Kanye West", "Tame Impala", "Dua Lipa", "Post Malone", "Lana Del Rey", "Ariana Grande", "Doja Cat"]
# artists = ["The Weeknd"]

def GetNewsArticle(artist):
    URL = "http://newsapi.org/v2/everything?q=" + artist + "&page=1&apiKey=bc2ebdb795c5488bb34601ca89a75e7f"
    r = requests.get(url=URL)
    data = r.json()
    return data

def FillNewsCollection():
    for artist in artists:
        data = GetNewsArticle(artist)
        print("size: " + str(len(data['articles'])))
        for i in range(1, 8):#Puts Top 14 articles into the DB per artist
            print(i)
            data['articles'][2*i-2]['page'] = i;
            data['articles'][2*i-1]['page'] = i;
        for i in range(0,14):
            article = data['articles'][i]
            article['term'] = artist
            print(article)
            result =newsCollection.insert_one(article)

#Commented out to not waste API calls to Bing Images API
# newsCollection.remove({})
# FillNewsCollection()
# print(db.list_collection_names())
    


