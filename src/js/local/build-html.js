// Builds the different HTML parts as needed.

// Gets the link/style data.
function getData() {

    var links = [];
    var cssArr = [];

    // To avoid mismatches we're running sychonously.
    // TODO: find async way to do this so it doesn't block browser.
    $.ajaxSetup({async:false});

    // Find all stylesheet <link>s and <style> blocks.
    $('link, style', window.parent.document).each(function(){
        if ( $(this).attr("rel") == "stylesheet" ) {
            var link_href = $(this).attr("href");
            links.push(link_href);
        } else if ( $(this).is( "style" ) ) {
            var style = $(this).text();
            // If <style> is not empty.
            if ( !((jQuery.trim(style)).length==0) ) {
                links.push("styleblock:" + style)
            }
        }
    });

    $.each(links, function(i,value){

        // If it's a styleblock.
        if (value.substring(0, 11) == "styleblock:") {
            cleanStyle = value.replace("styleblock:", "");
            cssArr.push(minify(cleanStyle));
        } else if ( isExternal(value) ) {
            // If the external URL starts with "//";
            if (value.substring(0, 2) == "//") {
                value = location.protocol + value;
            }

            // Remote call if needed.
            var proxy = 'https://cssdig.com/p/';
            var proxy_url = proxy + '?url=' + value;

            $.getJSON( proxy_url, function(data){
                // Only add remote CSS if we get a 200 header.
                if ( data.status.http_code == 200 && data.contents != null) {
                    var remote_css = data.contents;
                    cssArr.push(minify(remote_css));
                } else {
                    cssArr.push("error");
                }
            });

        } else {
            $.get(value, function(data) {
                cssArr.push(minify(data));
            }).error(function() {
                cssArr.push("error");
            });
        }
    });

    linksAndValues = new Object();

    for(var i=0;i<links.length;i++){
      linksAndValues[links[i]]=cssArr[i];
    }

    // Contains the link href (if it's a link) and the content of the link.
    // Also contains the style blocks.
    return linksAndValues
}

// Show the form to determine what css the user wants to combine.
function displayForm() {
    var form_data_arr = getData();
    var dig_iframe = $('#dig-iframe').contents();
    var inputID = 0;

    $.each(form_data_arr, function(key, value){
        if ( value == "error") {
            var fail_li = "<li>" + truncateMiddle(key,60) + "</li>";
            dig_iframe.find("#cssdig-form .fail").append(fail_li);
        } else {
            var success_li = "<li><input id='"+inputID+"' type='checkbox' value='"+ encodeURI(key) +"' checked/><label for='"+inputID+"'>" + truncateMiddle(key,60)  + "</label></li>";
            dig_iframe.find("#cssdig-form .success").append(success_li);
        }
        inputID++
    });

    // If failures exist, show them.
    if ( dig_iframe.find("#cssdig-form .fail li").length ) {
        dig_iframe.find("#cssdig-form .fail").show();
    }

    // If successes exist, show them, otherwise show empty message.
    if ( dig_iframe.find("#cssdig-form .success li").length ) {
        dig_iframe.find("#cssdig-form .success").show();
    } else {
        dig_iframe.find('.js-dig').hide();
        dig_iframe.find('#empty-message').show();
    }

    // Remove the loading icon.
    // TODO: make this animated.
    $("#dig-blanket-loader").remove();

    // This sets up animation.
    var chrome_height = dig_iframe.find('#cssdig-chrome').height();
    dig_iframe.find('#cssdig-chrome').height(chrome_height).css("visibility","visible");

}

// Build the html for the report.
function buildHTML(property_array, declaration_array) {

    var property_counter = 1;

    $.each(property_array, function(i) {

        var property_cur = property_array[i];
        var property_next = property_array[i + 1];

        if (property_cur == property_next ) {
            property_counter++
        } else {

            var entry_html = '<div class="entry">';
            entry_html += '<div class="property">';
            entry_html += '<div class="property__name">' + property_cur + '</div>';
            entry_html += '<div class="property__count">' + property_counter + '</div>';
            entry_html += '</div>';

            entry_html += '<ul class="property-list is-hidden">'

            var declaration_counter = 1

            for ( i = 0; i < property_counter; i++) {

                var declaration_cur = declaration_array[i];
                var declaration_next = declaration_array[i + 1];

                if (declaration_cur == declaration_next ) {
                    declaration_counter++
                } else {

                    entry_html += '<li>'
                    if ( property_cur == "background" || property_cur == "background-color" ) {
                        entry_html += '<div class="property-list__color" style="' + declaration_cur + '"></div>'
                    }
                    if ( property_cur == "color" ) {
                        entry_html += '<div class="property-list__color" style="background-' + declaration_cur + '"></div>'
                    }
                    entry_html += '<div class="property-list__item">' + declaration_cur + '</div>'
                    entry_html += '<div class="property-list__count">' + declaration_counter + '</div>'
                    entry_html += '</li>'

                    declaration_counter = 1
                }
            }

            entry_html += '</ul>';
            entry_html += '</div>';

            $('#dig-iframe').contents().find("#report-properties .content").append(entry_html);

            declaration_array.splice(0, property_counter);
            property_counter = 1;
        }
    })
}

function concatenateCSS(cssSelected) {
    var css = "";

    $.each(cssSelected, function(i, value){
        css = css + linksAndValues[Object.keys(linksAndValues)[value]];
    });

    parseCSS(css);
}

function parseCSS(css) {
    // Ths is needed because cssbeautify fails to format @font-face blocks.
    var re_font_face = /@font-face/gi;
    css = css.replace(re_font_face, ".at-font-face");

    var re_no_comments = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gi;
    css = css.replace(re_no_comments, "");

    // Beautifying it here allows to easily grab declarations as they are isolated.
    var temp_beautified_css = cssbeautify(css, {
        autosemicolon: true
    });

    var declaration_array = []
    var property_array = []
    var regex_declarations = /^\s{1,}[^\/]+.*:.*;/gi;
    // Split beautified css into lines.
    var lines = temp_beautified_css.split(/\r?\n/);

    // For each line find the declaration line and add it to the array.
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].match(regex_declarations)) {
            dec = trim(lines[i]);
            declaration_array.push(dec)
        }
    }

    // Sort declarations.
    declaration_array.sort()

    // Pull out just the properties from the declarations.
    for (i=0;i < declaration_array.length; i++) {
        prop = declaration_array[i].replace(/: .*/g,"")
        property_array.push(prop);
    }

    // We're restoring a hack, replacing temp class with real @font-face.
    var re_restore_font_face = /.at-font-face/gi;
    temp_beautified_css = temp_beautified_css.replace(re_restore_font_face, "@font-face");

    // Create final beautifed css from the temp version (that has collapsed @font-face declaration.)
    var final_beautified_css = cssbeautify(temp_beautified_css, {
        autosemicolon: true
    });

    // Build out the html for Properties and Counts.
    buildHTML(property_array, declaration_array);

    // Dump the final beautifed css.
    var syntax_highlighted_css = syntaxHighlight(final_beautified_css);

    setTimeout(function(){
        $('#dig-iframe').contents().find("#report-css pre").append(syntax_highlighted_css);
    }, 500);

    // Insert line length.
    $('#dig-iframe').contents().find("#line-length").text(": " + lines.length + " lines");

    // Calculate number of properties.
    var propertyLength = $('#dig-iframe').contents().find(".content .entry").length;
    $('#dig-iframe').contents().find("#property-length").text(": "+ propertyLength);

    // Bind the highlighting and controls.
    bindControls();

}

// Onload display the form.
displayForm();
