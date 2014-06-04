//alert(document.designMode);

var wordSet = [
  "be", 
  "being",
  "been",
  "am", 
  "is", "isn't", "isnt", "tis", "'tis",
  "are", "aren't", "arent",
  "was", "wasn't", "wasnt", "wast", 
  "were", "wert", "weren't", "werent",

  "I'm", 
  "you're", "youre", "we're", "they're", "theyre",
  "he's", "she's", "it's", "hes", "shes", "its", 
  "there's", "here's", "theres", "heres",
  "that's", "thats",

  "ain't", "aint", "hain't", "haint",
  "whatcha"
];
var eprime_enabled;

/** We handle [contenteditables] differently from textareas, due to differences in each 
library's capabilities.**/
function highlightWordForms() {
  //First we'll handle textareas
  $('textarea').highlightTextarea({
    words: wordSet,
    caseSensitive: false,
    matchWholeWord: true
  });

  // For contenteditables, we'll first highlight the desired wordset..
  $('[contenteditable="true"]').highlight(wordSet, { wordsOnly: true, caseSensitive: false } );
  // .. then we'll add a listener to input events which keeps the highlight up-to-date
  $('[contenteditable="true"]').on('input', function(event) {
    if(eprime_enabled) { //checking whether we are enabled after each input is easer than removing the listener!
      $(event.target).saveCaret();
      $(event.target).unhighlight();
      $(event.target).highlight(wordSet, { wordsOnly: true, caseSensitive: false } );
      $(event.target).restoreCaret();
    }
  });

  console.log("Highlighting e' word forms");
}

/** Remove highlights from both contenteditables and textareas when the user disables the extension**/
function removeHighlights() {
  $('[contenteditable]').unhighlight();
  $('textarea').highlightTextarea("destroy");
  console.log("Destroying e' highlights");
}

/** We should listen very carefully for messages from the background script
in case the user clicks the button to disable the extension**/
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.estatus===true) {
    if (!eprime_enabled) {
      eprime_enabled = true;
      highlightWordForms();
    }
  } else {
    if (eprime_enabled){
      eprime_enabled = false;
      removeHighlights();
    }
  }
});

/** When the DOM is ready, we'll send a message to the background script which will reply
 to tell us if we are enabled or not.**/
$(document).ready(function() { 
  chrome.runtime.sendMessage({query: "isEEnabled"}, function(response) {
    if (response) {
      eprime_enabled = true;
      highlightWordForms();
    } else {
      eprime_enabled = false;
      removeHighlights();
    }
  });
});