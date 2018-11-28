(function($) {
    $(document).ready(function() {
        /* 28-8-18 var $slides = $(".post .rslides, .edd_download .rslides");
        $slides.responsiveSlides({
            auto: false,
            nav: true,
            speed: 200,
        });*/
        $(".post .rslides").each(function() {
            $(this).swipe({
                swipeLeft: function() {
                    $(this).parent().find(".rslides_nav.prev").click();
                },
                swipeRight: function() {
                    $(this).parent().find(".rslides_nav.next").click();
                }
            });
        });
        /*28-8-18 $(".split-section .rslides").responsiveSlides({
            auto: false,
            nav: true,
            manualControls: '#product-pager',
            speed: 200,
            navContainer: ".slide-navs"
        });*/
        $(".product-slides li").each(function() {
            $(this).swipe({
                swipeLeft: function() {
                    $(this).closest(".split-section").find(".rslides_nav.prev").click();
                },
                swipeRight: function() {
                    $(this).closest(".split-section").find(".rslides_nav.next").click();
                }
            });
        });
        $(".rslides_tabs li:first-child").addClass("rslides_here");
        $('.gallery-item a[href*="attachment"]').each(function() {
            $(this).closest(".gallery").addClass("attachment-link");
        });
        $(".gallery-item").each(function() {
            var dataSrc = $(this).find("a").attr("href");
            var caption = $(this).find(".gallery-caption").html();
            $(this).attr('data-src', dataSrc);
            if (typeof caption !== 'undefined') {
                $(this).attr('data-sub-html', '<h3>' + caption + '</h3>');
            }
        });
        $(".post [id^=lightGallery], .post-text [data-link='file'], .edd_download [id^=lightGallery]").each(function() {
            $(this).lightGallery({
                showThumbByDefault: true,
                mode: 'fade',
                speed: 250,
                thumbMargin: 10,
                thumbWidth: 125,
                loop: true,
                onOpen: galleryHeight
            });
        });

        function galleryHeight() {
            setTimeout(function() {
                var thumbHeight = $(".thumb_cont").height();
                $(".lightGallery-slide").css({
                    'padding-bottom': thumbHeight + 'px'
                });
                $("#lightGallery-Gallery.open #lightGallery-slider .lightGallery-slide").fadeIn(200);
            }, 100);
        }
        galleryHeight();

        function equalHeight() {
            $(".equal, .page-template-template-vendor .edd_download, .vendor-archive .edd_download, .footer-widget").matchHeight();
        }
        equalHeight();
        $("select:not(.multiselect,.search-select)").each(function() {
            $(this).wrap("<div class='select'></div>");
        });
        $(".main-navigation li").each(function() {
            if ($(this).find("ul").length > 0) {
                var parent_width = $(this).outerWidth(true);
                var child_width = $(this).find("ul").outerWidth(true);
                var new_width = parseInt((child_width - parent_width) / 2);
                $(this).find("ul").css('margin-left', -new_width + "px");
            }
        });
        $(".menu-toggle").click(function() {
            $(".logo, .hero-title, .main-navigation, .site-header-bg-wrap").toggle();
            $(".menu-toggle span").toggle();
        });
        $(window).on("resize load", function() {
            $(".main-navigation").addClass('desktop-nav');
            $(".main-navigation.desktop-nav li.menu-item").hoverIntent({
                over: navover,
                out: navout,
                timeout: 100
            });

            function navover() {
                $(this).children("ul").addClass("show-sub");
                setTimeout(function() {
                    $(".desktop-nav .header-search #s").focus();
                }, 200);
            }

            function navout() {
                $(this).children("ul").removeClass("show-sub");
            }
            var current_width = $(window).width();
            if (current_width < 769) {
                $(".main-navigation").removeClass('desktop-nav');
                $(".main-navigation").addClass('mobile-nav');
                $(".menu").find("li.menu-item-has-children:not(.header-search)").click(function() {
                    $(this).toggleClass("show-mobile-sub active-sub-menu");
                    return false;
                });
                $(".menu-item-has-children a, .main-navigation #s, .main-navigation #searchsubmit").click(function(e) {
                    e.stopPropagation();
                    return true;
                });
            } else {
                $(".main-navigation").addClass('desktop-nav');
                $(".main-navigation").removeClass('mobile-nav');
                $(".logo, .hero-title, .main-navigation, .site-header-bg-wrap ").show();
            }
        });
        var current_width = $(window).width();
        if (current_width > 600) {
            function orient() {
                if (window.orientation == 90 || window.orientation == -90) {
                    $("body").addClass("landscape");
                    $(".main-navigation").removeClass("desktop-nav");
                    orientation = 'landscape';
                    return false;
                }
            }
            $(function() {
                orient();
            });
            $(window).bind('orientationchange', function(e) {
                orient();
            });
        }
        $(".header-search").click(function() {
            $(this).find("#s").focus();
        });
        $("#edd_profile_editor_submit").addClass("button");
        var mcInputHeight = $(".site-footer #mailbag_mailchimp .mailbag-input:first-of-type input").outerHeight();
        $(".site-footer #mailbag_mailchimp .mailbag-input:last-of-type").each(function() {
            $(this).find(".button").css("height", mcInputHeight).insertAfter("#mailbag_mailchimp_email");
        });
        //28-8-2018 $(".post").fitVids();
        if ((checkout_masonry_js_vars.load_masonry) === 'true') {
            $(".testimonial-section-inside").masonry();
        }
        $(function() {
            $('a[href*="#"]:not([href="#"])').click(function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });
    });
})(jQuery);