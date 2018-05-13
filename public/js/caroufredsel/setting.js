(function($) {
	'use strict';	
			$('#foo4').carouFredSel({
					prev: '#prev4',
					next: '#next4',
					auto: false,
					responsive: true,
					width: '100%',
					scroll: 4,
					items: {
						width: 300,
					height: 'auto',	//	optionally resize item-height
						visible: {
							min: 2,
							max: 8
						}
					}
				});
})(jQuery);