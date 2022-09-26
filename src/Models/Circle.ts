import { Shape } from "./Shape";
import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";

export class Circle extends Shape {
    radius: number;
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    constructor(radius: number) {
        super();
        this.radius = radius;
    }
    drawShape(): Graphics {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(this.color, 0.5);
        graphics.lineStyle(this.color);
        graphics.drawCircle(this.position.x, this.position.y, this.radius);
        graphics.endFill();
        return graphics;
    }
}
