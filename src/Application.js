// само приложение

class Application {
    mouse = null;
    player = null;
    opponent = null;

    scenes = {};

    constructor(scenes = {}) {
        const mouse = new Mouse(document.body);
        const player = new BattlefieldView(true);
        const opponent = new BattlefieldView(false);

        this.opponent = opponent;
        this.player = player;
        this.mouse = mouse;

        // добавление элементов
        document.querySelector('[data-side="player"]').append(player.root);
        document.querySelector('[data-side="opponent"]').append(opponent.root);

        //Object.entries переформатирует тип класса ( name : 'Vadim') в вид массива с ключом (['name', 'Vadim'])
        //[sceneName, SceneClass] - это деструктаризация (в первую записывается первая часть - ключ, во второй )
        for(const [sceneName, SceneClass] of Object.entries(scenes)){
            this.scenes[sceneName] = new SceneClass(sceneName, this);
        }

        for (const scene of Object.values(this.scenes)){
            scene.init();
        }
        requestAnimationFrame(()=>this.tick());
    }

    tick() {
        requestAnimationFrame(() => this.tick());

        if (this.activeScene) {
            this.activeScene.update();
        }

        this.mouse.tick();
    }

    //работа с активной сценой и проверки
    //запуск непосредственно сцены и остановка, проверки
    start(sceneName, ...args) {
        if (this.activeScene && this.activeScene.name === sceneName) {
            return false;
        }

        if (!this.scenes.hasOwnProperty(sceneName)) {
            return false;
        }

        if (this.activeScene) {
            this.activeScene.stop();
        }

        const scene = this.scenes[sceneName];
        this.activeScene = scene;
        scene.start(...args);

        return true;
    }
}