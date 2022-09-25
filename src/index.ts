import { getLayersExample } from "./layers-example";
import "./style.css";
import { ShapesController } from "./Controllers/ShapesController";
import * as PIXI from "pixi.js";
import { Application, Graphics, Point, Ticker } from "pixi.js";
import { Ellipse } from "./Models/Ellipse";
import { ShapeFactory } from "./Models/ShapeFactory";
import { ShapeBuilder } from "./Models/ShapeBuilder";

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;
// const PIXI = require('pixi.js');

const ticker = Ticker.shared; // recommended :)

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

let shapesController: ShapesController = new ShapesController(10, 1, gameHeight, gameWidth);

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    document.body.appendChild(app.view);

    var labelGravity = document.createElement("label");
    labelGravity.innerText = "Gravity: " + shapesController.gravity;
    labelGravity.style.color = "red";
    document.body.appendChild(labelGravity);
    var btn = document.createElement("button");
    btn.innerText = "+";
    document.body.appendChild(btn);
    btn.onclick = function () {
        shapesController.gravity += 1;
        labelGravity.innerText = "Gravity: " + shapesController.gravity;
    };
    btn = document.createElement("button");
    btn.innerText = "-";
    btn.onclick = function () {
        shapesController.gravity -= 1;
        labelGravity.innerText = "Gravity: " + shapesController.gravity;
    };
    document.body.appendChild(btn);
    var labelShapesPerSecond = document.createElement("label");
    labelShapesPerSecond.innerText = "Shapes per secound: " + shapesController.shapesPerSecond;
    labelShapesPerSecond.style.color = "red";
    document.body.appendChild(labelShapesPerSecond);
    var btn = document.createElement("button");
    btn.innerText = "+";
    document.body.appendChild(btn);
    btn.onclick = function () {
        shapesController.shapesPerSecond += 1;
        labelShapesPerSecond.innerText = "Shapes per secound: " + shapesController.shapesPerSecond;
    };
    btn = document.createElement("button");
    btn.innerText = "-";
    btn.onclick = function () {
        shapesController.shapesPerSecond -= 1;
        labelShapesPerSecond.innerText = "Shapes per secound: " + shapesController.shapesPerSecond;
    };
    document.body.appendChild(btn);
    //getLayersExample(app);

    resizeCanvas();

    //app.stage.addChild(birdFromSprite);
    //app.stage.addChild(spineExample);
    app.stage.interactive = true;

    drawShapes();
    drawShapesExample();
    ticker.speed = 0.1;
    //var renderer = PIXI.autoDetectRenderer({ width: 720, height: 364, backgroundColor: 0x000000, antialias: true });

    //document.body.appendChild(renderer.view);
    app.stage.on("click", onPointerDown);

    function onPointerDown(e: any) {
        let x = e.data.global.x;
        let y = e.data.global.y;
        console.log(x, y);

        shapesController.addRandomShape(x, y);
    }
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
    var renderer = app.renderer;
    //PIXI.autoDetectRenderer({ width: 720, height: 364, backgroundColor: 0x000000, antialias: true });
    document.body.appendChild(renderer.view);

    // Create the main stage for your display objects
    var stage = new PIXI.Container();

    // Initialize the pixi Graphics class
    var graphics = new PIXI.Graphics();

    // Set the fill color

    shapesController.shapes = [new Ellipse(20, 20), new Ellipse(20, 20)];
    shapesController.shapes = [
        ShapeFactory.CreateEllipse(),
        ShapeBuilder.GetEllipse().RandomPostion(gameHeight, gameWidth).BuildShape(),
        ShapeBuilder.GetPolygon(gameHeight, gameWidth, [new Point(20, 20), new Point(30, 50), new Point(70, 90)])
            //.RandomPostion(gameHeight, gameWidth)
            .SetPosition(new Point(200, 200))
            .BuildShape(),
        ShapeBuilder.GetPolygon(gameHeight, gameHeight, [
            new Point(20, 20),
            new Point(30, 50),
            new Point(70, 90),
            new Point(70, 120),
        ])
            //.RandomPostion(gameHeight, gameWidth)
            .SetPosition(new Point(100, 100))
            .BuildShape(),
    ];
    shapesController.shapes.forEach((shape) => {
        var shapeGraphics = shape.drawShape();
        shapeGraphics.beginFill(0x000000);
        shapeGraphics.drawRect(100, 100, 100, 100);
        shapeGraphics.endFill();
        shapeGraphics.position = shape.position;
        //console.log(shapeGraphics);
        stage.addChild(shapeGraphics); // drawCircle(x, y, radius)
    });
    var shapeGraphics = new PIXI.Graphics(); // shapesController.shapes[0].drawShape();
    shapeGraphics.beginFill(0x000000);
    shapeGraphics.drawRect(100, 100, 100, 100);
    shapeGraphics.endFill();
    shapeGraphics.position = shapesController.shapes[0].position;
    //console.log(shapeGraphics);
    stage.addChild(shapeGraphics); // drawCircle(x, y, radius)

    // app.ticker.speed = 1;
    // app.ticker.maxFPS = 10;
    // app.ticker.add((time) => {
    //     shapesController.updateShapePositions();
    //     shapesController.shapes.forEach((shape) => {
    //         let shapeGraphics = shape.drawShape();
    //         shapeGraphics.position = shape.position;
    //         stage.addChild(shapeGraphics);
    //         //graphics.drawCircle(60, 185, 40); // drawCircle(x, y, radius)
    //     });
    //     stage.addChild(graphics);
    //     renderer.render(stage);
    //     console.log(time);
    // });
    // app.ticker.stop();
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

    var graphicsShapes: Graphics[] = shapesController.shapes.map((shape) => {
        var shapeGraphics = shape.drawShape();
        shapeGraphics.beginFill(0x000000);
        shapeGraphics.endFill();
        shapeGraphics.position = shape.position;
        //console.log(shapeGraphics);
        stage.addChild(shapeGraphics); // drawCircle(x, y, radius)
        return shapeGraphics;
    });
    shapesController.shapes.forEach((shape) => {});
    app.ticker.speed = 0.01;
    app.ticker.minFPS = 1;
    app.ticker.maxFPS = 5;
    app.ticker.add((time) => {
        console.log(app.ticker.FPS);

        shapesController.updateShapePositions();
        console.log(shapesController.shapes);
        graphicsShapes.forEach((shape) => shape.clear());
        graphicsShapes = shapesController.shapes.map((shape) => {
            var shapeGraphics = shape.drawShape();
            // console.log(shapeGraphics.position);
            //graphics.drawCircle(60, 185, 40); // drawCircle(x, y, radius)
            stage.addChild(shapeGraphics);
            return shapeGraphics;
        });
        stage.addChild(graphics);
        requestAnimationFrame(animate);
        function animate(time: any) {
            ticker.update(time);
            renderer.render(stage);
            requestAnimationFrame(animate);
        }
        animate(time);
    });
    // Add the graphics to the stage
}
