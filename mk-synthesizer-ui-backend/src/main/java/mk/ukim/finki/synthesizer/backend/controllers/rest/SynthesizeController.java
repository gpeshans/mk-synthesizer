package mk.ukim.finki.synthesizer.backend.controllers.rest;

import mk.ukim.finki.synthesizer.backend.model.SynthesizerData;
import mk.ukim.finki.synthesizer.backend.services.MaryClientAudioService;
import mk.ukim.finki.synthesizer.backend.services.MaryServerService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * SynthesizeController
 */
@Controller
@RequestMapping(value = "/synthesizer")
public class SynthesizeController {

  protected final Log logger = LogFactory.getLog(getClass());

  @Autowired
  private MaryClientAudioService maryClientAudioService;

  @Autowired
  private MaryServerService maryServerService;

  @RequestMapping(value = "synthesize", method = RequestMethod.POST)
  @ResponseBody
  public String synthesizeSpeech(@RequestBody SynthesizerData synthesizerData, HttpServletRequest request) {
     HttpSession session = request.getSession();
     ServletContext servletContext = session.getServletContext();
     String contextPath = servletContext.getRealPath("");

     String fileLocation = maryClientAudioService.synthesizeAudio(contextPath, synthesizerData);

    logger.debug("Recording synthesized.");

    return fileLocation;
  }

  @RequestMapping(value = "/voices", method = RequestMethod.GET)
  @ResponseBody
  public List<String> getVoices() throws IOException {
    return maryServerService.getVoices();
  }

}
