/*
* Активируем "строгий режим".
* Этим режимом достигается то,
* что потенциально опасные конструкции языка JS
* будут запрещены и приведут к исключению.
*/
"use strict";

(function () {
    /*
    * создаем массив, содержащий ссылки на слайды,
    * используем массив, для простого добавления и удаления слайдов
    * количество слайдов в данном случае ограничивается возможностями массива
    */
    const slides = [
        'static/img/img_1.jpg',
        'static/img/img_2.jpg',
        'static/img/img_3.jpg',
        'static/img/img_4.jpg',
        'static/img/img_5.jpg',
        'static/img/img_6.jpg',
        'static/img/img_7.jpg',
        'static/img/img_8.jpg',
        'static/img/img_9.jpg',
        'static/img/img_10.jpg',
        'static/img/img_11.jpg',
        'static/img/img_12.jpg',

    ];

    const transitionTimeMs = 500; // задаем время для плавного перехода между слайдами
    const loop = true; // включаем/отключаем бесконечную прокрутку изображений

    /*
    *Метод addEventListener() регистрирует обработчик события для целевого объекта
    */
    window.addEventListener('DOMContentLoaded', () => {
        let slider;
        /*
        * document.getElementById() возвращает ссылку на элемент, который имеет атрибут id с указанным значением - slider
        * Если возвращается ссылка на элемент, то присваиваем значение (статус) класса active к элементу
        * Если возвращается null, то выводим сообщение "Слайдер не найден"
        */
        try {
            slider = document.getElementById('slider');
            slider.classList.add('active');
        } catch (e) {
            console.error('No slider has been found');
            return;
        }
        /*
        *Если массив изображений пуст,
        * сообщаем об ошибке
        */
        if (!slides.length) {
            console.error('No slides defined');
            return;
        }
        /*
        *Задаем значение текущему слайду
        */
        let currentSlide = -1;

        /*
        * Добавили блок на старницу .appendChild(contentBlock)
        *   в конец списка дочерних элементов указанного родительского узла slider.
        * Т.к. мы зафиксировали его в переменной, то можно напрямую обращаться и модифицировать его.
        * Т.е. при его изменении автоматически меняется код страницы
        * .createElement - создает новый элемент с заданным тегом
        */
        const contentBlock = document.createElement('div');
        slider.appendChild(contentBlock);

        /*
        *
        * Добавляем классы для навигации слайдов
        * (перемещение по точкам и нажатие на стрелочки)
        */
        const slidesNav = document.createElement('div');
        slidesNav.classList.add('nav');
        slidesNav.classList.add('button');

        slider.appendChild(slidesNav);

        /*
        * Создаем элементы в панели навигации "Точки"
        * Определяем их количество исходя из количества изображений в массиве
        * Отображаем стиль с задержкой во времени (для плавности отображения)
        */
        slides.forEach((el, index) => {
            const point = document.createElement('a');

            point.style.transitionDuration = `${transitionTimeMs}ms`;

            slidesNav.appendChild(point);
            /*
            * При клике на элемент панели навигации меняем слайд
            */
            point.addEventListener('click', () => {
                rotateSlide(index);
            });
        });
        /*
        *Создаем кнопки для панели навигации "Вперед" и "Назад"
        *Вместо подписей используем иконки
        */
        const createButton = (imgSrc) => {
            const button = document.createElement('div');
            button.classList.add('nav');
            button.classList.add('arrow');
            const buttonImg = document.createElement('img');
            buttonImg.src = imgSrc;
            slider.appendChild(button);
            button.appendChild(buttonImg);

            return button;
        };

        const leftButton = createButton('static/ico/circle-left.svg');
        const rightButton = createButton('static/ico/circle-right.svg');

        leftButton.style.left = '0';
        rightButton.style.right = '0';


        /*
        * При клике на стрелку, меняем слайд
        */
        leftButton.addEventListener('click', () => rotateSlide(currentSlide - 1));
        rightButton.addEventListener('click', () => rotateSlide());
        /*
        * Создаем отображение изображения в блоке слайдера
        * Отображаем с задержкой по времени (для плавности)
        */
        const createSlide = (src) => {
            const slide = document.createElement('img');
            slide.classList.add('slider-slide');
            slide.src = src;
            slide.style.transitionDuration = `${transitionTimeMs}ms`;

            contentBlock.appendChild(slide);

            return slide;
        };
        /*
        * Переход на необходимый слайд в зависимости от ситуации
        */
        const rotateSlide = (index) => {
            if (index === undefined) {
                index = currentSlide + 1;
            } else {
                currentSlide = index - 1;
            }

            if (slides.length <= index) {
                if (loop) {
                    index = 0;
                    currentSlide = -1;
                } else
                    return;
            } else if (index < 0) {
                if (loop) {
                    index = slides.length - 1;
                    currentSlide = index - 1;
                } else
                    return;
            }

            const newSlide = createSlide(slides[index]);

            /*
            * Убираем класс active из блока отображений слайдера
            */
            Array.from(contentBlock.getElementsByClassName('active')).forEach(el => {
                el.classList.remove('active');

                setTimeout(() => {
                    el.remove();
                }, transitionTimeMs + 10);
            });
            /*
            * Убираем класс active из блока отображения навигации "точек"
            */
            Array.from(slidesNav.children).forEach(el => el.classList.remove('active'));

            slidesNav.children.item(index).classList.add('active');
            setTimeout(() => newSlide.classList.add('active'), 10);

            currentSlide++;
        };

        rotateSlide();

        window.rotateSlide = rotateSlide;
    });
})();
