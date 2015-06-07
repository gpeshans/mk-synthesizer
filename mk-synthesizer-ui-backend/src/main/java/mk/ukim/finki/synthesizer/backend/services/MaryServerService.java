package mk.ukim.finki.synthesizer.backend.services;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Service to communicate with mary server.
 */
@Service
public class MaryServerService {

  private static final String SERVER_HOST_NAME = "http://localhost:59125";
  private static final String MARY_VOICES_ENDPOINT = "/voices";

  public List<String> getVoices() throws IOException {

    HttpClient client = HttpClientBuilder.create().build();
    HttpGet request = new HttpGet(SERVER_HOST_NAME + MARY_VOICES_ENDPOINT);

    HttpResponse response = client.execute(request);

    BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

    List<String> voices = new ArrayList<String>();
    String line;
    while ((line = rd.readLine()) != null) {
      voices.add(line.split(" ")[0]);
    }

    return voices;
  }

}
