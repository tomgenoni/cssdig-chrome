// Truncate text in the middle to some length limit.

function truncateMiddle(str,length_limit) {
    var splice_length = Math.round(length_limit / 2);
    if (str.length > length_limit ) {
        var str_back = str.slice(-splice_length);
        var str_front = str.slice(0,splice_length);
        var truncated_str = str_front + " &hellip; " + str_back;
        return truncated_str;
    } else {
        return str;
    }
}

// Trim white space.
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

// Remove new lines, tabs, double spaces.
function minify(string) {
    new_string = string.replace(/(\r\n|\n|\r)/gm," ").replace(/\s{2,}/g, " ");
    return new_string;
}
// Check if URL is an external call.
function isExternal(url) {
    var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
    if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
    if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
    return false;
}
