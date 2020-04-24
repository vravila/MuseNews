import unittest
import fillDBNews
import pymongo

class TestFillDBNews(unittest.TestCase):

    #Test 1: Test that the call gets the given song's data with all data needed for the site
    def test_GetNewsArticle(self):
        data = fillDBNews.GetNewsArticle("Ariana Grande")
        self.assertGreater(len(data['articles'][0]['title']), 0)
        self.assertGreater(len(data['articles'][0]['author']), 0)
        self.assertGreater(len(data['articles'][0]['description']), 0)
        self.assertGreater(len(data['articles'][0]['urlToImage']), 0)
        self.assertGreater(len(data['articles'][0]['content']), 0)
        self.assertGreater(len(data['articles'][0]['url']), 0)

    
    #Test 2: Test that MongoDB was filled by the python script running upon invocation of unittest file
    def test_MongoFilled(self):
        client = pymongo.MongoClient("localhost", 27017)#Change to Atlas DB to actually edit DB
        db=client['MuseNewsDatabase']
        newsCollection = db.news
        result = newsCollection.find({}).count()
        self.assertEquals(result, 140)

if __name__ == '__main__':
    unittest.main()