function buildSpecificity() {

  var dig_iframe = $('#dig-iframe').contents();
  var allSelectorsArr = [];
  var uniqueSelectorsArr = [];
  // Only grab selectors inside regular rules and @media rules, but no others.
  var css = dig_iframe.find("#report-css pre > .ruleset > .selectors > .selector, #report-css pre > .at-media .selector");

  $.each(css,function(){
    var selectorText = $(this).text();
    allSelectorsArr.push(selectorText.trim());
  })

  // Dedupe selectors.
  $.each(allSelectorsArr, function(i, el){
      if($.inArray(el, uniqueSelectorsArr) === -1) uniqueSelectorsArr.push(el);
  });

  var tbodyContainer = $('<tbody/>');

  $.each(uniqueSelectorsArr, function(i, el){

    var specificityHTML = "";

    var specificityObj = SPECIFICITY.calculate(el);
    var selector = specificityObj[0].selector;
    var specificity = specificityObj[0].specificity;

    var arr = specificity.split(',');

    $.each(arr, function(j){
      specificityHTML = specificityHTML + "<span>" + arr[j] + "</span>";
    });

    // TODO: Build HTML first, then dump into Dom.
    tbodyContainer.append("<tr><td class='selector'>"+selector+"</td><td class='specificity'>"+specificityHTML+"</td></tr>")
  });

  setTimeout(function(){
      dig_iframe.find("#specificity-table").append(tbodyContainer);

      dig_iframe.find("#specificity-table").tablesorter({
        sortList: [[1,1]],
        headers: {
          0 : {
            sorter: false
          }
        }
      });

      // // Get number of selectors
      var selectorLength = dig_iframe.find("#specificity-table tbody tr").length;
      $('#dig-iframe').contents().find("#selector-length").text(": "+ selectorLength);
  }, 300);
}
