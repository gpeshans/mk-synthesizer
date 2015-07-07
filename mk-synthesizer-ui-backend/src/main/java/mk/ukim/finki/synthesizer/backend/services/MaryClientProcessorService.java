package mk.ukim.finki.synthesizer.backend.services;

import marytts.util.io.FileUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Service
public class MaryClientProcessorService {

  private static final String SERVER_HOST_NAME = "http://localhost:59125";
  private static Map<String, String> localeMap = new HashMap<String, String>();

  static {
    localeMap.put("lenka-voice", "mk");
    localeMap.put("lence_voice-hsmm", "mk");
    localeMap.put("lence_voice", "mk");
    localeMap.put("ds_voice", "mk");
    localeMap.put("ds_voice-hsmm", "mk");
    localeMap.put("cmu-slt-hsmm", "en_US");
  }

  public InputStream processInput(String inputText, String InputType, String selectedVoice) {
    try {
      return requestInputStream(inputText, InputType, "AUDIO", localeMap.get(selectedVoice), "WAVE", selectedVoice,
          null, null, false, null);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

  @SuppressWarnings("deprecation")
  private InputStream requestInputStream(String input,
      String inputType,
      String outputType,
      String locale,
      String audioType,
      String defaultVoiceName,
      String defaultStyle,
      Map<String, String> effects, // String defaultEffects,
      boolean streamingAudio,
      String outputTypeParams) throws IOException {

    StringBuilder params = new StringBuilder();
    params.append("INPUT_TEXT=").append(URLEncoder.encode(input, "UTF-8"));
    params.append("&INPUT_TYPE=").append(URLEncoder.encode(inputType, "UTF-8"));
    params.append("&OUTPUT_TYPE=").append(URLEncoder.encode(outputType, "UTF-8"));
    if (locale != null) {
      params.append("&LOCALE=").append(URLEncoder.encode(locale, "UTF-8"));
    }
    if (audioType != null) {
      // data.serverCanStream = true;
      params.append("&AUDIO=").append(
          URLEncoder.encode((streamingAudio && true) ? audioType + "_STREAM" : audioType + "_FILE", "UTF-8"));
    }
    if (outputTypeParams != null) {
      params.append("&OUTPUT_TYPE_PARAMS=").append(URLEncoder.encode(outputTypeParams, "UTF-8"));
    }

    if (defaultVoiceName != null) {
      params.append("&VOICE=").append(URLEncoder.encode(defaultVoiceName, "UTF-8"));
    }

    if (defaultStyle != null) {
      params.append("&STYLE=").append(URLEncoder.encode(defaultStyle, "UTF-8"));
    }

    if (effects != null) {
      for (String key : effects.keySet()) {
        params.append("&").append(key).append("=").append(URLEncoder.encode(effects.get(key), "UTF-8"));
      }
    }

    // to make HTTP Post request with HttpURLConnection
    // data.hostAddress.getHttpAddress() = localhost
    URL url = new URL(SERVER_HOST_NAME + "/process");
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();

    conn.setRequestMethod("POST");
    conn.setAllowUserInteraction(false); // no user interact [like pop up]
    conn.setDoOutput(true); // want to send
    conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded");
    OutputStream ost = conn.getOutputStream();
    PrintWriter pw = new PrintWriter(ost);
    pw.print(params.toString()); // here we "send" our body!
    pw.flush();
    pw.close();

    // and InputStream from here will be body
    try {
      return conn.getInputStream();
    } catch (IOException e) {
      String error;
      try {
        error = FileUtils.getStreamAsString(conn.getErrorStream(), "UTF-8");
      } catch (IOException errE) {
        // ok cannot get error message, just re-throw original e
        throw new IOException("No detailed error message available", e);
      }
      throw new IOException("Error message from server:\n" + error, e);
    }
  }
}
