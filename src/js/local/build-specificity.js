function buildSpecificity() {

  var allSelectorsArr = [];

  var css = $('#dig-iframe').contents().find("#report-css pre .selector")

  $.each(css,function(){
    var selectorText = $(this).text();
    var arr = selectorText.split(',');
    allSelectorsArr.push.apply(allSelectorsArr, arr);
  })

  var uniqueSelectorsArr = [];

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
      $('#dig-iframe').contents().find("#specificity-table").append(tbodyContainer);

      $('#dig-iframe').contents().find("#specificity-table").tablesorter({
        sortList: [[1,1]],
        headers: {
          0 : {
            sorter: false
          }
        }
      });

      // // Get number of selectors
      var selectorLength = $('#dig-iframe').contents().find("#specificity-table tbody tr").length;
      $('#dig-iframe').contents().find("#selector-length").text(": "+ selectorLength);
  }, 300);
}
