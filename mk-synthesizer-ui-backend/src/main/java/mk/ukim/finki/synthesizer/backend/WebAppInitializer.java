package mk.ukim.finki.synthesizer.backend;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

/**
 * Application configuration.
 */
public class WebAppInitializer implements WebApplicationInitializer {

  private static final String DEFAULT_SERVLET = "synthesizer";
  private static final String REST_SERVLET = "rest";

  private static WebApplicationContext withAppContextFrom(Class<?>... classes) {
    AnnotationConfigWebApplicationContext appContext = new AnnotationConfigWebApplicationContext();
    appContext.register(classes);
    return appContext;
  }

  public void onStartup(ServletContext servletContext) throws ServletException {
    servletContext.addListener(new ContextLoaderListener(new AnnotationConfigWebApplicationContext()));

    registerViewsServlet(servletContext);
    registerRestServlet(servletContext);
  }

  private void registerViewsServlet(ServletContext servletContext) {
    DispatcherServlet dispatcherServlet = new DispatcherServlet(withAppContextFrom(ViewsServletConfiguration.class));

    ServletRegistration.Dynamic registration = servletContext.addServlet(DEFAULT_SERVLET, dispatcherServlet);
    registration.addMapping("/");
    registration.setLoadOnStartup(1);
  }

  private void registerRestServlet(ServletContext servletContext) {
    DispatcherServlet dispatcherServlet = new DispatcherServlet(withAppContextFrom(RestServletConfiguration.class));

    ServletRegistration.Dynamic registration = servletContext.addServlet(REST_SERVLET, dispatcherServlet);
    registration.addMapping("/rest/*");
    registration.setLoadOnStartup(2);
  }

}
