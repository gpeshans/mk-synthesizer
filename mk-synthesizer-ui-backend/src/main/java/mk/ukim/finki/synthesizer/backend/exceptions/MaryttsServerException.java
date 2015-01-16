package mk.ukim.finki.synthesizer.backend.exceptions;

public class MaryttsServerException extends RuntimeException {

	/**
	 * Generated Serial version UI id.
	 */
  private static final long serialVersionUID = 6708833399360927313L;

  public MaryttsServerException() {
  	super();
  }
  
  public MaryttsServerException(String message) {
  	super(message);
  }
  
  public MaryttsServerException(String message, Throwable exception) {
  	super(message, exception);
  }
}
