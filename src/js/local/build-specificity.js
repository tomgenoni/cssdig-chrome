function buildSpecificity(css) {

  var allSelectorsArr = [];

  var re_parens = /\(['|"].*?['|"]\)/gi;
  css = css.replace(re_parens, "");

  var selectorObj = CSSOM.parse(css);

  $.each( selectorObj.cssRules, function(i,v) {

    if ( v.constructor.name == "CSSStyleRule" ) {
      var selectorText = $(this)[0].selectorText;
    } else  if ( v.constructor.name == "CSSMediaRule" && $(this)[0].cssRules.length > 0 ) {
      var selectorText = $(this)[0].cssRules[0].selectorText;
    }

    if ( selectorText != undefined ) {
      // Create array with selectorText as it may have commas.
      var arr = selectorText.split(',');
      allSelectorsArr.push.apply(allSelectorsArr, arr);
    }
  });

  // Remove extra whitespace around selector, not sure where it's coming from.
  $.each( allSelectorsArr, function(i) {
    allSelectorsArr[i] = allSelectorsArr[i].trim();
  });

  var uniqueSelectorsArr = [];

  $.each(allSelectorsArr, function(i, el){
    if($.inArray(el, uniqueSelectorsArr) === -1) uniqueSelectorsArr.push(el);
  });

  $.each(uniqueSelectorsArr, function(i, el){

    var specificityHTML = "";

    var specificityObj = SPECIFICITY.calculate(el);
    var selector = specificityObj[0].selector;
    var specificity = specificityObj[0].specificity;

    var arr = specificity.split(',');

    $.each(arr, function(j){
      specificityHTML = specificityHTML + "<span>" + arr[j] + "</span>";
    });

    $('#dig-iframe').contents().find("#specificity-table tbody")
      .append("<tr><td class='selector'>"+selector+"</td><td class='specificity'>"+specificityHTML+"</td></tr>")

  });

  $('#dig-iframe').contents().find("#specificity-table").tablesorter({
    sortList: [[1,1]],
    headers: {
      0 : {
        sorter: false
      }
    }
  });

  // Get number of selectors
  var selectorLength = $('#dig-iframe').contents().find("#specificity-table tbody tr").length;
  $('#dig-iframe').contents().find("#selector-length").text(": "+ selectorLength);



}
