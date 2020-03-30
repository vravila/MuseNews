import unittest
import fillDBArtists
import pymongo

class TestFillDBArtists(unittest.TestCase):

    #Test 1: Test that the call gets the top artists
    def test_GetTopArtists(self):
        data = fillDBArtists.GetTopArtists()
        self.assertEquals(len(data['artists']['artist']), 50)
        self.assertEquals(data['artists']['artist'][0]['name'], "The Weeknd")
    
    #Test 2: Test that the call gets the given artist's data with all data needed for the site
    def test_GetArtistData(self):
        data = fillDBArtists.GetArtistData("The Weeknd")
        self.assertEquals(data['name'], "The Weeknd")
        self.assertIsInstance(data['bio']['content'], str)
        self.assertTrue(data['ontour'])
        self.assertGreater(int(data['stats']['listeners']), 0)
        self.assertGreater(int(data['stats']['playcount']), 0)
        self.assertIsInstance(data['tags']['tag'], list)
        self.assertIsInstance(data['similar']['artist'], list)

    #Test 3: Test that the call to get an image returns a valid url
    def test_getArtistImage(self):
        data = fillDBArtists.GetArtistImage("The Weeknd")
        self.assertIsInstance(data['value'][0]['contentUrl'], str)
    
    #Test 4: Test that MongoDB was filled by the python script running upon invocation of unittest file
    def test_MongoFilled(self):
        client = pymongo.MongoClient("localhost", 27017)#Change to Atlas DB to actually edit DB
        db=client['MuseNewsDatabase']
        artistsCollection = db.artists
        result = artistsCollection.find({}).count()
        self.assertEquals(result, 50)

if __name__ == '__main__':
    unittest.main()