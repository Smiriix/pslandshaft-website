document.addEventListener("DOMContentLoaded", () => {
    const headerElem = document.querySelector("header");
    modal = new function () {
        this.close = () => {
            if (document.querySelector(`.modalwindow.show`))
                document.querySelector(`.modalwindow.show`).classList.remove("show");
        }
        this.open = (idElem) => {
            modal.close();
            console.log(idElem);
            if (document.querySelector(`.modalwindow${idElem}`))
                document.querySelector(`.modalwindow${idElem}`).classList.add("show");
        }
    }
    let scrollFun = null;
    (scrollFun = () => {
        if (document.scrollingElement.scrollTop >= 50) {
            headerElem.classList.add("scrolling");
        } else {
            headerElem.classList.remove("scrolling");
        }
    })();
    window.addEventListener("scroll", scrollFun);
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 490) {
            document.querySelector(`meta[name="viewport"]`).content = `width=490, user-scalable=no`;
        } else {
            document.querySelector(`meta[name="viewport"]`).content = `width=device-width, initial-scale=1.0`;
        }
    });
    document.addEventListener("click", (event) => {
        if (event.target.closest(".header__nav") && event.target.tagName === "A") {
            const headerHeight = headerElem.clientHeight,
                wrapperElem = document.querySelector(`${event.target.getAttribute('href')}`);
            if (wrapperElem) {
                event.preventDefault();
                document.scrollingElement.scrollTop += +wrapperElem.getBoundingClientRect().top - headerHeight;
            }
        }
        if (event.target.dataset.modal) {
            event.preventDefault();
            const idModal = event.target.getAttribute("href");
            modal.open(idModal);
        }
        if (event.target.classList.contains("modalwindow__close")) {
            event.preventDefault();
            modal.close();
        }
        if (event.target.classList.contains("action__btn") && event.target.closest("#cases")) {
            event.preventDefault();
            const wrapper = event.target.closest("#cases"),
                grid = wrapper.querySelector(".cases__grid");
            grid.classList.add("show-all");
            event.target.remove();
        }
        if (event.target.closest("#menuBtn")) {
            event.preventDefault();
            document.querySelector(".header__nav").classList.toggle("show");
        }
    });
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(".action__btn")) {
            const elem = e.target,
                posY = e.offsetY,
                posX = e.offsetX;
            let spanElem = document.createElement("span");
            Object.assign(spanElem.style, {
                top: `${posY}px`,
                left: `${posX}px`
            })
            e.target.appendChild(spanElem);
            setTimeout(() => {
                spanElem.remove();
            }, 300);
        }
    });

    if (document.querySelector(".solutions__slider")) {
        document.querySelectorAll(".solutions__slider").forEach(solutionsWrapper => {
            const solutionSlider = new Swiper(solutionsWrapper.querySelector(".swiper"), {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: solutionsWrapper.querySelector(".solutions__slider_arrow.next"),
                    prevEl: solutionsWrapper.querySelector(".solutions__slider_arrow.prev"),
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                    },
                    1025: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    }
                }
            });
        });
    }
    mymap = null;
    ymaps.ready(() => {
        const coords = [59.944887, 30.516947];
        myMap = new ymaps.Map("map", {
            center: coords,
            zoom: 17,
            controls: []
        });
        myMap.geoObjects.add(new ymaps.Placemark(coords, {
            balloonContent: 'Санкт Петербург улица Заневский пост дом 1/3 офис 2<br>Офис компании'
        }, {
            iconColor: "#789c4b",
        }));
    });
});