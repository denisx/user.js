// ==UserScript==
// @name Form data saver
// @description Save data fields to browser localStorage, unique for page URI. You can Save, Restore and Clear them.
// @author Khripkov Denis
// @email denisx@denisx.ru
// @site http://www.denisx.ru
// @license MIT
// @version 1.0
// @date 2012
// @include		*
// @require		http://yandex.st/jquery/1.7.2/jquery.min.js
// ==/UserScript== 

function form_data_saver_init(){

//	console.log('in form_data_saver_init');

	var lh=location.href;
	if ( localStorage ) {
		var div=$('<div></div>',{
			'class':'localStorage'
		})
			.appendTo('body')
			.css({position:'absolute', outline:'1px solid', right:'1em', top:'1em', padding:'0 1em', background: 'white', zIndex: '1000001' })
		;
		$('<p/>',{'class':'save',html:'<span>save</span>'})
			.appendTo(div)
			.bind('click',function(){
				save_data();
			})
		;
		$('<p/>',{'class':'restore',html:'<span>restore</span>'})
			.appendTo(div)
			.bind('click',function(){
				restore_data();
			})
		;
		$('<p/>',{'class':'clear',html:'<span>clear</span>'})
			.appendTo(div)
			.bind('click',function(){
				clear_data();
			})
		;
		$('span',div).css({'borderBottom': '1px dashed', cursor: 'pointer'});

//		console.log('init true');
	}else{
//		console.log('init false');
	}
	
	function save_data(){
	var path=location.href;
	$('form').each(function(i){
		var form=$(this);
		$('input:not([type=hidden]), textarea, select',form).each(function(j){
			var t=$(this);
			var s='';

			s+='__form_';
			s+=(form.attr('id')!=null)? form.attr('id'): i;
			s+='__el_';
			s+=(t.attr('id')!=null)? t.attr('id'): j;

			var val=t.val();
			if ( t.is('[type=radio]') || t.is('[type=checkbox]') ){
				val=(t.attr('checked')!=null)? 1: 0;
			}
			localStorage.setItem(path+s,val);

//			console.log('save', s, val);
		});
	});
}

function restore_data(){
	var path=location.href;
	$('form').each(function(i){
		var form=$(this);
		$('input:not([type=hidden]), textarea, select',form).each(function(j){
			var t=$(this);
			var s='';

			s+='__form_';
			s+=(form.attr('id')!=null)? form.attr('id'): i;
			s+='__el_';
			s+=(t.attr('id')!=null)? t.attr('id'): j;

			if ( localStorage.getItem(path+s) != null ){
				t.focus();
				if ( t.is('[type=radio]') || t.is('[type=checkbox]') ){
					if ( localStorage.getItem(path+s) == 1 ){
						t.click();
					}
				}else{
					t.val( localStorage.getItem(path+s) );
				}
				t.blur();
			}

//			console.log('restore', s, localStorage.getItem(path+s));
		});
	});
}

function clear_data(){
	var path=location.href;
	$('form').each(function(i){
		var form=$(this);
		$('input:not([type=hidden]), textarea, select',form).each(function(j){
			var t=$(this);
			var s='';

			s+='__form_';
			s+=(form.attr('id')!=null)? form.attr('id'): i;
			s+='__el_';
			s+=(t.attr('id')!=null)? t.attr('id'): j;

			localStorage.removeItem(path+s);

//			console.log('clear', s);
		});
	});
}
	<!-- Yandex.Metrika counter -->
	$('<img src="//mc.yandex.ru/watch/154772?script=form_data_saver" style="position:absolute; left:-9999px;" alt="" />').appendTo('body');
	<!-- /Yandex.Metrika counter -->

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ form_data_saver_init +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

