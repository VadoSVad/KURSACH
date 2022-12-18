// нужен для отображения игрового поля так как в Battlefield только сама логика

// состоять поле будет из:
// root - полностью вид
// table - таблица - поле
// dock - место где будут лежать корабли
// polygon - для выстрелов

class BattlefieldView extends Battlefield {
    root = null;
    able = null;
    dock = null;
    polygon = null;
    showShips = true;

    cells = []; // массив клеток для более быстрого доступа

    constructor(showShips = true) {
        super();
        const root = document.createElement('div');
        root.classList.add('battlefield'); // обращение к стилям

        const table = document.createElement('table');
        table.classList.add("battlefield-table");

        const dock = document.createElement('div');
        dock.classList.add('battlefield-dock')

        const polygon  = document.createElement('div');
        polygon.classList.add('battlefield-polygon');

        this.root = root;
        this.table = table;
        this.dock = dock;
        this.polygon = polygon;
        this.showShips = showShips;

        root.append(table, dock, polygon);

        for (let y = 0; y < 10; y++){
            const row = [];
            const tr = document.createElement('tr'); // создание стоблцов
            tr.classList.add('battlefield-row');
            tr.dataset.y = y; // data здесь использую для создания индексов у клеток

            for (let x = 0; x < 10; x++){
                const td = document.createElement('td'); // создание строчек
                td.classList.add('battlefield-item');
                td.dataset.x = x;
                td.dataset.y = y;

                tr.append(td);
                row.push(td);
            }
            table.append(tr);
            this.cells.push(row); // то есть теперь можно с помощью координат xy обращаться быстро к любой ячейке, чтобы querySelector не использовать
        }

        // создал маркеры для таблицы буквы и цифры
        for (let x = 0; x < 10; x++){
            const cell = this.cells[0][x];
            const marker = document.createElement('div');
            marker.classList.add('marker', 'marker-column');
            marker.textContent = 'ABCDEFGIJK'[x];
            cell.append(marker);
        }

        for(let y = 0; y < 10; y++){
            const cell = this.cells[y][0];
            const marker =  document.createElement('div');
            marker.classList.add('marker', 'marker-row');
            marker.textContent = '0123456789'[y];
            cell.append(marker);
        }
    }

    //добавление корабля на страницу - в док
    addShip(ship, x, y) {
        if (!super.addShip(ship, x, y)) {
            return false;
        }
        if (this.showShips) {
            this.dock.append(ship.div);

            if (ship.placed) {
                const cell = this.cells[y][x];
                const cellRect = cell.getBoundingClientRect();
                const rootRect = this.root.getBoundingClientRect();

                ship.div.style.left = `${cellRect.left - rootRect.left}px`;
                ship.div.style.top = `${cellRect.top - rootRect.top}px`;
            } else {
                ship.setDirection('row');
                ship.div.style.left = `${ship.startX}px`;
                ship.div.style.top = `${ship.startY}px`;
            }

            return true;
        }
    }

    removeShip(ship){
        if(!super.removeShip(ship)){
            return false;
        }
        if (Array.prototype.includes.call(this.dock.children, ship.div)){
            ship.div.remove();
        }
        return true;
    }

    //проверка находится ли наша мышка над элементом через функцию isUnderPoint (additional)
    isUnder(point){
        return isUnderPoint(point, this.root);
    }
    addShot(shot) {
        if (!super.addShot(shot)) {
            return false;
        }

        this.polygon.append(shot.div);

        const cell = this.cells[shot.y][shot.x];
        const cellRect = cell.getBoundingClientRect();
        const rootRect = this.root.getBoundingClientRect();

        shot.div.style.left = `${cellRect.left - rootRect.left}px`;
        shot.div.style.top = `${cellRect.top - rootRect.top}px`;

        return true;
    }

    removeShot(shot) {
        if (!super.removeShot(shot)) {
            return false;
        }

        if (Array.prototype.includes.call(this.polygon.children, shot.div)) {
            shot.div.remove();
        }

        return true;
    }
}

