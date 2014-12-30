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

    dig_head.append("<link href='"+chrome.extension.getURL('css/cssdig.css') + "' rel='stylesheet' type='text/css'>");

    // Inject combined js.
    dig_head.append("<script src='"+chrome.extension.getURL('js/cssdig.js')+"'></script>");

});