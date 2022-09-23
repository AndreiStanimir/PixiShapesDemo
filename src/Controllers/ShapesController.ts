import { Shape } from "../Models/Shape";
class ShapesController {
    shapesPerSecond: number = 0;
    gravity: number;
    shapes: Shape[] = [];

    constructor(gravity: number, shapesPerSecond: number) {
        this.gravity = gravity;
        this.shapesPerSecond = shapesPerSecond;
    }
    getTotalAreaOccupiedByShases(): number {
        return this.shapes.map((shape) => shape.getArea()).reduce((prev, next) => prev + next);
    }
}
