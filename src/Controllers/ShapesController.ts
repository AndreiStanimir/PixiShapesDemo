import { Shape } from "../Models/Shape";
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
        });
    }
}
