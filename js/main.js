document.addEventListener('DOMContentLoaded', () => {
let menuButton = document.querySelector('.hamburger'); 

  menuButton.addEventListener('click', function (){
    menuButton.classList.toggle('hamburger-active');
});


// блоки с выпадаюшим списком
const dropDownBlock = document.querySelectorAll('.dropdown-block'); 
  const toggleMenu = (headerDropdownList, headerBtnAdress) => {//добавляем класс активности на кнопку и на выпадающий список
    headerDropdownList.classList.toggle('active');
    headerBtnAdress.classList.toggle('active');
  }

  dropDownBlock.forEach(btn => {

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const headerBtnAdress = btn.querySelector('.header__btn-adress'); //кнопка открытия меню
      const headerDropdownList = btn.querySelector('.header__dropdown-list'); //выпадающий список
      
      if(e.target.localName === 'a'){
        const linkContent = e.target.textContent;
        headerBtnAdress.textContent = linkContent;
      }
      
      toggleMenu(headerBtnAdress, headerDropdownList);

      document.addEventListener('click', e => {//навешиваем событие на весь документ
    
        let target = e.target; // получаем обьет события по которому был клик
        let its_headerDropdownList = target == headerDropdownList || headerDropdownList.contains(target); // true - если клик на подложку,или потомка подложки
        let its_headerBtnAdress = target == headerBtnAdress; // true если клдикнули на кнопку
        let headerDropdownList_is_active = headerDropdownList.classList.contains('active'); //true если уже список уже открыт
    
        if (!its_headerDropdownList && !its_headerBtnAdress && headerDropdownList_is_active) {
          toggleMenu(headerBtnAdress, headerDropdownList); //закрываем подложку если клик не на подложку, на кнопку и если подложка уже открыта
        } 
      });
    });
});

//подстановка первого адреса из выпадающего списка в заголовок адреса
$.each($('.adress-parent'), function(){
  const textContent = $(this).find('.dropdown-block__link:first').text();
    $(this).find('.header__btn-adress').text(textContent);
});

//выпадающие блоки
$(".address-content").find('.item').hide();
$(".address-content").find('.item:first').show();
$(".dropdown-block__link").on('click', function(e){
  e.preventDefault();
  $(this).closest('.adress-parent').find('.address-content .item').hide();
  $(this).closest('.adress-parent').find('#' + $(this).data('address') ).fadeIn();
});

//табы категория
var tabNavsСategory = document.querySelectorAll(".nav-tab__category");
var tabPanesСategory = document.querySelectorAll(".tab-pane__category");


for (var i = 0; i < tabNavsСategory.length; i++) {

  tabNavsСategory[i].addEventListener("click", function(e){
    e.preventDefault();
    var activeTabAttr = e.target.closest('.nav-tab__category').getAttribute("data-tab");

    for (var j = 0; j < tabNavsСategory.length; j++) {
      var contentAttr = tabPanesСategory[j].getAttribute("data-tab-content");

      if (activeTabAttr === contentAttr) {
        tabNavsСategory[j].classList.add("active");
        tabPanesСategory[j].classList.add("active"); 
      } else {
        tabNavsСategory[j].classList.remove("active");
        tabPanesСategory[j].classList.remove("active");
      }
    };
  });
}

//Табы наши филиалы 
class ItcTabs {
  constructor(target, config) {
    const defaultConfig = {};
    this._config = Object.assign(defaultConfig, config);
    this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
    this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
    this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
    this._eventShow = new Event('tab.itc.change');
    this._init();
    this._events();
  }
  _init() {
    this._elTabs.setAttribute('role', 'tablist');
    this._elButtons.forEach((el, index) => {
      el.dataset.index = index;
      el.setAttribute('role', 'tab');
      this._elPanes[index].setAttribute('role', 'tabpanel');
    });
  }
  show(elLinkTarget) {
    const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
    const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
    const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
    if (elLinkTarget === elLinkActive) {
      return;
    }
    elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
    elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
    elLinkTarget.classList.add('tabs__btn_active');
    elPaneTarget.classList.add('tabs__pane_show');
    this._elTabs.dispatchEvent(this._eventShow);
    elLinkTarget.focus();
  }
  showByIndex(index) {
    const elLinkTarget = this._elButtons[index];
    elLinkTarget ? this.show(elLinkTarget) : null;
  };
  _events() {
    this._elTabs.addEventListener('click', (e) => {
      const target = e.target.closest('.tabs__btn');
      if (target) {
        e.preventDefault();
        this.show(target);
      }
    });
  }
}
// инициализация .tabs как табов
new ItcTabs('.tabs');


