define(function (require) {
    'use strict';
    require('jquery');
	require('weui_js');
    var global = require('common/global'),
        http = require('common/http');
	console.log("index");
	
	setTimeout(function(){
		$.alert("自定义的消息内容");
	},2000);
});
