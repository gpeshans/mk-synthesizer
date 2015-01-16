package mk.ukim.finki.synthesizer.backend.controllers;

import junit.framework.TestCase;

import mk.ukim.finki.synthesizer.backend.controllers.views.ViewsController;
import org.junit.Ignore;
import org.springframework.web.servlet.ModelAndView;

@Ignore
public class HelloControllerTest extends TestCase {

  public void testHandleRequestView() throws Exception{   
      ViewsController controller = new ViewsController();
      ModelAndView modelAndView = controller.handleRequest(null, null);   
      assertEquals("hello", modelAndView.getViewName());
  }
}
