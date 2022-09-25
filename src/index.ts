import { getLayersExample } from "./layers-example";
import "./style.css";
import { ShapesController } from "./Controllers/ShapesController";
import * as PIXI from "pixi.js";
import { Application } from "pixi.js";
import { Ellipse } from "./Models/Ellipse";
import { ShapeFactory } from "./Models/ShapeFactory";
import { ShapeBuilder } from "./Models/ShapeBuilder";

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;
// const PIXI = require('pixi.js');

const Ticker = PIXI.Ticker; // recommended :)

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    document.body.appendChild(app.view);

    //getLayersExample(app);

    resizeCanvas();

    //app.stage.addChild(birdFromSprite);
    //app.stage.addChild(spineExample);
    app.stage.interactive = true;

    drawShapes();
    drawShapesExample();

    var renderer = PIXI.autoDetectRenderer({ width: 720, height: 364, backgroundColor: 0x000000, antialias: true });

    document.body.appendChild(renderer.view);
};

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
}

function drawShapes(): void {
    var renderer = PIXI.autoDetectRenderer({ width: 720, height: 364, backgroundColor: 0x000000, antialias: true });
    document.body.appendChild(renderer.view);

    // Create the main stage for your display objects
    var stage = new PIXI.Container();

    // Initialize the pixi Graphics class
    var graphics = new PIXI.Graphics();

    // Set the fill color

    let shapesController: ShapesController = new ShapesController(10, 1, gameHeight, gameWidth);
    shapesController.shapes = [new Ellipse(20, 20), new Ellipse(20, 20)];
    shapesController.shapes = [
        ShapeFactory.CreateEllipse(),
        ShapeBuilder.GetEllipse().RandomPostion(gameHeight, gameWidth).BuildShape(),
    ];
    shapesController.shapes.forEach((shape) => {
        graphics.beginFill(0xe74c3c);
        graphics.addChild(shape.drawShape());
        //graphics.drawCircle(60, 185, 40); // drawCircle(x, y, radius)
        graphics.endFill();
    });

    stage.addChild(graphics);

    app.ticker.add((delta) => {
        shapesController.updateShapePositions();
    });

    animate();
    function animate() {
        //Render the stage
        renderer.render(stage);
        requestAnimationFrame(animate);
    }
}
function drawShapesExample() {
    var renderer = app.renderer;

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Container();

    // Initialize the pixi Graphics class
    var graphics = new PIXI.Graphics();

    // Set the fill color
    graphics.beginFill(0xe74c3c); // Red

    // Draw a circle
    graphics.drawCircle(60, 185, 40); // drawCircle(x, y, radius)

    // Applies fill to lines and shapes since the last call to beginFill.
    graphics.endFill();

    // Set a new fill color
    graphics.beginFill(0x3498db); // Blue

    // Draw an ellipse
    graphics.drawEllipse(170, 185, 45, 25); // drawEllipse(x, y, width, height)
    graphics.endFill();

    graphics.beginFill(0x9b59b6); // Purple

    // Draw a rectangle
    graphics.drawRect(240, 150, 75, 75); // drawRect(x, y, width, height)
    graphics.endFill();

    graphics.beginFill(0x2c3e50); // Dark blue gray 'ish

    // Draw a rectangle with rounded corners
    graphics.drawRoundedRect(350, 160, 75, 50, 10); // drawRoundedRect(x, y, width, height, radius)
    graphics.endFill();

    graphics.beginFill(0xf1c40f); // Yellow

    // Draw a polygon to look like a star
    graphics.drawPolygon([
        550,
        100, // Starting x, y coordinates for the star
        570,
        150, // Star is drawn in a clockwork motion
        630,
        155,
        585,
        195,
        600,
        250,
        550,
        220,
        500,
        250,
        515,
        195,
        470,
        155,
        530,
        150,
    ]);

    graphics.endFill();

    // Add the graphics to the stage
    stage.addChild(graphics);
    animate();
    function animate() {
        //Render the stage
        renderer.render(stage);
        requestAnimationFrame(animate);
    }
}
