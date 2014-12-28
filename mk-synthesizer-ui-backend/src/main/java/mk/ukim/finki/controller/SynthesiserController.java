package mk.ukim.finki.controller;

import mk.finki.ukim.services.MaryClientProcessorService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class SynthesiserController {

    protected final Log logger = LogFactory.getLog(getClass());
    
    @Autowired
    MaryClientProcessorService maryClientProcessorService;
    
    @RequestMapping("/hello")
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        logger.info("Returning hello view");

        return new ModelAndView("synthesis");
    }
    
    @RequestMapping("/synthesis")
    public ModelAndView handleRequestD(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        logger.info("Returning hello view");

        return new ModelAndView("synthesis");
    }
    
    @RequestMapping(value="/synthesize", method=RequestMethod.POST)
    public ModelAndView handleSinthesize(
    		HttpServletRequest request, 
    		@RequestParam(value="inputText", required=true) String inputText,
    		@RequestParam(value="selectedVoice", required=true) String selectedVoice,
    		@RequestParam(value="inputType", required=true) String inputType,
    		HttpServletResponse response)
            throws ServletException, IOException {

    		maryClientProcessorService.processInput(inputText, inputType, selectedVoice);
    		
        return new ModelAndView("hello");
    }

}