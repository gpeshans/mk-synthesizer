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
import javax.servlet.http.HttpServletResponse;
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
    String contextPath = servletContext.getRealPath("/WEB-INF");

    maryClientAudioService.streamAudio(contextPath, inputText, inputType, selectedVoice);

    return "";
  }

  @RequestMapping("/test")
  @ResponseBody
  public String handleRequest(HttpServletRequest request, HttpServletResponse response) {

    logger.info("Returning hello view");

    return "synthesis";
  }

  @RequestMapping(value = "/hello", method = RequestMethod.GET)
  @ResponseBody
  public String handleSynthesize(HttpServletRequest request) throws ServletException,
      IOException {

    HttpSession session = request.getSession();
    ServletContext servletContext = session.getServletContext();
    String contextPath = servletContext.getRealPath("/WEB-INF");

    PostParams params = new PostParams();
    params.setInputText("Hello how are you?");
    params.setInputType("TEXT");
    params.setSelectedVoice("cmu-slt-hsmm");

    maryClientAudioService.streamAudio(contextPath, params.getInputText(), params.getInputType(),
        params.getSelectedVoice());

    return "hello";
  }


  public class PostParams {

    private String inputText;
    private String selectedVoice;
    private String inputType;

    public String getInputText() {
      return inputText;
    }

    public void setInputText(String inputText) {
      this.inputText = inputText;
    }

    public String getSelectedVoice() {
      return selectedVoice;
    }

    public void setSelectedVoice(String selectedVoice) {
      this.selectedVoice = selectedVoice;
    }

    public String getInputType() {
      return inputType;
    }

    public void setInputType(String inputType) {
      this.inputType = inputType;
    }
  }

}
