package mk.ukim.finki.synthetizer;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainApp {
  
  public static void main(String[] args) {
     
    ApplicationContext context = 
            new ClassPathXmlApplicationContext("config.xml");

     HelloWorld obj = (HelloWorld) context.getBean("helloWorld");

     obj.getMessage();
  }
}