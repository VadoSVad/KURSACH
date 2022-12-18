//события мыши
class Mouse {
    element = null;

    // флаг under для проверки присутсвия мышки над элементом, pUnder для прошлого состояния мыши (previous)
    under = false;
    pUnder = false;
    // координаты положения мыши в xy и px py для прошлых координат мыши
    x = null;
    y = null;

    pX = null;
    pY = null;

    // проверка нажата ли левая кнопка мыши
    left = false;
    pLeft = false;

    // проверка на прокрутку колесика мыши
    delta = 0;
    pDelta = 0;


    constructor(element) {
        this.element = element;
        // наведение мыши с элемента
        element.addEventListener('mousemove', e => {
            this.tick()
            this.x = e.clientX;
            this.y = e.clientY;
            this.under = true;
            this.delta = 0;

        });
        //движение мыши с элемента
        element.addEventListener('mouseenter', e => {
            this.tick()
            this.x = e.clientX;
            this.y = e.clientY;
            this.under = true;
            this.delta = 0;

        });
        // уход мыши с элемента
        element.addEventListener('mouseleave', e => {
            this.tick()
            this.x = e.clientX;
            this.y = e.clientY;
            this.under = false;
            this.delta = 0;

        });
        // срабатывает при нажатии на клавишу
        element.addEventListener('mousedown', e => {
            this.tick()
            this.x = e.clientX;
            this.y = e.clientY;
            this.under = true;
            this.delta = 0;

            // проверка нажатости левой кнопки мыши
            if (e.button === 0) {
                this.left = true;
            }
        });
        // срабатывает при отпускании клавиши
        element.addEventListener('mouseup', e => {
            this.tick()
            this.x = e.clientX;
            this.y = e.clientY;
            this.under = true;
            this.delta = 0;
            // проверка отпущенности :) левой кнопки мыши
            if (e.button === 0) {
                this.left = false;
            }
        });
        // события колесика
        element.addEventListener('wheel', e => {
            this.tick()
            this.x = e.clientX;
            this.y = e.clientY;
            this.under = true;
            this.delta = e.deltaY > 0 ? 1: -1;

        });

    }

    // смена текущих данных на прошлые
    tick (){
        this.pX = this.x;
        this.pY = this.y;
        this.pUnder = this.under;
        this.pLeft = this.left;
        this.pDelta = this.delta;
        this.delta = 0;
    }
}















