// Add controls to report data to show/hide/reveal items.

function bindControls() {

    var dig_iframe = $('#dig-iframe').contents();

    // Click into report data to reveal locations in Combined CSS.
    dig_iframe.find('#report-properties').on('click', '.property-list li', function() {
        if ( $(this).hasClass("active") ) {
            dig_iframe.find("#report-css pre").unhighlight();
            $(this).removeClass("active");
            dig_iframe.find(".ruleset").show();
        } else {
            dig_iframe.find('.property-list li').removeClass("active");
            $(this).addClass("active");
            var target = $(this).find(".property-list__item").eq(0).text();
            dig_iframe.find("#report-css pre").unhighlight();
            dig_iframe.find("#report-css pre").highlight(" " + target, { caseSensitive: true });
            dig_iframe.find(".ruleset").hide();

            setTimeout(function(){
                dig_iframe.find(".highlight").each(function(){
                    $(this).closest(".ruleset").show();
                })
            },1)
        }

        if ( dig_iframe.find(".property-list li.active").length > 0 ) {
            dig_iframe.find(".js-css-reset").removeClass("btn--disabled");
        }

        return false;
    });

    // Wraps each rule in a space so it can be hidden/shown during highlights.
    var css_pure = dig_iframe.find("#report-css pre").html();
    css_pure = css_pure.replace(/^}/gim, "}</span><span>")
    // Remove the extra opening span at the very end.
    css_pure = css_pure.substring(0, css_pure.length - 7);
    // Replace new lines and opening span with classed opening span.
    css_pure = css_pure.replace(/<span>\n\n/gim, "<span class='ruleset'>")
    // Add opening span to very first rule.
    css_pure = "<span class='ruleset'>" + css_pure;
    dig_iframe.find("#report-css pre").html(css_pure);
}

