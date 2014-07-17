var Utils = (function() {
    var _config = {
        GEO_API_KEY: "AIzaSyBOirZtEdVTP0AnOwFT-WmMXgqYTktoasE",
        GOOGLE_GEO_API: "https://maps.googleapis.com/maps/api/geocode/json"
    };

    _ajaxCall = function(method, url, params, async, callback) {
        var xmlHttp;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var paramsJoined = "";
        if (params && (this.getDataType(params) === "Object")) {
            for (var key in params) {
                paramsJoined += key + "=" + params[key] + "&";
            }
        }

        if (paramsJoined !== "") {
            paramsJoined = paramsJoined.substring(0, paramsJoined.length - 1);
        }

        if (url.indexOf("?") === -1) {
            url += "?";
        }

        xmlHttp.open(method, url + paramsJoined, async);
        xmlHttp.send();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    callback(xmlHttp.responseText);
                } else {
                    return false;
                }
            }
        }
    };

    _getUserLocationCallback = function(data) {
        if (data) {
            data = JSON.parse(data);
            if (data.status === "OK") {
                var loc = data.results[0].formatted_address.split(",");
                var locLen = loc.length;
                var city = loc[locLen-3].trim();
                var country = loc[locLen-1].trim();
                console.log(city + ", " + country);
            }
        }
    }

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

    getUserLocation = function() {
        var self = this
                , geoLocation = navigator.geolocation;
        if (!geoLocation) {
            return false;
        }

        geoLocation.getCurrentPosition(function(pos, self) {
            var lat = pos.coords.latitude
                    , lng = pos.coords.longitude
                    , resp = ""
                    ;

            _ajaxCall("GET", _config["GOOGLE_GEO_API"], {"latlng": lat + "," + lng, "key": _config["GEO_API_KEY"]}, true, _getUserLocationCallback);
        });
    };

    return {getDataType: getDataType, getUserLocation: getUserLocation};
}());