//Инициализации слайдеров
function initSliders() {
  //перечень слайдеров
  if (document.querySelector('.swiper-stock')) {
    new Swiper('.swiper-stock', {
      loop: true,
      autoHeight: true,
      slidesPerView: 1,
      navigation: {
        nextEl: '.button-next_stock',
        prevEl: '.button-prev_stock',
      },
    });
  }
  if (document.querySelector('.tabs__swiper')) {
    new Swiper('.tabs__swiper', {
      slidesPerView: 2,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination_tabs",
        type: "fraction",
      },
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
      breakpoints: {
        320: {
        spaceBetween: 20,
        slidesPerView: 1,
          grid: {
             rows: 2,
          },
        },
        960: {
        slidesPerView: 2,
        spaceBetween: 30,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }
  if (document.querySelector('.swiper-branches')) {
    new Swiper('.swiper-branches', {
      observer: true,
      observeParents: true,
      slidesPerView: 4,
      spaceBetween: 0,
      watchOverflow: true,
      autoHeight: true,
      speed: 800,
      pagination: {
          el: ".swiper-pagination",
          type: "fraction",
      },
      breakpoints: {
          320: {
          slidesPerView: 1,
          },
          720: {
          slidesPerView: 1,
          },
          1024: {
          slidesPerView: 3,
          },
          1320: {
          slidesPerView: 4,
          },
      },
    });
  }
  if (document.querySelector('.swiper_instructors')) {
    new Swiper('.swiper_instructors', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      speed: 1000,
      pagination: {
          el: ".swiper-pagination_instructor",
          type: "fraction",
      },
      navigation: {
        nextEl: '.button-next_instructor',
        prevEl: '.button-prev_instructor',
      },
      breakpoints: {
        320: {
            autoHeight: false,
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 30,
        },
        478: {
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true,
        },
        720: {
            spaceBetween: 20,
            slidesPerView: 3,
        },
        1320: {
            centeredSlides: true,
            allowTouchMove: false,
        },
      },
      on: {
        init: function (swiper) {
          slideViewPerCol2(swiper);
          slideViewPerCol(swiper);
        },
        slideChange: function (swiper) {
          slideViewPerCol2(swiper);
          slideViewPerCol(swiper);
        }
      }
    });
    function slideViewPerCol(slide) {
      let startSlide = slide.snapIndex - 1
      $.each(slide.slides, function (index, el) {
          if (index <= startSlide) $(el).addClass('instructor_visibility');
          else $(el).removeClass('instructor_visibility');
      });
    }  
  
    function slideViewPerCol2(swiper) {
      const slideInstructorTitle = document.querySelector('.slide_instructor-title'),
            slideInstructorStazh = document.querySelector('.slide_instructor-stazh'),
            slideInstructorDate = document.querySelector('.slide_instructor-date'),
            swiperSlideActive = swiper.slides[swiper.activeIndex];
  
          slideInstructorTitle.textContent = swiperSlideActive.children[1].children[0].innerText;
          slideInstructorStazh.textContent = swiperSlideActive.children[1].children[1].innerText;
          slideInstructorDate.textContent = swiperSlideActive.children[1].children[2].innerText;
    }
  }
  if (document.querySelector('.swiper__teacher')) {
    new Swiper('.swiper__teacher', {
      slidesPerView: 1,
      spaceBetween: 30,
      grid: {
        rows: 2,
      },
      pagination: {
        el: '.teacher-swiper-pagination',
        type: "fraction",
      },
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      breakpoints: {
        240: {
          slidesPerView: 1,
          grid: {
            rows: 1,
          },
        },
        960: {
          slidesPerView: 1,
          spaceBetween: 30,
          grid: {
            rows: 2,
          },
        },
      },
    });
  }

  if (document.querySelector('.swiper-avtopark')) {
    new Swiper('.swiper-avtopark', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      mousewheel: true,
      centeredSlides:  true,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      breakpoints: {
        240: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        1140: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1370: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }

  if (document.querySelector('.swiper-students')) {
    new Swiper('.swiper-students', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      watchOverflow: true,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      pagination: {
        el: '.swiper-pagination_student',
        type: "fraction",
      },
      breakpoints: {
        240: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        720: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1140: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1370: {
          slidesPerView: 3,
        },
      },
    });
  }
  if (document.querySelector('.swiper-reviews')) {
    new Swiper('.swiper-reviews', {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.pagination',
        type: "fraction",
      },
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        1140: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });
  } 
  if (document.querySelector('.questions__swiper')) {
    new Swiper('.questions__swiper', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
    });
  }   
  if (document.querySelector('.swiper-document')) {
    new Swiper('.swiper-document', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      autoHeight: false,
      speed: 1000,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      breakpoints: {
        320: {
            autoHeight: true,
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 30,
        },
        478: {
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: true,
        },
        720: {
            spaceBetween: 20,
            slidesPerView: 3,
        },
        1320: {
          centeredSlides: true,
          allowTouchMove: false,
        },
      },
      on: {
        init: function (slide) {
            slideVisibility(slide);
        },
        slideChange: function (slide) {
            slideVisibility(slide);
        }
      }
    });
    function slideVisibility(slide) {
      let startSlide = slide.snapIndex - 1
      $.each(slide.slides, function (index, el) {
          if (index <= startSlide) $(el).addClass('document-slide-visible');
          else $(el).removeClass('document-slide-visible');
      });
    }
  }

  if (document.querySelector('.reviews__swiper')) {
    new Swiper('.reviews__swiper', {
      loop: true,
      centeredSlides: true,
      slidesPerView: 3,
      initialSlide: 3,
      spaceBetween: 30,
      slideToClickedSlide: true,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },
      pagination: {
        el: '.reviews-swiper-pagination',
        type: "fraction",
      },
      breakpoints: {
        320: {
            slidesPerView: 1,
        },
        720: {
          slidesPerView: 3,
        },
      },
    });
  }

}
window.addEventListener("load", function (e) {
  // Запуск инициализации слайдеров
  initSliders();
});

