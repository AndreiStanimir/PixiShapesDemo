import e from "express";
import { Point } from "pixi.js";
import { Shape } from "../Models/Shape";
import { ShapeBuilder } from "../Models/ShapeBuilder";
import { ShapeFactory } from "../Models/ShapeFactory";
export class ShapesController {
    shapesPerSecond: number = 0;
    gravity: number;
    shapes: Shape[] = [];
    windowWidth: number;
    windowHeight: number;

    constructor(gravity: number, shapesPerSecond: number, windowHeight: number, windowWidith: number) {
        this.gravity = gravity;
        this.shapesPerSecond = shapesPerSecond;
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidith;

        for (let i = 0; i < 5; i++) {}
    }
    getTotalAreaOccupiedByShases(): number {
        return this.shapes.map((shape) => shape.getArea()).reduce((prev, next) => prev + next);
    }
    updateShapePositions(): void {
        this.shapes.forEach((shape) => {
            shape.updatePosition(this.gravity);
            shape.gravity += this.gravity / 1000;
            // console.log(shape.position.y);
            shape.position.y += this.gravity / 20;
            // console.log(shape.position.y);
            shape.position.y = Math.min(shape.position.y, this.windowHeight);
        });
    }
    addRandomShape(x?: number, y?: number) {
        this.shapes.push(ShapeBuilder.GetCircle(10).SetPosition(new Point(10, 10)).BuildShape());
        if (x == undefined || y == undefined)
            this.shapes.push(ShapeBuilder.GetRandomShape().RandomPostion().BuildShape());
        else this.shapes.push(ShapeBuilder.GetRandomShape().SetPosition(new Point(x, y)).BuildShape());
    }
}
