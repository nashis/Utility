var clientInfo = (function() {
    getCPU = function() {
        var cpu = "Unknown";
        if (typeof (navigator.cpuClass) !== "undefined") {
            cpu = navigator.cpuClass;
            switch (cpu) {
                case "x86" :
                    cpu += " - x86 Compatible (Intel, AMD, Cyrix etc.)";
                    break;
                case "PPC" :
                case "68K" :
                    cpu += " - Motorola";
                    break;
                case "Alpha" :
                    cpu += " - Digital";
                    break;
                case "Other" :
                    cpu += " - Other, including Sun SPARC";
            }
        }
        return cpu;
    };

    getPlat = function() {
        var plat = "Unknown";
        if (typeof (navigator.platform) != "undefined") {
            plat = navigator.platform;
            switch (plat) {
                case "Windows" :
                case "Win32" :
                    plat += " - Windows 32-bit platform";
                    break;
                case "Win16" :
                    plat += " - Windows 16-bit platform";
                    break;
                case "WinCE" :
                    plat += " - Windows CE platform";
                    break;
                default :
                    plat += " - Other";
            }
        }
        return plat;
    };

    getOS = function() {
        var os = "Unknown";
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('linux') >= 0)
            os = "Linux";
        else if (userAgent.indexOf('x11') >= 0)
            os = "Unix";
        else if (userAgent.indexOf('mac') >= 0)
            os = "Mac";
        else if (userAgent.indexOf('win') >= 0 || userAgent.indexOf("16bit") >= 0) {
            var ver = "Unknown";
            if (userAgent.indexOf("win95") != -1 || userAgent.indexOf("windows 95") != -1)
                ver = "Windows 95";
            else if (userAgent.indexOf("win 9x 4.90") != -1)
                ver = "Windows ME";
            else if (userAgent.indexOf("win98") != -1 || userAgent.indexOf("windows 98") != -1)
                ver = "Windows 98";
            else if (userAgent.indexOf("windows nt 5.0") != -1)
                ver = "Windows 2000";
            else if (userAgent.indexOf("windows nt 5.1") != -1)
                ver = "Windows XP";
            else if (userAgent.indexOf("windows nt 5.2") != -1)
                ver = "Windows 2003";
            else if (userAgent.indexOf("windows nt 6.0") != -1)
                ver = "Windows Vista";
            else if (userAgent.indexOf("winnt") != -1 || userAgent.indexOf("windows nt") != -1)
                ver = "Windows NT";
            os = "Windows - " + ver;
        }
        return os;
    };

    getBrowserName = function() {
        var uAgent = navigator.userAgent.toLowerCase();
        var browser = "Unknown", version = 0, i = -1;

        if ((i = uAgent.indexOf('konqueror')) >= 0)
            browser = "Konqueror";
        else if ((i = uAgent.indexOf('chrome')) >= 0)
            browser = "Chrome";
        else if ((i = uAgent.indexOf('safari')) >= 0)
            browser = "Safari";
        else if ((i = uAgent.indexOf('opera')) >= 0)
            browser = "Opera";
        else if ((i = uAgent.indexOf('webtv')) >= 0)
            browser = "WebTV";
        else if ((i = uAgent.indexOf('icab')) >= 0)
            browser = "iCab"
        else if ((i = uAgent.indexOf('msie')) >= 0)
            browser = "msie";
        else if ((i = uAgent.indexOf('omniweb')) >= 0)
            browser = "OmniWeb";
        else if ((i = uAgent.indexOf('compatible')) < 0) {
            browser = "Netscape Navigator";
            version = uAgent.charAt(8);
            if (typeof (navigator.product) != "undefined") {
                browser = "Mozilla";
                tmp = navigator.userAgent.match(/([Mozilla ]?Fire\w+)\/([\w|\+.]+)/);
                if (tmp) {
                    browser = tmp[1];
                    version = tmp[2];
                } else {
                    tmp = navigator.userAgent.match(/rv:([\w|\+.]+)/);
                    if (tmp) {
                        tmp = tmp[0];
                        version = tmp.substr(3);
                    }
                }
            }
        }
        if (i && !version)
            version = new Number(RegExp.$1);//uAgent.charAt(i + browser.length + 1);
        if (browser == "msie")
            browser = "Internet Explorer";
        if (version)
            browser += " " + version;
        return browser;
    }

    return {getCPU: getCPU, getPlat: getPlat, getOS: getOS, getBrowserName: getBrowserName};
}());