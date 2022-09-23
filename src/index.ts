import { Application, Loader, Texture, AnimatedSprite } from "pixi.js";
import { getSpine } from "./spine-example";
import { getLayersExample } from "./layers-example";
import "./style.css";
import "./Models/";
import "./Controllers/ShapesController"
declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;
const PIXI = require('pixi.js');
console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    getLayersExample(app);

    resizeCanvas();

    const birdFromSprite = getBird();
    birdFromSprite.anchor.set(0.5, 0.5);
    birdFromSprite.position.set(gameWidth / 2, 530);

    const spineExample = getSpine();
    spineExample.position.y = 580;

    app.stage.addChild(birdFromSprite);
    app.stage.addChild(spineExample);
    app.stage.interactive = true;

    var renderer = PIXI.autoDetectRenderer(720, 364, { backgroundColor: 0x000000, antialias: true });
    document.body.appendChild(renderer.view);

    let shapesController: ShapesController = new ShapesController();
    shapesController.shapes.forEach(shape => {
        let graphics = new PIXI.Graphics();
        graphics.drawShape(shape);
    });
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("rabbit", "./assets/simpleSpriteSheet.json");
        loader.add("pixie", "./assets/spine-assets/pixie.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}

function getBird(): AnimatedSprite {
    const bird = new AnimatedSprite([
        Texture.from("birdUp.png"),
        Texture.from("birdMiddle.png"),
        Texture.from("birdDown.png"),
    ]);

    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(3);

    return bird;
}
