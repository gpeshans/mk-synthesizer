package mk.ukim.finki.synthesizer.backend;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Rest servlet configuration.
 */
@EnableWebMvc
@Configuration
@ComponentScan(basePackages = {"mk.ukim.finki.synthesizer.backend.controllers.rest",
    "mk.ukim.finki.synthesizer.backend.services" })
public class RestServletConfiguration extends WebMvcConfigurerAdapter {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
  }

  // TODO: add audio files resolver

}
