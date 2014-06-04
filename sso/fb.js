/** With facebook's common textareas, the highlight textarea plugin gets left on the screen when the user submits a comment. Let's fix that.**/
console.log("e' SSO for facebook active");
$(document).keyup(function(e) {
    if(e.which == 13) {
		$('.jqhta_highlighter').empty();
    }
});