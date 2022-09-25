import { Point } from "@pixi/math";
import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";
import "./Color";
export abstract class Shape {
    color: Color;
    position: Point = new Point(0, 0);
    velocity: Point;
    gravity: number;

    constructor(
        position: Point = new Point(0, 0),
        points: Point[] = [],
        velocity: Point = new Point(0, 0),
        gravity: number = 10,
    ) {
        this.position = position;
        this.velocity = velocity;
        this.gravity = gravity;
        this.color =
            "rgb(" +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            ")";
    }
    updatePosition(gravitySpeed: number): void {}
    abstract getArea(): number;
    abstract drawShape(): PIXI.Graphics;
}
