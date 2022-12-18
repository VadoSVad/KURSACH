// //элемент класса Mouse
// const mouse = new Mouse(document.body)
//
// // повтор события при каждом обновлении экрана
// requestAnimationFrame(tick);
//
// function tick(){
//     requestAnimationFrame(tick);
//
//     console.log(mouse.left, mouse.pLeft);
//
//     mouse.tick(0);
// }

// const battlefield = new BattlefieldView();
// console.log(battlefield);

const app = new Application({
    preparation: PreparationScene,
    computer: ComputerScene,
});

app.start("preparation");