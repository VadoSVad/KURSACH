//массив кораблей, их размер положение, стартовые координаты xy
const shipDatas = [
    { size: 4, direction: "row", startX: 60, startY: 345 },
    { size: 3, direction: "row", startX: 60, startY: 390 },
    { size: 3, direction: "row", startX: 170, startY: 390 },
    { size: 2, direction: "row", startX: 60, startY: 435 },
    { size: 2, direction: "row", startX: 138, startY: 435 },
    { size: 2, direction: "row", startX: 217, startY: 435 },
    { size: 1, direction: "row", startX: 60, startY: 480 },
    { size: 1, direction: "row", startX: 105, startY: 480 },
    { size: 1, direction: "row", startX: 150, startY: 480 },
    { size: 1, direction: "row", startX: 195, startY: 480 },
];

class PreparationScene extends Scene {
    draggedSip = null; // совйство ориентируемое на перетаскивание корабля
    draggedOffsetX = 0;
    draggedOffsetY = 0;

    removeEventListeners = [];

    init(){
        this.manually();
    };
    start(){
        const {player, opponent} = this.app;

        opponent.clear();
        player.removeAllShots();
        player.ships.forEach((ship) => (ship.killed = false));

        this.removeEventListeners = [];

        document
            .querySelectorAll(".app-actions")
            .forEach((element) => element.classList.add("hidden"));

        document
            .querySelector('[data-scene="preparation"]')
            .classList.remove("hidden");

        const manuallyButton = document.querySelector('[data-action="manually"]');
        const randomizeButton = document.querySelector('[data-action="randomize"]');
        const simpleButton = document.querySelector('[data-computer="simple"]');

        this.removeEventListeners.push(
            addEventListener(manuallyButton, "click", () => this.manually())
        );

        this.removeEventListeners.push(
            addEventListener(randomizeButton, "click", () => this.randomize())
        );

        this.removeEventListeners.push(
            addEventListener(simpleButton, "click", () =>
                this.startComputer("simple")
            )
        );
    };
    stop(){
        for (const removeEventListener of this.removeEventListeners) {
            removeEventListener();
        }

        this.removeEventListeners = [];
    }
    update(){
        const {mouse, player} = this.app;
        //хотим начать тянуть
        if (!this.draggedSip && mouse.left && !mouse.pLeft){// если не перетаскиваемого корябля, но если мы зажали кнопку, а раньше не была зажата, то значит надо начать делать перетаскивание
            const ship = player.ships.find((ship) => ship.isUnder(mouse));

            if (ship){
                const shipRect = ship.div.getBoundingClientRect(); //получаем верх левую грницу корабля для точного перетаскивания
                this.draggedOffsetX = mouse.x - shipRect.left;
                this.draggedOffsetY = mouse.y - shipRect.top;
                this.draggedSip = ship;

                ship.x = null;
                ship.y = null;
            }
        }
        //смо перетаскивание
        if (mouse.left && this.draggedSip){
            const {left, top} = player.root.getBoundingClientRect();
            const x = mouse.x - left - this.draggedOffsetX;
            const y = mouse.y - top - this.draggedOffsetY;

            this.draggedSip.div.style.left = `${x}px`;
            this.draggedSip.div.style.top = `${y}px`;
        }
        //бросание
        if(!mouse.left && this.draggedSip){
            const ship = this.draggedSip;
            this.draggedSip = null;

            const {left, top} = ship.div.getBoundingClientRect();
            const {width, height} = player.cells[0][0].getBoundingClientRect();
            const point = {
                x: left + width/2,
                y: top + height/2,
            }

            const cell = player.cells.flat().find(cell => isUnderPoint(point, cell));
            if(cell){
                const x = parseInt(cell.dataset.x);
                const y = parseInt(cell.dataset.y);

                player.removeShip(ship);
                player.addShip(ship, x, y);
            }else{
                player.removeShip(ship);
                player.addShip(ship);
            }
        }
        //вращение
        if(this.draggedSip && mouse.delta){
            this.draggedSip.toggleDirection();
        }
        if(player.complete){
            document.querySelector('[data-computer="simple"]').disabled = false;
        }else{
            document.querySelector('[data-computer="simple"]').disabled = true;
        }
    };

    randomize() {
        const { player } = this.app;

        player.randomize(ShipView);

        for (let i = 0; i < 10; i++) {
            const ship = player.ships[i];

            ship.startX = shipDatas[i].startX;
            ship.startY = shipDatas[i].startY;
        }
    }
    manually(){
        const player = this.app.player;

        player.removeAllShips();
        //поводим деструктуризацию и и пробегаемся по элементам масива
        for (const {size, direction, startX, startY} of shipDatas){
            const ship = new ShipView(size,direction,startX,startY);
            player.addShip(ship);
        }
    }
    startComputer(level) {
        const matrix = this.app.player.matrix;
        const withoutShipItems = matrix.flat().filter((item) => !item.ship);
        let untouchables = [];

        if (level === "simple") {}

        this.app.start("computer", untouchables);
    }
}