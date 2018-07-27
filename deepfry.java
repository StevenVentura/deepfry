import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.awt.image.BufferedImage;
import java.awt.image.*;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;

public class deepfry {
	public boolean copyClipboardToFile()
	{
		//http://forum.codecall.net/topic/58122-java-copy-image-from-clipboard/
		//create clipboard object
        Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
        try {
            //Get data from clipboard and assign it to an image.
            //clipboard.getData() returns an object, so we need to cast it to a BufferdImage.
            BufferedImage image = (BufferedImage)clipboard.getData(DataFlavor.imageFlavor);
            
            //file that we'll save to disk.
            File file = new File("image.jpg");
            
            //class to write image to disk.  You specify the image to be saved, its type,
            // and then the file in which to write the image data.
            ImageIO.write(image, "jpg", file);
			return true;
        }
        //getData throws this.
        catch(UnsupportedFlavorException ufe) {
            ufe.printStackTrace();
			return false;
        }
        
        catch(IOException ioe) {
            ioe.printStackTrace();
			return false;
        }
		
	}
	JFrame frame = null;
	JButton button = null;
	public void begin()
	{
		frame = new JFrame("dEepFrY");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(new Dimension(200,200));
		frame.setLayout(new FlowLayout());
		button = new JButton("GO");
		button.setPreferredSize(new Dimension(200,200));
		button.addActionListener(new ActionListener() 
		{
			public void actionPerformed(ActionEvent e)
			{
				try{
				System.out.println("deepfry go");				
				if (copyClipboardToFile() == false) return;
				String line;
				String dir = System.getProperty("user.dir");
				String absolutePathToImage = null;
				absolutePathToImage = "\"" + dir + "\\image.jpg" + "\"";
				Process p = Runtime.getRuntime().exec("node \"" + dir + "\\deepfry.js\"" + " " + absolutePathToImage);
				  BufferedReader bri = new BufferedReader
					(new InputStreamReader(p.getInputStream()));
				  BufferedReader bre = new BufferedReader
					(new InputStreamReader(p.getErrorStream()));
				  while ((line = bri.readLine()) != null) {
					System.out.println(line);
				  }
				  bri.close();
				  while ((line = bre.readLine()) != null) {
					System.out.println(line);
				  }
				  bre.close();
				  p.waitFor();
				  System.out.println("Done.");
				}catch(Exception e2){e2.printStackTrace();}
			}
			
		});
		frame.add(button);
		frame.setVisible(true);
	}
	 
    public static void main(String[] args) {
        deepfry d = new deepfry();
		d.begin();
    }
}
