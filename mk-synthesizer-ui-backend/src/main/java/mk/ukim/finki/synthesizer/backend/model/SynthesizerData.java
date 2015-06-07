package mk.ukim.finki.synthesizer.backend.model;

/**
 * Synthesizer data model.
 */
public class SynthesizerData {

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
