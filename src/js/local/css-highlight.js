// Add controls to report data to show/hide/reveal items.

function bindControls() {

  var dig_iframe = $('#dig-iframe').contents();

  // Click into report data to reveal locations in Combined CSS.
  dig_iframe.find('#report-properties').on('click', '.property-list li', function() {

    if ( $(this).hasClass("active") ) {

      $(this).removeClass("active");
      resetCSS();

    } else {

      if ( dig_iframe.find(".property-list li.active").length > 0 ) {
        dig_iframe.find(".property-list li").removeClass("active");
        resetCSS();
      }

      $(this).addClass("active");

      var property = $(this).find(".property-list__item").text();
      dig_iframe.find("#report-css pre").highlight(property, { caseSensitive: true });
      dig_iframe.find(".ruleset").hide();

      dig_iframe.find(".highlight").each(function(){
        $(this).closest(".ruleset").show();
      });

      dig_iframe.find(".at-rule").each(function(){
        if ( $(this).find(".highlight").length == 0 ) {
          $(this).hide();
        }
      });
    }
  });

  // Click into report data to reveal locations in Combined CSS.
  dig_iframe.find('#report-data').on('click', '#specificity-table tr', function() {

    if ( $(this).hasClass("active") ) {

      $(this).removeClass("active");
      resetCSS();

    } else {

      if ( dig_iframe.find("#specificity-table tr.active").length > 0 ) {
        dig_iframe.find("#specificity-table tr.active").removeClass("active");
        resetCSS();
      }

      $(this).addClass("active");

      var property = $(this).find(".selector").text();
      dig_iframe.find("#report-css pre").highlight(property, { caseSensitive: true });
      dig_iframe.find(".ruleset").hide();

      dig_iframe.find(".highlight").each(function(){
        $(this).closest(".ruleset").show();
      });

      dig_iframe.find(".at-rule").each(function(){
        if ( $(this).find(".highlight").length == 0 ) {
          $(this).hide();
        }
      });
    }

  });

  function resetCSS() {
      dig_iframe.find("#report-css pre").unhighlight();
      dig_iframe.find(".ruleset, .at-rule").show();
  }
}

