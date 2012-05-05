// ==UserScript==
// @name MTS Check for thief
// @description Script check MTC ru balance for thief lines
// @author Khripkov Denis
// @email denisx@denisx.ru
// @site http://www.denisx.ru
// @license MIT
// @version 1.0
// @date 2012
// @require		http://yandex.st/jquery/1.7.2/jquery.min.js
// ==/UserScript== 

function main() {
	if ( document.title.match(/Детализация/) != null || document.location.href.match(/mts[^\/]*\.html/) != null ){
		if ( typeof $ != 'undefined' ){
			if ( $('table tr.OutOfBlock').length ){
				var red=0;
				var red_summ=0;
				$('tr.OutOfBlock').each(function(){
					var t = $(this);
					var s = $('td:eq(4)',t).text(); 
					var r = s.match(/--/);
					if ( r == null ){
						$('td',t).css({background: 'yellow'});
					}
					var td_last = $('td:eq(10)',t); 
					if ( r != null && td_last.text() != '0,0000' ){
						$('td',t).css({background: 'red'});
						red++;
						red_summ+=Number(td_last.text().replace(/,/,'.'));
					}
				});
				red_summ=Math.round(red_summ);
				if (red>0){
					var status=$('<div class="status"></div>').appendTo('body');
					status.html('Подозрительных строк: <b>'+ red + '</b><br/>Вероятный ущерб: <b>'+ red_summ + '</b>');
					status.css({
						position:'absolute'
						,top:'1em'
						,right:'1em'
						,border:'1px solid'
						, padding: '1em'
						, background: 'aqua'
					});
				}
				<!-- Yandex.Metrika counter -->
				$('<img src="//mc.yandex.ru/watch/154772" style="position:absolute; left:-9999px;" alt="" 	/>').appendTo('body');
				<!-- /Yandex.Metrika counter -->

			}
		}
	}
}
main();

