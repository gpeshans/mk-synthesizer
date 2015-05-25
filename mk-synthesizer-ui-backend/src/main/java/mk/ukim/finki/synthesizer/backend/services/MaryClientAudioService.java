package mk.ukim.finki.synthesizer.backend.services;

import mk.ukim.finki.synthesizer.backend.exceptions.MaryttsServerException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class MaryClientAudioService {

  private static final String TEMPORARY_WAV_LOCATION = "/resources/wav/";

  @Autowired
  MaryClientProcessorService maryClientProcessorService;

  public String synthesizeAudio(String contextPath, String inputText, String inputType, String selectedVoice) {

    String fileLocation = TEMPORARY_WAV_LOCATION + UUID.randomUUID().toString() + ".wav";
    String filePath = contextPath + fileLocation;

    try {

      InputStream inputStream = maryClientProcessorService.processInput(inputText, inputType, selectedVoice);

      if (inputStream == null) {
        throw new MaryttsServerException("Marytts server not started.");
      }

      File outputTempFile = new File(filePath);
      FileUtils.writeByteArrayToFile(outputTempFile, IOUtils.toByteArray(inputStream));

    } catch (IOException e) {
      e.printStackTrace();
    }

    return fileLocation;
  }
}
