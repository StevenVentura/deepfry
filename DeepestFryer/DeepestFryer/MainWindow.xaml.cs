using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;

namespace DeepestFryer
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            this.Loaded += OnWindowLoadThing;
            this.Closing += closeboy;
        }

        private void closeboy(object o1, object o2)
        {
            chromeDriver.Close();
            Environment.Exit(0);


        }
        private void OnWindowLoadThing(object o1, object o2)
        {
            new Thread(new ThreadStart(() =>
            {
                initchromething();

            })).Start();
        }

        private IWebDriver chromeDriver;
        private void initchromething()
        {

            //https://stackoverflow.com/questions/35964955/selenium-c-sharp-interact-with-chrome-microphone-window
            //selenium API
            //https://www.google.com/intl/en/chrome/demos/speech.html
            ChromeOptions chromeOptions = new ChromeOptions();
            //Environment.SetEnvironmentVariable("webdriver.chrome.driver",
            //                "C:\\Users\\Yoloswag\\source\\repos\\FMocker\\packages\\" +
            //                "Selenium.WebDriver.ChromeDriver.2.41.0\\driver\\win32" +
            //                "\\chromedriver.exe");

            //https://peter.sh/experiments/chromium-command-line-switches/
            ChromeDriverService service = ChromeDriverService.CreateDefaultService();
            service.HideCommandPromptWindow = true;

            chromeOptions.AddArguments("allow-file-access-from-files"
                                       //,"use-fake-device-for-media-stream"
                                       , "use-fake-ui-for-media-stream"
                                       //,"headless"
                                       //"mute-audio"
                                       , "disable-notifications"
            //, "use-file-for-fake-audio-capture='C:\\Users\\Yoloswag\\" +
            //    "source\\repos\\FMocker\\FMocker\\SavedFClips\\" +
            //    "idontlikeplayback.wav'"
            );
            //chromeOptions.addArguments('start-maximized');
            //chromeOptions.addArguments('incognito');
            //chromeOptions.addArguments('headless');
            //chromeOptions.setUserPreferences({'download.default_directory' : '/path/to/your/download/directory'});


            //for (int n = -1; n <  WaveIn.DeviceCount; n++)
            //{
            //    var caps = WaveIn.GetCapabilities(n);
            //    log(caps.ProductName);
            //}



            chromeDriver = new ChromeDriver(service, chromeOptions);
            js = (IJavaScriptExecutor)chromeDriver;
            

        }
        IJavaScriptExecutor js;

        //private async Task StoreImageFromClipboardAsync()
        //{
        //    var dataPackage = Clipboard.GetContent();
        //    var formats = dataPackage.AvailableFormats;
        //    if (formats.Contains("Bitmap"))
        //    {
        //        var t = await dataPackage.GetBitmapAsync();
        //        var file = await ChangeIRASRToStorageFileAsync(t, ApplicationData.Current.LocalFolder.Path, "Clipboard.png");
        //    }
        //}
        private void saveclipboardtoimage()
        {
            if (System.Windows.Forms.Clipboard.ContainsImage())
            {
                System.Windows.Forms.Clipboard.GetImage().Save(
                    GetImageToFryPath()
                    , ImageFormat.Png);
            }
        }
        public void ButtonClickHandler(object sender, object o2)
        {
            Button b = (Button)sender;

            switch (b.Name)
            {
                case "PressMe":
                    Console.WriteLine("dsaflk;jadf?}");
                    saveclipboardtoimage();
                    deepfry();
                    break;


            }
        }
        private string GetImageToFryPath()
        {

            string path = System.IO.Path.GetFullPath(
                System.IO.Path.Combine(Directory.GetCurrentDirectory()
                , "..\\..\\"
                ));


            path += "imagetofry.png";
            return path;


        }
        //public static IJavaScriptExecutor Scripts(this IWebDriver driver)
        //{
        //    return (IJavaScriptExecutor)driver;
        //}
        private void deepfry()
        {
            try
            {
                const string deepfryurl = "https://deepfriedmemes.com/";
                Console.WriteLine("imagetofrypath= " + GetImageToFryPath());
                chromeDriver.Navigate().GoToUrl(deepfryurl);
                var imageLoader_ = chromeDriver.FindElement(By.Id("imageLoader"));
                imageLoader_.SendKeys(GetImageToFryPath());

                //click dl button
                var dl_btn = chromeDriver.FindElement(By.Id("dl-btn"));
                //js.ExecuteScript("arguments[0].scrollIntoView()", dl_btn);
                Actions action = new Actions(chromeDriver);
                action.MoveToElement(dl_btn).Perform(); // move to the button
                chromeDriver.FindElement(By.Id("dl-btn")).Click();
                saveboi();
                dl_btn.Click();
                dl_btn.Click();
                dl_btn.Click();

            }
            catch(Exception e)
            {

            }
        }

        private void saveboi()
        {
            var base64string = js.ExecuteScript(@"
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var img = document.getElementById('Img1');
    c.height=img.height;
    c.width=img.width;
    ctx.drawImage(img, 0, 0,img.width, img.height);
    var base64String = c.toDataURL();
    return base64String;
    ") as string;

            var base64 = base64string.Split(',').Last();
            using (var stream = new MemoryStream(Convert.FromBase64String(base64)))
            {
                using (var bitmap = new Bitmap(stream))
                {
                    var filepath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ImageName.png");
                    bitmap.Save(filepath, ImageFormat.Png);
                }
            }
        }



    }
}
