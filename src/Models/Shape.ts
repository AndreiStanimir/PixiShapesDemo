import { Point } from "pixi.js";
import "./Color"
export class Shape {
    color: Color;
    position: Point;
    points: Point[];
    velocity: Point;
    gravity: number;

    constructor(position: Point, points: Point[], velocity: Point, gravity: number) {
        this.position = position;
        this.points = points;
        this.velocity = velocity;
        this.gravity = gravity;
        this.color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","
            +
            Math.floor(Math.random() * 255) + ")";
    }
    updatePosition(gravitySpeed: number): void {
        this.gravity += gravitySpeed;
        this.position.y += this.velocity.y + this.gravity;
    }
    getArea(): number {
        return 0;
    }
}
