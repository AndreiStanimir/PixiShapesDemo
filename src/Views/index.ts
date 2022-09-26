import "./style.css";
import { ShapesController } from "../Controllers/ShapesController";
import * as PIXI from "pixi.js";
import { Application, Graphics, Point, Ticker } from "pixi.js";
import { Ellipse } from "../Models/Ellipse";
import { ShapeFactory } from "../Models/ShapeFactory";
import { ShapeBuilder } from "../Models/ShapeBuilder";

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
var stage = new PIXI.Container();
var renderer = app.renderer;
var labelShapesCount: HTMLLabelElement;
window.onload = async (): Promise<void> => {
    document.body.appendChild(app.view);

    //getLayersExample(app);
    addLabelsAndButtons();

    resizeCanvas();

    //app.stage.addChild(birdFromSprite);
    //app.stage.addChild(spineExample);
    app.stage.interactive = true;

    //drawShapes();

    //drawShapesExample();
    drawBasic();

    drawClickableRectangle();

    ticker.speed = 0.1;
    ticker.maxFPS = 1;
    ticker.minFPS = 1;
    ticker.start();

    //var renderer = PIXI.autoDetectRenderer({ width: 720, height: 364, backgroundColor: 0x000000, antialias: true });

    //document.body.appendChild(renderer.view);
    // app.stage.on("click", onPointerDown);

    // function onPointerDown(e: any) {
    //     let x = e.data.global.x;
    //     let y = e.data.global.y;
    //     console.log(x, y);

    //     shapesController.addRandomShape(x, y);
    // }
};

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight - 200);
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

    shapesController.shapes = [new Ellipse(20, 50), new Ellipse(20, 20)];
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
        ShapeBuilder.GetRandomShape().RandomPostion(gameHeight, gameWidth).BuildShape(),
        ShapeBuilder.GetRandomShape().RandomPostion(gameHeight, gameWidth).BuildShape(),
        ShapeBuilder.GetRandomShape().RandomPostion(gameHeight, gameWidth).SetPosition(new Point(10, 100)).BuildShape(),
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

function addLabelsAndButtons() {
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
        labelShapesPerSecond.innerText = "Shapes per second: " + shapesController.shapesPerSecond;
    };
    btn = document.createElement("button");
    btn.innerText = "-";
    btn.onclick = function () {
        shapesController.shapesPerSecond -= 1;
        labelShapesPerSecond.innerText = "Shapes per second: " + shapesController.shapesPerSecond;
    };
    document.body.appendChild(btn);

    document.body.appendChild(document.createElement("br"));

    labelShapesCount = document.createElement("label");
    labelShapesCount.innerText = "Shapes inside the stage: " + shapesController.shapes.length;
    labelShapesCount.style.color = "red";
    document.body.appendChild(labelShapesCount);
}

var graphicsShapes: Graphics[];

function updateShapePositions(time: number) {
    // graphicsShapes = shapesController.shapes.map((shape) => {
    // //     var shapeGraphics = shape.drawShape();
    // //     shapeGraphics.beginFill(0x000000);
    // //     shapeGraphics.endFill();
    // //     shapeGraphics.position = shape.position;
    // //     //console.log(shapeGraphics);
    // //     stage.addChild(shapeGraphics); // drawCircle(x, y, radius)
    // //     return shapeGraphics;
    // // });
    // function animate(time: any) {
    //     graphicsShapes.forEach((shape) => (shape.position.y += 5));
    //     ticker.update(time);
    //     app.renderer.render(stage);
    //     requestAnimationFrame(animate);
    // }
    // animate(time);
}

function drawBasic() {
    graphicsShapes = shapesController.shapes.map((shape) => {
        var shapeGraphics = shape.drawShape();
        shapeGraphics.beginFill(0x000000);
        shapeGraphics.interactive = true;
        shapeGraphics.on("mousedown", onPointerDownOnShapeDestroy).on("touchstart", onPointerDownOnShapeDestroy);

        stage.addChild(shapeGraphics);
        return shapeGraphics;
    });
    console.log(graphicsShapes);
    update();
}
function drawClickableRectangle() {
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xff0000, 1);
    graphics.interactive = true;
    graphics.beginFill(0x00000a, 0);
    graphics.hitArea = new PIXI.Rectangle(10, 200, gameWidth, gameHeight - 100);
    graphics.on("mousedown", onPointerDown).on("touchstart", onPointerDown);
    graphics.drawRoundedRect(10, 200, gameWidth, gameHeight - 100, 1);
    graphics.endFill();
    stage.addChild(graphics); // drawCircle(x, y, radius)
    return graphics;
    function onPointerDown(e: any) {
        let x = e.data.global.x;
        let y = e.data.global.y;
        console.log(x, y);

        shapesController.addRandomShape(x, y);
        graphicsShapes.push(shapesController.shapes[shapesController.shapes.length - 1].drawShape());
        console.log(shapesController.shapes);
        update();
    }
}
setInterval(() => {
    for (let i = 0; i < shapesController.shapesPerSecond; i++) {
        shapesController.addRandomShape();
        var graphics = shapesController.shapes[shapesController.shapes.length - 1].drawShape();
        graphicsShapes.push(graphics);
        stage.addChild(graphics);

        //requestAnimationFrame(update);
    }
}, 1000);
function update() {
    graphicsShapes.forEach((shape, i) => {
        shapesController.updateShapePositions();

        shape.position.y = shapesController.shapes[i].position.y;
    });
    for (let i = graphicsShapes.length - 1; i >= 0; i--) {
        const element = graphicsShapes[i];
        if (element.position.y > gameHeight - 50) {
            graphicsShapes.splice(i, 1);
            shapesController.shapes.splice(i, 1);
        }
    }
    requestAnimationFrame(update);

    app.renderer.render(stage);
}
function onPointerDownOnShapeDestroy(e: any) {
    console.log("destroy shape");
    console.log(e);
}
ticker.maxFPS = 1;
ticker.minFPS = 1;
ticker.autoStart = false;
ticker.add((time) => {
    console.warn(ticker.FPS);
    console.log(labelShapesCount);
    if (shapesController?.shapes?.length !== undefined)
        labelShapesCount.innerText = "Shapes inside the stage: " + shapesController?.shapes?.length;
    document.body.appendChild(labelShapesCount);
    updateShapePositions(time);
    //stage.removeChildren(0);
    console.log(stage.children);
    shapesController.updateShapePositions();
    console.log(shapesController.shapes);
});

// setInterval(() => {
//     drawBasic();
// }, 100
// );
