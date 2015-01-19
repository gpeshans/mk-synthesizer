package mk.ukim.finki.synthesizer.backend.controllers.rest;

import mk.ukim.finki.synthesizer.backend.services.MaryClientAudioService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * SynthesizeController
 */
@Controller
@RequestMapping(value = "/synthesizer")
public class SynthesizeController {

  protected final Log logger = LogFactory.getLog(getClass());

  @Autowired
  MaryClientAudioService maryClientAudioService;

  @RequestMapping(value = "/synthesize", method = RequestMethod.POST)
  @ResponseBody
  public String handleSynthesize(@RequestParam(value = "inputText", required = true) String inputText,
      @RequestParam(value = "selectedVoice", required = true) String selectedVoice,
      @RequestParam(value = "inputType", required = true) String inputType,
      HttpServletRequest request) throws ServletException, IOException {

    HttpSession session = request.getSession();
    ServletContext servletContext = session.getServletContext();
    String contextPath = servletContext.getRealPath("");

    maryClientAudioService.streamAudio(contextPath, inputText, inputType, selectedVoice);
    logger.debug("Recording synthesized. ---Dummy log statement---");

    return "";
  }
}
