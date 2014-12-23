function buildSpecificity(css) {

  var selectorsArr = CSSOM.parse(css);
  var allSelectorsArr = [];

  $.each( selectorsArr.cssRules, function(i) {
    // Assume it's a not in a media block.
    var selectorText = $(this)[0].selectorText;
    // If it's a media block.
    if ( $(this)[0].media ) {
      var selectorText = $(this)[0].cssRules[0].selectorText;
    }
    // It might be undefined if it's @font-face, e.g. Skip these.
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

}
