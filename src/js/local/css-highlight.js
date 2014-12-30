// Using two different methods for highlighting due to limitations of 'highlight.js'

// Add controls to report data to show/hide/reveal items.

function bindControls() {

  var dig_iframe = $('#dig-iframe').contents();

  // Click into report data to reveal locations in Combined CSS.
  dig_iframe.find('#report-tabs').on('click', '.property-list li, #specificity-table tr', function() {

    var $trigger = $(this);

    var clicked_item = "declaration";
    if ( $trigger[0].nodeName == "TR" ) {
      clicked_item = "selector";
    }

    if ( $trigger.hasClass("active") ) {
      $trigger.removeClass("active");
    } else {

      if ( clicked_item == "declaration") {
        if ( dig_iframe.find(".property-list li.active").length > 0 ) {
          dig_iframe.find(".property-list li").removeClass("active");
          dig_iframe.find(".js-css-reset").click();
        }

        var item_text = $trigger.find(".property-list__item").text();
        dig_iframe.find("#css-code .declaration").each(function(){
          if ( item_text == ($(this).text()).trim() ) {
            $(this).addClass("highlight")
          }
        })

      } else {

        if ( dig_iframe.find("#specificity-table tr.active").length > 0 ) {
          dig_iframe.find("#specificity-table tr.active").removeClass("active");
          dig_iframe.find(".js-css-reset").click();
        }

        var item_text = $(this).find(".selector").text();
        dig_iframe.find("#css-code .selector").each(function(){
          if ( item_text == $(this).text() ) {
            $(this).addClass("highlight")
          }
        })

      }

      $(this).addClass("active");

      dig_iframe.find(".ruleset, .group").hide();

      dig_iframe.find(".highlight").each(function(){
        $(this).closest(".group").fadeIn("fast");
        $(this).closest(".ruleset").fadeIn("fast");
      });

      dig_iframe.find(".js-css-reset").removeClass("btn--disabled");
    }
  });

  // // Click into report data to reveal locations in Combined CSS.
  // dig_iframe.find('#report-data').on('click', '#specificity-table tr', function() {

  //   if ( $(this).hasClass("active") ) {

  //     $(this).removeClass("active");
  //     dig_iframe.find(".highlight").removeClass("highlight");
  //     resetCSS();

  //   } else {

  //     if ( dig_iframe.find("#specificity-table tr.active").length > 0 ) {
  //       dig_iframe.find("#specificity-table tr.active").removeClass("active");
  //       dig_iframe.find(".highlight").removeClass("highlight");
  //       resetCSS();
  //     }

  //     $(this).addClass("active");

  //     var item_text = $(this).find(".selector").text();
  //     dig_iframe.find("#css-code .selector").each(function(){
  //       if ( item_text == $(this).text() ) {
  //         $(this).addClass("highlight")
  //       }
  //     })
  //     dig_iframe.find(".ruleset, .group").hide();

  //     dig_iframe.find(".highlight").each(function(){
  //       $(this).closest(".group").fadeIn("fast");
  //       $(this).closest(".ruleset").fadeIn("fast");
  //     });

  //     dig_iframe.find(".js-css-reset").removeClass("btn--disabled");
  //   }

  // });

  // function resetCSS() {
  // }
}

