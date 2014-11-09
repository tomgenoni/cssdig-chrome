$.get( chrome.extension.getURL('html/dig.html'), function( data ) {

    // Add a class to the html element of the hosting page.
    $('html').addClass('dig');

    // Full screen white opacity.
    $('<div id="dig-blanket"/>').appendTo('body');

    // Adding loader.
    $('<div id="dig-blanket-loader"/>').appendTo('#dig-blanket');

    // Inject iframe.
    $('<iframe id="dig-iframe"/>').appendTo('#dig-blanket');

    // Add contents of form into the iframe.
    $('#dig-iframe').contents().find('body').append(data);

    // Inject the css and javascript into the dig iframe.
    var dig_head = $('#dig-iframe').contents().find('head');

    dig_head.append("<link href='"+chrome.extension.getURL('css/dig.css') + "' rel='stylesheet' type='text/css'>");

    // Third party libs.
    dig_head.append("<script src='"+chrome.extension.getURL('js/lib/jquery.min.js')+"'></script>");
    dig_head.append("<script src='"+chrome.extension.getURL('js/lib/cssbeautify.js')+"'></script>");
    dig_head.append("<script src='"+chrome.extension.getURL('js/lib/jquery.highlight.js')+"'></script>");

    // Local scripts to drive the interactions.
    dig_head.append("<script src='"+chrome.extension.getURL('js/local/helpers.js')+"'></script>");
    dig_head.append("<script src='"+chrome.extension.getURL('js/local/build-html.js')+"'></script>");
    dig_head.append("<script src='"+chrome.extension.getURL('js/local/button-control.js')+"'></script>");
    dig_head.append("<script src='"+chrome.extension.getURL('js/local/css-highlight.js')+"'></script>");

});