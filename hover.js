//ωδ
$(document).ready(function(){
	for(let x = 0; x < 8; x++){
		$('#hover').append('<div class="hover-row" id="' + x + '"></div>');
		for (let y = 0; y < 8; y++){
			$('.hover-row').last().append(
				'<div class="hover-square"><p><strong>ω: ' + (x + 1) + '<br>δ: ' + (y + 1) + '</strong></p></div>'
			);
		}
	}
});
