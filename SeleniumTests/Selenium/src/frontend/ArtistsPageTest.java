package frontend;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.openqa.selenium.NoSuchElementException;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ArtistsPageTest 
{
	String prefix = "http://localhost:3000";
	/*
	 * Test 1: Tests that the link to an artist's page from the song page works
	 */
	@Test
	public void testSongLinkToArtist()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songspage/Blinding Lights/The Weeknd");
		WebElement we = wd.findElement(By.id("artistLink"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/artistspage/The%20Weeknd");
		wd.quit();
	}
	
	/*
	 * Test 2: Tests that the link to the next page of song results works
	 */
	@Test
	public void testSongNextPage()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/2");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement we = wd.findElement(By.id("nextButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/3");
		wd.quit();
	}
	
	/*
	 * Test 3: Tests that the link to the previous page of song results works
	 */
	@Test
	public void testSongPrevPage()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/2");
		WebElement we = wd.findElement(By.id("prevButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		wd.quit();
	}
	
	/*
	 * Test 4: Tests that the link to the next page of artist results works
	 */
	@Test
	public void testArtistNextPage()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement we = wd.findElement(By.id("nextButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/artists/splash/none/rank/false/none/none/none/none/2");
		wd.quit();
	}
	
	/*
	 * Test 5: Tests that the link to the previous page of artist results works
	 */
	@Test
	public void testArtistPrevPage()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/2");
		WebElement we = wd.findElement(By.id("prevButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		wd.quit();
	}
	
	
	/*
	 * Test 6: Tests that the link between a news article and the artist it is about
	 */
	@Test
	public void testNewsLinkToArtist()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/Newsp/The%20Weeknd/1");
		WebElement we = wd.findElement(By.id("artistLink"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/artistspage/The%20Weeknd");
		wd.quit();
	}
	
	/*
	 * Test 7: Tests the search bar on the news page
	 */
	@Test
	public void testNewsSearch()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/news");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement we = wd.findElement(By.id("form")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("searchSubmit"));
		we.sendKeys(new StringBuffer("Lady Gaga"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		WebElement grid = wd.findElement(By.id("newsArticle"));
		
		WebElement result = wd.findElement(By.id("newsArticlePreview"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("Lady Gaga"));
		wd.quit();
	}
	
	/*
	 * Test 8: Tests the news more button
	 */
	@Test
	public void testNewsMoreButton() throws InterruptedException
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/news");
		Thread.sleep(2000);
		WebElement we = wd.findElement(By.id("moreButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/Newsp/Billie%20Eilish/0");
		wd.quit();
	}
	
	/*
	 * Test 9: Tests that the link from a song listed under an artist to the song's page
	 */
	@Test
	public void testArtistLinkToSong() throws InterruptedException
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artistspage/Billie Eilish");
		Thread.sleep(5000);
		WebElement we = wd.findElement(By.id("linkToSong"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/songspage/bad%20guy/Billie%20Eilish");
		wd.quit();
	}
	
	/*
	 * Test 10: Tests home button
	 */
	@Test
	public void testHomeButton()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("homeButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/");
		wd.quit();
	}
	
	/*
	 * Test 11: Tests about button
	 */
	@Test
	public void testAboutButton()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/");
		WebElement we = wd.findElement(By.id("aboutButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/about");
		wd.quit();
	}
	
	/*
	 * Test 12: Tests songs button
	 */
	@Test
	public void testSongsButton()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/");
		WebElement we = wd.findElement(By.id("songsButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		wd.quit();
	}
	
	/*
	 * Test 13: Tests news button
	 */
	@Test
	public void testNewsButton()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/");
		WebElement we = wd.findElement(By.id("newsButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/news");
		wd.quit();
	}
	
	/*
	 * Test 14: Tests artists button
	 */
	@Test
	public void testArtistsButton()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/");
		WebElement we = wd.findElement(By.id("artistsButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		wd.quit();
	}
	
	//-----------------------------------------------------------------------
	
	/*
	 * Test 15: Tests that the song search functionality works
	 */
	@Test
	public void testSongSearch()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		we.sendKeys(new StringBuffer("Blinding Lights"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("Blinding Lights"));
		wd.quit();
	}
	
	/*
	 * Test 16: Tests that the song filter by artist functionality works
	 */
	@Test
	public void testSongSearchByArtist()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("artistSearchLabel")).findElement(By.id("artistSearch"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		we.sendKeys(new StringBuffer("The Weeknd"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(!output.contains("Until I Bleed Out"));
		wd.quit();
	}
	
	/*
	 * Test 17: Tests that when an invalid playcount is supplied, the page doesnt change
	 */
	@Test
	public void testSongSearchByArtistAndInvalidMinPlaycount()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("artistSearchLabel")).findElement(By.id("artistSearch"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		WebElement wempc = wd.findElement(By.id("playCountLabel")).findElement(By.id("maxPlayCount"));
		wempc.sendKeys(new  StringBuffer("11111111111111111111"));
		we.sendKeys(new StringBuffer("Billie Eilish"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("Blinding Lights"));
		wd.quit();
	}
	
	/*
	 * Test 18: Tests that when an invalid listener is supplied, the page doesnt change
	 */
	@Test
	public void testSongSearchByArtistAndInvalidMinListener()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("artistSearchLabel")).findElement(By.id("artistSearch"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		WebElement wempc = wd.findElement(By.id("listenersLabel")).findElement(By.id("maxListeners"));
		wempc.sendKeys(new  StringBuffer("11111111111111111111"));
		we.sendKeys(new StringBuffer("Billie Eilish"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("Blinding Lights"));
		wd.quit();
	}
	
	/*
	 * Test 19: Tests that when an invalid rank is supplied, the songs are not updated
	 */
	@Test
	public void testSongSearchByInvalidRank()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("artistSearchLabel")).findElement(By.id("artistSearch"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		WebElement wempc = wd.findElement(By.id("rankLabel")).findElement(By.id("minRank"));
		wempc.sendKeys(new  StringBuffer("301"));
		
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("Blinding Lights"));
		wd.quit();
	}
	
	/*
	 * Test 20: Tests a valid song search with multiple filters
	 */
	@Test
	public void testValidSongSearchMultipleFilters()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement wesearch = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		wesearch.sendKeys(new StringBuffer("Call Out My Name"));
		WebElement we = wd.findElement(By.id("artistSearchLabel")).findElement(By.id("artistSearch"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		WebElement wempc = wd.findElement(By.id("rankLabel")).findElement(By.id("maxRank"));
		wempc.sendKeys(new  StringBuffer("133"));
		we.sendKeys(new StringBuffer("The Weeknd"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("Call Out My Name"));
		assertTrue(!output.contains("Faith"));
		wd.quit();
	}
	
	/*
	 * Test 21: Tests that the song search functionality gives no songs if the search doesnt exist
	 */
	@Test
	public void testSongSearchInvalidInput()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		we.sendKeys(new StringBuffer("Kedar"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(!output.contains("Blinding Lights"));
		}
		catch(NoSuchElementException e) {
			assertTrue(true);
		}
		wd.quit();
	}
	
	/*
	 * Test 22: Tests that the song search functionality works with URL Encoding
	 */
	@Test
	public void testSongSearchInvalidInputWithSlashes()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		we.sendKeys(new StringBuffer("Blinding/Lights"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(!output.contains("Blinding Lights"));
		}
		catch(NoSuchElementException e) {
			assertTrue(true);
		}
		wd.quit();
	}
	
	//-----------------------------ARTISTS SEARCH TESTS---------------------------------------------
	
	/*
	 * Test 23: Tests that the artist search functionality works
	 */
	@Test
	public void testArtistSearch()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("artistSubmitLabel")).findElement(By.id("artistSubmit"));
		we.sendKeys(new StringBuffer("The Weeknd"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("artistName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("The Weeknd"));
		wd.quit();
	}
	
	/*
	 * Test 24: Tests that the artist filter by if on tour functionality works
	 */
	@Test
	public void testArtistSearchOnTour()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("ontourLabel")).findElement(By.id("ontour"));
		WebElement wesubmit = wd.findElement(By.id("artistSubmitLabel")).findElement(By.id("artistSubmit"));
		we.click();
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("artistName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(!output.contains("The Weeknd"));
		wd.quit();
	}
	
	/*
	 * Test 25: Tests that when an invalid playcount is supplied, the page doesnt change
	 */
	@Test
	public void testArtistSearchInvalidMinPlaycount()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("artistSubmitLabel")).findElement(By.id("artistSubmit"));
		WebElement wempc = wd.findElement(By.id("maxPlayCount"));
		wempc.sendKeys(new  StringBuffer("11111111111111111111"));
		we.sendKeys(new StringBuffer("Billie Eilish"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("artistName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("The Weeknd"));
		wd.quit();
	}
	
	/*
	 * Test 26: Tests that when an invalid listener is supplied, the page doesnt change
	 */
	@Test
	public void testArtistSearchInvalidMinListener()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("artistSubmitLabel")).findElement(By.id("artistSubmit"));
		WebElement wempc = wd.findElement(By.id("listenersLabel")).findElement(By.id("minListeners"));
		wempc.sendKeys(new  StringBuffer("11111111111111111111"));
		we.sendKeys(new StringBuffer("Billie Eilish"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("artistName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("The Weeknd"));
		wd.quit();
	}
	
	/*
	 * Test 27: Tests a valid artist search with multiple filters
	 */
	@Test
	public void testValidArtistSearchMultipleFilters()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		WebElement wesearch = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		wesearch.sendKeys(new StringBuffer("Camila"));
		WebElement we = wd.findElement(By.id("playCountLabel")).findElement(By.id("minPlayCount"));
		WebElement wesubmit = wd.findElement(By.id("artistSubmitLabel")).findElement(By.id("artistSubmit"));
		WebElement wempc = wd.findElement(By.id("ontourLabel")).findElement(By.id("ontour"));
		wempc.click();
		we.sendKeys(new StringBuffer("12345"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement result = wd.findElement(By.id("artistName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(output.contains("Camila Cabello"));
		assertTrue(!output.contains("Billie Eilish"));
		wd.quit();
	}
	
	/*
	 * Test 28: Tests that the artist search functionality gives no songs if the search doesnt exist
	 */
	@Test
	public void testArtistSearchInvalidInput()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("artistSubmitLabel")).findElement(By.id("artistSubmit"));
		we.sendKeys(new StringBuffer("Kedar"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
		WebElement result = wd.findElement(By.id("artistName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(!output.contains("The Weeknd"));
		}
		catch(NoSuchElementException e) {
			assertTrue(true);
		}
		wd.quit();
	}
	
	/*
	 * Test 29: Tests that the artist search functionality works with URL Encoding
	 */
	@Test
	public void testArtistSearchInvalidInputWithSlashes()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/artists/splash/none/rank/false/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("searchLabel")).findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("artistSubmitLabel")).findElement(By.id("artistSubmit"));
		we.sendKeys(new StringBuffer("The/Weeknd"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
		WebElement result = wd.findElement(By.id("artistName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(!output.contains("The Weeknd"));
		}
		catch(NoSuchElementException e) {
			assertTrue(true);
		}
		wd.quit();
	}
	
	/*
	 * Test 30: Tests that the song filter by artist functionality works with slashes in the input
	 */
	@Test
	public void testSongSearchByArtistInvalidInputWithSlashes()
	{
		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		// edit the next line to enter the location of "min.html" on your file system
		wd.get(prefix + "/songs/splash/none/rank/none/none/none/none/none/none/none/1");
		WebElement we = wd.findElement(By.id("artistSearchLabel")).findElement(By.id("artistSearch"));
		WebElement wesubmit = wd.findElement(By.id("songSubmitLabel")).findElement(By.id("songSubmit"));
		we.sendKeys(new StringBuffer("The/Weeknd"));
		wesubmit.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
		WebElement result = wd.findElement(By.id("songName"));
		String output = result.getText(); // read the output text
		System.out.println("OUTPUT:" + output);
		assertTrue(!output.contains("Blinding Lights"));
		}
		catch(NoSuchElementException e) {
			assertTrue(true);
		}
		wd.quit();
	}
}
