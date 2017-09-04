


  var url = window.location.pathname;
      var activePage = url.substring(url.lastIndexOf('/')+1);

  // Will only work if string in href matches with location
  $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
  // Will also work for relative and absolute hrefs
  $('ul.nav a').filter(function() {
    return this.href == url;
}).parent().addClass('active');

  $(function(){
    var url = window.location.pathname;  
    var activePage = url.substring(url.lastIndexOf('/')+1);
    if (activePage=="portfolio-3-col.html#jeunes") {
        var $container = $('.isotope');
    // use filterFn if matches value
    $container.isotope({ filter: '.jeunes' });
  imagesLoaded($container, function() {
    $container.isotope('layout');
  });
    }
    if ((activePage=="index.html")||((activePage==""))) {
        $(".navbar-fixed-top").removeClass("sticky");
    }else{
        $(".navbar-fixed-top").addClass("sticky");
    }
    $(window).scroll(function() {
        var url = window.location.pathname;  
        var activePage = url.substring(url.lastIndexOf('/')+1);
        if ((activePage=="index.html")||((activePage==""))) {
            if ($(".navbar").offset().top>30) {
                $(".navbar-fixed-top").addClass("sticky");
            }
            else {
                $(".navbar-fixed-top").removeClass("sticky");
            }
        }
    });
    staticHeader.initialize();
    // Flex
    if ($(".flexslider").length) {
        $('.flexslider').flexslider();
    }



    // segun esto corrige el pedo del dropdown en tablets and such
    // hay que testearlo!
    $('.dropdown-toggle').click(function(e) {
        e.preventDefault();
        setTimeout($.proxy(function() {
            if ('ontouchstart' in document.documentElement) {
                $(this).siblings('.dropdown-backdrop').off().remove();
            }
        }, this), 0);
    });

});


var staticHeader = {
    initialize: function () {
        if ($(".navbar-static-top").length) {
            $("body").css("padding-top", 0);
        }
    }
}