// Инициализация бегущей строки и readmore
jQuery(document).ready(function ($) {
  //бугущая строка 
  $(function() {
    $('.marquee').marquee({
      duration: 20000,
      startVisible: true,
      duplicated: true
    });
  });
  $('.slide-reviews-text').readmore({
    speed: 900,
    maxHeight: 145,
    moreLink: '<a href="#" class="readmore_btn-bottom"><span>Читать весь отзыв</span></a>',
    lessLink: '<a href="#" class="readmore_btn-top"><span>Скрыть<span></a>',
  });

});

//инициализация слайдера, readmore, которые работют только на мобилке 
    var slickSliderActive = false; // Флаг включённости слайдера slick
    // Включение или выключение слайдера (в зависимости от ширины)
    function checkSlider(){    
    // Если ширина меньше чем 720px
    if( $(window).width() < 720 - getScroll() ) {

      jQuery(document).ready(function ($) {
        $('.instructor_deck').readmore({
          speed: 900,
          maxHeight: 50,
          moreLink: '<a href="#" class="readmore_btn-bottom">Читать подробнее</a>',
          lessLink: '<a href="#" class="readmore_btn-top">Скрыть</a>',
          collapsedHeight: 90,
        });
        $('.teacher__text-deck').readmore({
          speed: 900,
          maxHeight: 145,
          moreLink: '<a href="#" class="readmore_btn-bottom"><span>Читать весь отзыв</span></a>',
          lessLink: '<a href="#" class="readmore_btn-top"><span>Скрыть<span></a>',
        });
        
      });
    
       // Если флаг включённости опущен, то включим и поднимем флаг
        if(slickSliderActive == false) {
           
            slickSliderActive = true;
          }
        } 
    // Иначе (вьюпорт не уже чем 720px)
        else {

            // Если флаг включённости поднят, выключаем и опускаем флаг
            if(slickSliderActive == true) {
                $('.swiper-branches').slick('unslick');
                slickSliderActive = false;
            }
        }
    };

    // По готовности DOM...
    checkSlider();

    // По любому изменению размера вьюпорта...
    $(window).on('resize', checkSlider);

    function getScroll(){
        var div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        var scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        return scrollWidth;
    }

/*Вариант аккордеона где открываются все вкладки, а другие не закрываются*/
const accordion = () => { 
  const characteristicsListElem = document.querySelector('.questions__list');
  const characteristicsItemElems = document.querySelectorAll('.questions__item');

  characteristicsItemElems.forEach(elem => {
    if(elem.children[1].classList.contains('active')) {
      elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
    }
  })
  
  const open = (button, dropDown) => {
    closeAllDrops();
    dropDown.style.height = `${dropDown.scrollHeight}px`;
    button.classList.add('active');
    dropDown.classList.add('active');  
  };

  const close = (button, dropDown) => {
    button.classList.remove('active');
    dropDown.classList.remove('active');
    dropDown.style.height = '';
  };

  const closeAllDrops = (button, dropDown) => {
    characteristicsItemElems.forEach((elem) => {
      if (elem.children[0] !== button && elem.children[1] !== dropDown) {
          close(elem.children[0], elem.children[1]);
      }
    })
  };

  characteristicsListElem.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('questions__title')) {
      const parent = target.closest('.questions__item');
      const description = parent.querySelector('.questions__description');
      description.classList.contains('active') ? 
          close(target, description) : 
          open(target, description);
    }
  });

  //закрывает аккордеон если кликнул мимо него
  document.body.addEventListener('click', (event) => {
    const target = event.target;
    if(!target.closest('.questions__list')) {
      closeAllDrops();
    }
  })
};

accordion();
});


/**Test */
// //получить кнопку (кнопка = obj)
// const button = document.querySelector('.but');
// button.addEventListener('click', (event) => { 
//   const target = event.target;//получ. объект, который инициализирует событие
//   console.log(event);
//   if(target.closest('.but')) {//возвращяем ближайщего родителя
//       const name = button.dataset.name;//получаем дата атрибут
//       const id = button.getAttribute('data-id');//получаем дата атрибут
//       button.disabled = true//блокируем кнопку
//   }
// }); 


//множество кнопок
// const buttons = document.querySelectorAll('.but');
// buttons.forEach( function(button, i) {
//     button.addEventListener('click', btnEventHendler );
// });

// function btnEventHendler(event) {
//     const target = event.target;
//     if(target.closest('.but')) {
//       const stepBtn = target.closest('.but');
//       const id = stepBtn.getAttribute('data-id');
//       console.log(id);
//     }
// }

//console.log(buttons);
/**Test */