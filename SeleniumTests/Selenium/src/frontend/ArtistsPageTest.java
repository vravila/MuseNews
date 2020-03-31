package frontend;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
		wd.get(prefix + "/songs/1");
		WebElement we = wd.findElement(By.id("nextButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/songs/2");
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
		wd.get(prefix + "/songs/2");
		WebElement we = wd.findElement(By.id("prevButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/songs/1");
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
		wd.get(prefix + "/artists/1");
		WebElement we = wd.findElement(By.id("nextButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/artists/2");
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
		wd.get(prefix + "/artists/2");
		WebElement we = wd.findElement(By.id("prevButton"));
		we.click();
		assertEquals(wd.getCurrentUrl(), prefix + "/artists/1");
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
		WebElement we = wd.findElement(By.id("search"));
		WebElement wesubmit = wd.findElement(By.id("searchSubmit"));
		we.sendKeys(new StringBuffer("Lady Gaga"));
		wesubmit.click();
		
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
		assertEquals(wd.getCurrentUrl(), prefix + "/Newsp/The%20Weeknd/0");
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
		wd.get(prefix + "/artists/1");
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
		assertEquals(wd.getCurrentUrl(), prefix + "/songs/1");
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
		assertEquals(wd.getCurrentUrl(), prefix + "/artists/1");
		wd.quit();
	}
	
//	/*
//	 * Test 9: Tests that the link from a song listed under an artist to the song's page
//	 */
//	@Test
//	public void testArtistLinkToArtistPage() throws InterruptedException
//	{
//		//scrolling
////		WebElement element = driver.findElement(By.id("ID")));  
////		js.executeScript("arguments[0].scrollIntoView(true);", element);
//		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
//		WebDriver wd = new FirefoxDriver(); // launch the browser
//		// edit the next line to enter the location of "min.html" on your file system
//		wd.get(prefix + "/artists/1");
//		Thread.sleep(5000);
////		WebDriverWait wait = new WebDriverWait(wd, 3);
//		JavascriptExecutor js = ((JavascriptExecutor) wd);
//		//presence in DOM
////		WebElement we = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("linkToArtistsPage")));
//		WebElement we = wd.findElement(By.id("linkToArtistsPage"));
//		js.executeScript("arguments[0].scrollIntoView(true);", we);
//		we.click();
//		assertEquals(wd.getCurrentUrl(), prefix + "/artistspage/The%20Weeknd");
//		wd.quit();
//	}
//	
//	/*
//	 * Test 9: Tests that the link from a song listed under an artist to the song's page
//	 */
//	@Test
//	public void testSongLinkToSongPage() throws InterruptedException
//	{
//		System.setProperty("webdriver.gecko.driver","C:\\Program Files\\GeckoDriver\\geckodriver.exe");
//		WebDriver wd = new FirefoxDriver(); // launch the browser
//		// edit the next line to enter the location of "min.html" on your file system
//		wd.get(prefix + "/songs/1");
//		Thread.sleep(5000);
//		WebElement we = wd.findElement(By.id("linkToSongsPage"));
//		we.click();
//		assertEquals(wd.getCurrentUrl(), prefix + "/songspage/Blinding%20Lights");
//		wd.quit();
//	}
	
	
	
	
	
	
	
}
