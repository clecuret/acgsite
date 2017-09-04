$(document).ready(function(){

    modal = {
        place : function(){
            var $window = jQuery(window);
            var $container = jQuery('.modal-container:visible');

            var ww = $window.width();
            var wh = $window.height();

            var cw = $container.width();
            var ch = $container.height();

            var l = (ww - cw)/2;
            if(l < 0 ){ var l = 0; }

            var t = (wh - ch)/2;
            if(t < 0 ){ var t = 0; }

            $container.css({
                'margin-top'  : t,
                'margin-left' : l
            });
        },
        open : function (className){
            var $modal = jQuery('.modals .'+className);

            jQuery('.modals').fadeIn();
            jQuery('body').addClass('modal-open');
            $modal.css('display', 'block');
            $modal.trigger('modal-open');

            modal.place();
        },
        change : function (className){
            var $modal = jQuery('.modals .'+className);

            jQuery('.modal-container:visible').fadeOut(400, function(){
                $modal.trigger('modal-open');
                $modal.fadeIn(300);
                modal.place();
            });
        },
        close : function (){
            var $modal = jQuery('.modal-container:visible');

            jQuery('.modals').fadeOut();
            jQuery('body').removeClass('modal-open');
            
            $modal.css('display', 'none');
            $modal.trigger('modal-close');

        }
    }

    /*events*/
    jQuery(document).on('click', '.modal-trigger', function(e){
        e.preventDefault();
        modal.open(jQuery(this).data('modal'));
    });

    jQuery(document).on('click', '.modal-next' ,function(e){
        e.preventDefault();
        modal.change(jQuery(this).data('next'));
    });

    jQuery(document).on('click', '.modals, .modal-close', function(e){
        if(e.target != this) return; /* http://tinyurl.com/c6re4ck */
        modal.close();
        e.preventDefault();
    });

    jQuery(window).resize(function(){
        modal.place();
    });
});