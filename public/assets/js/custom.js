(function ($) {
    "use strict";

    // Safe visibility checker
    function visible($el, allowPartial) {
        if (!($el instanceof jQuery) || !$el.length || typeof $el.offset() !== 'object') return false;

        var $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            offset = $el.offset();

        var _top = offset.top,
            _bottom = _top + $el.height(),
            compareTop = allowPartial ? _bottom : _top,
            compareBottom = allowPartial ? _top : _bottom;

        return (
            compareBottom <= viewBottom &&
            compareTop >= viewTop &&
            $el.is(':visible')
        );
    }

    // Scroll listeners
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height() || 0;
        var header = $('header').height() || 0;

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }

        if (visible($('.count-digit'), true)) {
            if (!$('.count-digit').hasClass('counter-loaded')) {
                $('.count-digit').addClass('counter-loaded');
                $('.count-digit').each(function () {
                    var $this = $(this);
                    jQuery({ Counter: 0 }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
            }
        }
    });

    // Isotope filtering
    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: true,
        masonry: {
            columnWidth: ".all"
        }
    });

    $('.filters ul li').click(function () {
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');
        var data = $(this).attr('data-filter');
        $grid.isotope({ filter: data });
    });

    // Accordion behavior
    const Accordion = {
        settings: { first_expanded: false, toggle: false },

        openAccordion(toggle, content) {
            if (content.children.length) {
                toggle.classList.add("is-open");
                let final_height = Math.floor(content.children[0].offsetHeight);
                content.style.height = final_height + "px";
            }
        },

        closeAccordion(toggle, content) {
            toggle.classList.remove("is-open");
            content.style.height = 0;
        },

        init(el) {
            const _this = this;
            let toggles = el.getElementsByClassName("accordion-head"),
                contents = el.getElementsByClassName("accordion-body"),
                first = el.classList.contains("is-first-expanded"),
                toggleMode = el.classList.contains("is-toggle");

            for (let i = 0; i < toggles.length; i++) {
                toggles[i].addEventListener("click", function () {
                    if (!toggleMode) {
                        for (let j = 0; j < toggles.length; j++) {
                            _this.closeAccordion(toggles[j], contents[j]);
                        }
                        _this.openAccordion(toggles[i], contents[i]);
                    } else {
                        if (toggles[i].classList.contains("is-open")) {
                            _this.closeAccordion(toggles[i], contents[i]);
                        } else {
                            _this.openAccordion(toggles[i], contents[i]);
                        }
                    }
                });

                if (i === 0 && first) {
                    _this.openAccordion(toggles[i], contents[i]);
                }
            }
        }
    };

    (function () {
        const accordions = document.getElementsByClassName("accordions");
        for (let i = 0; i < accordions.length; i++) {
            Accordion.init(accordions[i]);
        }
    })();

    // Tab toggle
    $(document).on("click", ".naccs .menu div", function () {
        var index = $(this).index();
        $(".naccs .menu div").removeClass("active");
        $(this).addClass("active");
        $(".naccs ul li").removeClass("active");
        $(".naccs ul li").eq(index).addClass("active");

        var newHeight = $(".naccs ul li").eq(index).innerHeight();
        $(".naccs ul").height(newHeight + "px");
    });

    // Owl carousel
    $('.owl-testimonials').owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        nav: false,
        autoplay: true,
        margin: 15,
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });

    // Mobile nav
    if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click', function () {
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }

    // Smooth scroll
    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 79
            }, 700, 'swing');
        }
    });

    // Active link update
    function onScroll() {
        var scrollPos = $(document).scrollTop();
        $('.nav a[href^="#"]').each(function () {
            var currLink = $(this);
            var ref = $(currLink.attr("href"));
            if (ref.length) {
                if (ref.position().top <= scrollPos &&
                    ref.position().top + ref.height() > scrollPos) {
                    $('.nav ul li a').removeClass("active");
                    currLink.addClass("active");
                } else {
                    currLink.removeClass("active");
                }
            }
        });
    }

    $(document).on("scroll", onScroll);

    // Page load animation
    $(window).on('load', function () {
        if ($('.cover').length && $.fn.parallax) {
            $('.cover').parallax({
                imageSrc: $('.cover').data('image'),
                zIndex: '1'
            });
        }

        $("#preloader").animate({ 'opacity': '0' }, 600, function () {
            setTimeout(function () {
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    });

    // Drop-down navigation
    const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('click tap', function (e) {
                var parent = _this.parent('li'),
                    submenu = parent.find('> ul.sub-menu'),
                    siblings = parent.siblings('.has-sub');

                if (submenu.is(':visible')) {
                    submenu.slideUp(450);
                    parent.removeClass('is-open-sub');
                } else {
                    parent.addClass('is-open-sub');
                    siblings.removeClass('is-open-sub')
                        .find('.sub-menu').slideUp(250, function () {
                            submenu.slideDown(250);
                        });
                }

                e.preventDefault();
            });
        });
    }

})(jQuery);
