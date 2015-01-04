$(document).ready(function(){

  dig_iframe.find('#cssdig-chrome').on('click', '.tabs > ul li a', function() {
     trigger = $(this);
     changeTab(trigger);
     dig_iframe.find(".js-css-reset").click();
     return false;
  })

  function changeTab(trigger) {
     var tabSet =  trigger.closest(".tabs");
     tabSet.find(".tabs-nav li").removeClass("active");
     trigger.closest("li").addClass("active");
     var e = tabSet.find("ul li a").index(trigger);
     var tab_content = trigger.closest(".tabs").find(".tab-content");
     tab_content.hide();
     tab_content.eq(e).css("display","flex");
  }
});
