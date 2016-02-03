

define(function (require) {
    "use strict";
    require('jquery');
    var global = require('common/global');
    return {
        http : function (url, data, options) {
            /**
             * @请求url
             * @data 请求参数 json格式
             * @options  {object} 可配置参数
             */
            data = data || {};
            options = options || {};
            var myOptions = {
                "eUrl": options.eUrl || "",//调用接口错误返回的url地址
                "eCallback": options.eCallback,//调用错误回调函数
                "eMessage": options.eMessage || "",//错误信息
                "project": options.project || "exam",
                "dataType": options.dataType || "json",
                "type": options.type || "GET",
                "jsonpCallback": options.callName || "jsonpcallback",
                "timeout": options.timeout || 20000
            };
            var dtd = $.Deferred(),
                thisUrl = url ? url : "/js/tempData/devData.json";
            $.ajax({
                url: thisUrl,
                dataType: myOptions.dataType,
                data: data,
                jsonp:myOptions.jsonpCallback,
                cache: false,
                timeout : myOptions.timeout,
                type :myOptions.type
            })
                .done(function (json) {
                    if (json && !json.error) {
                        dtd.resolve(json);
                    } else {
                        dtd.reject(json);
                        if((!json)||json.error) {
                            var reason = json.error.reason || json.error.message,
                                errorInfo = "";
                            if (!reason || reason === "undefined" || reason === "null") {
                                errorInfo = global.errorInfo;
                            } else {
                                errorInfo = reason;
                            }
                        }
                        return false;
                    }
                })
                .fail(function (json) {

                })
                .always(function () {

                });
            return dtd.promise();
        }
    };
});