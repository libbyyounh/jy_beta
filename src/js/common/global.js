
define(function (require) {

    'use strict';

    // var baseParas = {

    //     //测试环境
    //     test: ''

    //     //生产环境
    //     //test: ''
    // };
    return {
        apiPath: {
       
        },

        isFunction: function (functionToCheck) {
            //判断目标是否是function对象
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        },

        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = decodeURI(window.location.search).substr(1).match(reg);
            if (r !== null) {
                return r[2];
            }
            return null;
        },

        //获取指定名称的cookie的值
        getCookie: function (objName) {
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] === objName) {
                    return decodeURI(temp[1]);
                }
            }
        },

        //格式化时间戳
        dateFormat: function (fmt, ts) {
            var date = new Date(ts);

            function pad(value) {
                return (value.toString().length < 2) ? '0' + value : value;
            }

            return fmt.replace(/([a-zA-Z])/g, function (_, fmtCode) {
                switch (fmtCode) {
                    case 'y':
                        return date.getFullYear();
                    case 'm':
                        return pad(date.getMonth() + 1);
                    case 'd':
                        return pad(date.getDate());
                    case 'D':
                        var dd = ["日", "一", "二", "三", "四", "五", "六"];
                        return dd[date.getDay()];
                    case 'h':
                        return pad(date.getHours());
                    case 'i':
                        return pad(date.getMinutes());
                    case 's':
                        return pad(date.getSeconds());
                }
            });
        }
    };
})
;