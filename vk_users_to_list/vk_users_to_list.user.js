// ==UserScript==
// @name VK users to list
// @author Khripkov Denis
// @email denisx@denisx.ru
// @site http://www.denisx.ru
// @license MIT
// @version 1.0
// @date 2012
// @include		http://vk.com/*
// @require		http://yandex.st/jquery/1.7.2/jquery.min.js
// ==/UserScript== 

var m={};

function setButtons(){
		$('.submit_reply').each(function(){
			var t3=$(this);
			if ( !t3.hasClass('selected') ){
				var button=$('<span>',{'class':'set-names',text:'Вставить'}).appendTo(t3);
				var button_del=$('<span>',{'class':'del-names',text:'Убрать'}).appendTo(t3);
				var button_clear=$('<span>',{'class':'clear-names',text:'Очистить'}).appendTo(t3);
				t3.addClass('selected');

				button.click(function(){
					var t4=$(this);
					var textarea=t4.parents('.reply_form').find('textarea');
					var m_text='';
					var j=0;
					for(var i in m){
						if ( j>0 ){
							m_text+=', ';
						}
						m_text+='['+i+'|'+m[i]+']';
						j++;
					}
					m_text+='  ';
					textarea.val( m_text + textarea.val() );
				});
				button.css({'border-bottom':'1px dotted #aaa', cursor:'pointer', position: 'relative', margin:'-20px 0 0 170px'});

				button_del.click(function(){
					var t4=$(this);
					var textarea=t4.parents('.reply_form').find('textarea');
					textarea.val( '' );
				});
				button_del.css({'border-bottom':'1px dotted #aaa', cursor:'pointer', position: 'relative', margin:'-20px 0 0 20px'});

				button_clear.click(function(){
					var t4=$(this);
					m={};
					$('span.pseudo').removeClass('selected');

				});
				button_clear.css({'border-bottom':'1px dotted #aaa', cursor:'pointer', position: 'relative', margin:'-20px 0 0 20px'});

			}
		});

		setTimeout(setButtons,2000);
	}

function main(){

	$('a.author').each(function(){
		var t=$(this);
		var span=$('<span>',{'class':'pseudo',text:' copy'}).insertBefore(t.parent());

		span.click(function(){
			var t2=$(this);
			var user=t.attr('href').replace(/\//,'');
			if (t2.hasClass('selected')){
				delete m[user];
				t2.text(' copy');
			}else{
				m[user]=t.text();
				t2.text(' copy: yes');
			}
			t2.toggleClass('selected');

		});
		span.css({'border-bottom':'1px dotted #aaa', cursor:'pointer', position: 'absolute', margin:'75px 0 0 -60px','z-index':1000});
	});

	setButtons();

	<!-- Yandex.Metrika counter -->
	$('<img src="//mc.yandex.ru/watch/154772" style="position:absolute; left:-9999px;" alt="" />').appendTo('body');
	<!-- /Yandex.Metrika counter -->


}
main();

