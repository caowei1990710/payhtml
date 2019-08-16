/** 全局ajax对象 */
var ajax = new Object();
var ajaxCore = null;
/** 全局提示框对象 */
toastr.options = {
    "closeButton": false,
    "debug": false,
    "positionClass": "toast-top-full-width",
    "onclick": null,
    "showDuration": "3000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
/**
 * @see 创建ajax核心对象,兼容浏览器有：IE6,7,8,9，谷歌，火狐，欧朋，360极速，360安全，苹果，搜狗，遨游，猎豹，腾讯
 * @return XMLHttpRequest
 */
ajax.getCore = function() {
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
        if (xmlHttp.overrideMimeType) {
            xmlHttp.overrideMimeType("text/xml");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
    }
    if (!xmlHttp) {
        toastr.error("\u8bf7\u4f7f\u7528IE\u6d4f\u89c8\u5668!");
    }
    return xmlHttp;
};

/**
 * @see 处理ajax参数
 * @param param 参数
 * @return String
 */
ajax.getParam = function(param) {
    var randomStr = "ajaxParamRandom=" + Math.random();
    if (param == null || param == "") {
        return randomStr;
    }
    var str = "";
    if (typeof(param) == "object") {
        for (var key in param) {
            str += key + "=" + param[key] + "&";
        }
        str = (str.length > 0 ? str.substring(0, str.length - 1) : str);
    } else {
        str = param;
    }
    return str + "&" + randomStr;
};

/**
 * @see ajax的回调函数
 * @param callback 用户自定义回调函数
 * @param url 请求的url
 */
ajax.doCallback = function(callback, url) {

    if (ajaxCore.readyState == 4) {
        if (ajaxCore.status == 200) {
            if (callback == null) {
                return;
            }
            ajaxLoading(2);
            var result = new String(ajaxCore.responseText);
            if (null != result && result != "") {
                if (result == "null") {
                    callback(null);
                } else {
                    var backObject = null;
                    if (result == "true" || result == "false") {
                        backObject = eval(result);
                    } else if (!isNaN(result)) {
                        backObject = parseFloat(result);
                    } else if ((result.substring(0, 1) == "[" && result.substring(result.length - 1, result.length) == "]") ||
                        (result.substring(0, 1) == "{" && result.substring(result.length - 1, result.length) == "}")) {
                        backObject = eval("(" + result + ")");
                    } else {
                        backObject = result;
                    }
                    if (backObject.code != 200) {
                        toastr.error(backObject.msg);
                    }
                    if (backObject.code == 302) {
                        setTimeout(function() {
                            wxLogin();
                        }, 3000)
                    }
                    if (backObject.code == 304) {　
                        setTimeout(function() {
                            history.back(-1);
                            location.href = "/index.html"
                        }, 3000)
                    }
                    callback(backObject);
                }
            } else {
                callback(result);
            }

        } else if (ajaxCore.status == 0 || ajaxCore.status == 12029) {
            toastr.warning("\u627e\u4e0d\u5230\u670d\u52a1\u5668\uff01");
        } else if (ajaxCore.status == 404) {
            toastr.warning("\u627e\u4e0d\u5230\u8d44\u6e90");
        } else if (ajaxCore.status == 405) {
            toastr.error("\u8bf7\u6c42\u65b9\u5f0f\u9519\u8bef");
        } else if (ajaxCore.status == 500) {
            toastr.error("\u670d\u52a1\u5668\u6545\u969c\u000d\u000a");
        }

    }
};

/**
 * ajax 加载层
 * @param flag 1显示 2:隐藏
 */
ajaxLoading = function(flag) {
    if (1 == flag) {
        $(".loading_down_box").show();
    } else {
        $(".loading_down_box").hide();
    }
};


/**
 *根据参数名取参数值
 * @param name 参数名
 * @returns {string}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
