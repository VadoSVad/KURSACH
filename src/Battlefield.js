class Battlefield {
    ships = [];
    shots = [];

    #matrix = null;
    #changed = true; //флаг для ситуации, когда что-то изменилось -  при изменении нужно пересчитывать matrix при добавлении нового корабля выстрела и тд

    get loser() {
        for (const ship of this.ships) {
            if (!ship.killed) {
                return false;
            }
        }

        return true;
    }
    //матрица поля для отображения ситуации на клетке, где уже есть корабль, где уже есть выстрел и тд
    get matrix() {
        if (!this.#changed) {// если не произощло измененний, то не нужно пересчитывать матрицу еще раз
            this.#matrix;
        }

        const matrix = [];

        for (let y = 0; y < 10; y++) {
            const row = [];

            for (let x = 0; x < 10; x++) {
                const item = {
                    x,
                    y,
                    ship: null,
                    free: true,
                    shoted: false,
                    wounded: false,
                };

                row.push(item);
            }

            matrix.push(row);
        }

        for (const ship of this.ships) {
            if (!ship.placed) {
                continue;
            }

            const { x, y } = ship;
            //для отображения орианетации корабля = 0 или 1
            const dx = ship.direction === "row";
            const dy = ship.direction === "column";

            for (let i = 0; i < ship.size; i++) {
                const cx = x + dx * i;
                const cy = y + dy * i;

                const item = matrix[cy][cx];
                item.ship = ship;
            }

            //в зависимости от расположения разное кол-во клеток будет заблокировано для последующего использования
            for (let y = ship.y - 1; y < ship.y + ship.size * dy + dx + 1; y++) {
                for (let x = ship.x - 1; x < ship.x + ship.size * dx + dy + 1; x++) {
                    if (this.inField(x, y)) {
                        const item = matrix[y][x];
                        item.free = false;
                    }
                }
            }
        }
        for (const { x, y } of this.shots) {
            const item = matrix[y][x];
            item.shoted = true;

            if (item.ship) {
                item.wounded = true;
            }
        }


        this.#matrix = matrix;
        this.#changed = false;

        return this.#matrix;
    }
    get complete() {
        if (this.ships.length !== 10) {
            return false;
        }

        for (const ship of this.ships) {
            if (!ship.placed) {
                return false;
            }
        }

        return true;
    }


        inField(x, y){
            //проверка на то явлется xy числами или нет
            const isNumber = (n) =>
                parseInt(n) === n && !isNaN(n) && ![Infinity, -Infinity].includes(n);

            if (!isNumber(x) || !isNumber(y)) {
                return false;
            }

            return 0 <= x && x < 10 && 0 <= y && y < 10;
        }

    addShip(ship, x, y) {
        if (this.ships.includes(ship)) {
            return false;
        }

        this.ships.push(ship);

        if (this.inField(x, y)) {
            const dx = ship.direction === "row";
            const dy = ship.direction === "column";

            let placed = true;//флаг по киданию корбля, если модно кунуть, то true

            for (let i = 0; i < ship.size; i++) {
                const cx = x + dx * i;
                const cy = y + dy * i;

                if (!this.inField(cx, cy)) {
                    placed = false;
                    break;
                }

                const item = this.matrix[cy][cx];
                if (!item.free) {
                    placed = false;
                    break;
                }
            }

            if (placed) {//если причин, чтобы не кидать нет, то можно киунть кораблояь на поле
                Object.assign(ship, { x, y });
            }
        }

        this.#changed = true;
        return true;
    }

        removeShip(ship)
        {

            if (!this.ships.includes(ship)) {//если уже нет такого корабля, то удалять не нужно
                return false;
            }

            const index = this.ships.indexOf(ship);
            this.ships.splice(index, 1);//удаление корабля по индексу

            ship.x = null;
            ship.y = null;

            this.#changed = true;
            return true;
        }

        removeAllShips()
        {
            //удаление всех кораблей, просто пробегаемся по всем кораблям и удаляем их
            const ships = this.ships.slice();

            for (const ship of ships) {
                this.removeShip(ship);
            }
            return ships.length; // возвращаем кол-во удаленных кораблей
        }

    addShot(shot) {
        for (const { x, y } of this.shots) {
            if (x === shot.x && y === shot.y) {
                return false;
            }
        }

        this.shots.push(shot);
        this.#changed = true;

        const matrix = this.matrix;
        const { x, y } = shot;

        if (matrix[y][x].ship) {
            shot.setVariant("wounded");

            const { ship } = matrix[y][x];
            const dx = ship.direction === "row";
            const dy = ship.direction === "column";

            let killed = true;

            for (let i = 0; i < ship.size; i++) {
                const cx = ship.x + dx * i;
                const cy = ship.y + dy * i;
                const item = matrix[cy][cx];

                if (!item.wounded) {
                    killed = false;
                    break;
                }
            }

            if (killed) {
                ship.killed = true;

                for (let i = 0; i < ship.size; i++) {
                    const cx = ship.x + dx * i;
                    const cy = ship.y + dy * i;

                    const shot = this.shots.find(
                        (shot) => shot.x === cx && shot.y === cy
                    );
                    shot.setVariant("killed");
                }
            }
        }

        this.#changed = true;
        return true;
    }

    removeShot(shot) {
        if (!this.shots.includes(shot)) {
            return false;
        }

        const index = this.shots.indexOf(shot);
        this.shots.splice(index, 1);

        this.#changed = true;
        return true;
    }

    removeAllShots() {
        const shots = this.shots.slice();

        for (const shot of shots) {
            this.removeShot(shot);
        }

        return shots.length;
    }

    randomize(ShipClass = Ship) {
        this.removeAllShips();

        for (let size = 4; size >= 1; size--) {
            for (let n = 0; n < 5 - size; n++) {
                const direction = getRandomFrom("row", "column");
                const ship = new ShipClass(size, direction);

                while (!ship.placed) {
                    const x = getRandomBetween(0, 9);
                    const y = getRandomBetween(0, 9);

                    this.removeShip(ship);
                    this.addShip(ship, x, y);
                }
            }
        }
    }

    clear() {
        this.removeAllShots();
        this.removeAllShips();
    }
}

