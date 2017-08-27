import java.io.IOException;
import java.net.URL;
import java.io.BufferedReader;
import java.net.URLConnection;
import java.io.InputStreamReader;
class GetUrl{
    public static String get(String url) throws IOException{
    String source ="";
    URL oracle = new URL(url);
    URLConnection yc = oracle.openConnection();
    BufferedReader in = new BufferedReader(
    new InputStreamReader(
    yc.getInputStream()));
    String inputLine;
    while ((inputLine = in.readLine()) != null)
    source +=inputLine;
    in.close();
    return source;
    }
}