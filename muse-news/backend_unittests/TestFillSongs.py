import unittest
import fillDBSongs
import pymongo

class TestFillDBSongs(unittest.TestCase):

    #Test 1: Test that the call gets the top songs
    def test_GetTopSongs(self):
        data = fillDBSongs.GetTopSongs()
        self.assertEquals(len(data['tracks']['track']), 50)
        self.assertEquals(data['tracks']['track'][0]['name'], "Blinding Lights")
    
    #Test 2: Test that the call gets the given song's data with all data needed for the site
    def test_GetSongData(self):
        data = fillDBSongs.GetSongData("Blinding Lights", "The Weeknd")
        self.assertEquals(data['name'], "Blinding Lights")
        # self.assertGreater(int(data['rank']), 0)

        self.assertIsInstance(data['wiki']['content'], str)
        # self.assertTrue(data['ontour'])
        self.assertGreater(int(data['listeners']), 0)
        self.assertGreater(int(data['playcount']), 0)
        self.assertIsInstance(data['toptags']['tag'], list)
        # self.assertIsInstance(data['similar']['artist'], list)

    #Test 3: Test that the call to get an image returns a valid url
    def test_getSongImage(self):
        data = fillDBSongs.GetSongImage("Blinding Lights", "The Weeknd")
        self.assertIsInstance(data['value'][0]['contentUrl'], str)
    
    #Test 4: Test that MongoDB was filled by the python script running upon invocation of unittest file
    def test_MongoFilled(self):
        client = pymongo.MongoClient("localhost", 27017)#Change to Atlas DB to actually edit DB
        db=client['MuseNewsDatabase']
        songsCollection = db.songs
        result = songsCollection.find({}).count()
        self.assertEquals(result, 50)

if __name__ == '__main__':
    unittest.main()