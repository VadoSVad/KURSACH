// также как и с полем нужен для отобрадения кораблей, в Ship сама логика, здесь визуал

class ShipView extends Ship {
    div = null;

    startX = null;
    startY = null;

    // делает расположение кораблей(применяет к div css стили)
    constructor (size, direction, startX, startY){
        super(size, direction);

        const div = document.createElement("div");
        div.classList.add("ship");

        Object.assign(this, {div, startX, startY});
        this.setDirection(direction, true);
    }
    // изменение ориетнации корабля -  проверка на перемещение
    setDirection(newDirection, force = false){
        if(!force && this.direction === newDirection){ // если новое направление совпадет со старым, то ничего не делаем, но если нужно применить стили, но не менять ориентация, то применяем флаг force для того, чтобы обойти проверку
            return false;
        }


        this.div.classList.remove(`ship-${this.direction}-${this.size}`);
        this.direction = newDirection;
        this.div.classList.add(`ship-${this.direction}-${this.size}`);


        return true;
    }
    toggleDirection(){
        const newDirection = this.direction === 'row' ? 'column' : 'row';
        this.setDirection(newDirection);
    }

    isUnder(point){
        return isUnderPoint(point, this.div);
    }
}