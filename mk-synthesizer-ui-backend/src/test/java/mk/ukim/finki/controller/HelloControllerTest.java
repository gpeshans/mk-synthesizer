package mk.ukim.finki.controller;

import junit.framework.TestCase;

import org.junit.Ignore;
import org.springframework.web.servlet.ModelAndView;

@Ignore
public class HelloControllerTest extends TestCase {

  public void testHandleRequestView() throws Exception{   
      SynthesiserController controller = new SynthesiserController();
      ModelAndView modelAndView = controller.handleRequest(null, null);   
      assertEquals("hello", modelAndView.getViewName());
  }
}
