/* 
 * JQuery Save and Restore Caret Library
 * The author of this extension is greatful to the help from IRC user 
 * innoCV, though they insist they were merely modifying this code
 * from a StackExchange answer and did not require attribution.
 * Is is nontheless one of the few libraries available today
 * which can save and restore carets in contenteditable HTML elements
 * with any reliability.
 * All authorial credit should be held by innoCV and the original author and all
 * rights reserved to them as well.
 * The code is assumed to be open source and therefore distributed here
 * in good faith under the MIT Licence. (http://opensource.org/licenses/MIT)
*/
(function($){
  $.fn.saveCaret = function(){
    var element = $(this).get(0);
    $(this).data('caret', saveSelection(element));
  }
  $.fn.restoreCaret = function(){
    var element = $(this).get(0);
    if( $(this).data('caret') ){
      restoreSelection(element, $(this).data('caret'));
    }
  }
  var saveSelection, restoreSelection;

  if( window.getSelection && document.createRange ){
    saveSelection = function(containerEl){
      var range = window.getSelection().getRangeAt(0);
      var preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(containerEl);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      var start = preSelectionRange.toString().length;

      return {
        start: start,
        end: start + range.toString().length
      }
    };

    restoreSelection = function(containerEl, savedSel){
      var charIndex = 0, range = document.createRange();
      range.setStart(containerEl, 0);
      range.collapse(true);
      var nodeStack = [containerEl], node, foundStart = false, stop = false;

      while( !stop && (node = nodeStack.pop()) ){
        if( node.nodeType == 3 ){
          var nextCharIndex = charIndex + node.length;
          if( !foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex ){
            range.setStart(node, savedSel.start - charIndex);
            foundStart = true;
          }
          if( foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex ){
            range.setEnd(node, savedSel.end - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          var i = node.childNodes.length;
          while( i-- ){
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  } else if( document.selection && document.body.createTextRange ){
    saveSelection = function(containerEl){
      var selectedTextRange = document.selection.createRange();
      var preSelectionTextRange = document.body.createTextRange();
      preSelectionTextRange.moveToElementText(containerEl);
      preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
      var start = preSelectionTextRange.text.length;

      return {
        start: start,
        end: start + selectedTextRange.text.length
      }
    };

    restoreSelection = function(containerEl, savedSel){
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(containerEl);
      textRange.collapse(true);
      textRange.moveEnd("character", savedSel.end);
      textRange.moveStart("character", savedSel.start);
      textRange.select();
    };
  }
})(jQuery);