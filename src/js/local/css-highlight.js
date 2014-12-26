// Add controls to report data to show/hide/reveal items.

function bindControls() {

  var dig_iframe = $('#dig-iframe').contents();

  // Click into report data to reveal locations in Combined CSS.
  dig_iframe.find('#report-properties').on('click', '.property-list li', function() {

    var property = $(this).find(".property-list__item").text();
    dig_iframe.find("#report-css pre").highlight(property, { caseSensitive: true });


      // if ( dig_iframe.find(".property-list li.active").length > 0 ) {
      //     dig_iframe.find(".js-css-reset").removeClass("btn--disabled");
      // }



      // if ( $(this).hasClass("active") ) {
      //     dig_iframe.find("#report-css pre").unhighlight();
      //     $(this).removeClass("active");
      //     dig_iframe.find(".ruleset").show();
      // } else {
      //     dig_iframe.find('.property-list li').removeClass("active");
      //     $(this).addClass("active");
      //     var target = $(this).find(".property-list__item").eq(0).text();
      //     dig_iframe.find("#report-css pre").unhighlight();
      //     dig_iframe.find("#report-css pre").highlight(" " + target, { caseSensitive: true });
      //     dig_iframe.find(".ruleset").hide();

      //     setTimeout(function(){
      //         dig_iframe.find(".highlight").each(function(){
      //             $(this).closest(".ruleset").show();
      //         })
      //     },1)
      // }

      // if ( dig_iframe.find(".property-list li.active").length > 0 ) {
      //     dig_iframe.find(".js-css-reset").removeClass("btn--disabled");
      // }

      return false;
  });

  // Click into report data to reveal locations in Combined CSS.
  dig_iframe.find('#report-data').on('click', '#specificity-table tr', function() {

    $(this).addClass("active");

    var property = $(this).find(".selector").text();
    dig_iframe.find("#report-css pre").highlight(property, { caseSensitive: true });
    dig_iframe.find(".ruleset").hide();

    dig_iframe.find(".highlight").each(function(){
      $(this).closest(".ruleset").show();
    })


  });


}

