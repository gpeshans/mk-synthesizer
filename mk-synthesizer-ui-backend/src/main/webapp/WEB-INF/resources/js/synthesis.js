
$(document).ready(function ($) {
  
  $('input').on("click", function(event) {
    
    var data = {};
    
    data['inputText'] = 'Hello how are you?';
    data['inputType'] = 'blabla';
    data['selectedVoice'] = 'hahahaha';
    
      $.ajax({
        type: 'POST',
        url: '/Synthetizer/synthesize',
        data: data
      });
  });

}); 