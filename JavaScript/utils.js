var Utils = (function() {
    getDataType = function(o) {
        var TYPES = {
            "[object Null]": "Null",
            "[object Undefined]": "Undefined",
            "[object Number]": "Number",
            "[object String]": "String",
            "[object Boolean]": "Boolean",
            "[object Object]": "Object",
            "[object Array]": "Array",
            "[object Function]": "Function",
            "[object Date]": "Date",
            "[object RegExp]": "RegExp",
            "[object Error]": "Error"
        };

        return TYPES[Object.prototype.toString.call(o)];
    };
    
    return {getDataType: getDataType};
}());