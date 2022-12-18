//  состояние приложениия: подготовка, подбор игроков, сама игра...

class Scene {
    name = null;
    app = null;

    constructor(name, app) {
        Object.assign(this, {name, app});
    }

    //инициализация сцены
    init() {
    }

    //старт сцены
    start() {
    }

    //обновление сцены
    update() {
    }

    //остановка сцены
    stop() {
    }
}

