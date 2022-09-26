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
        var graphics = new Graphics();
        graphics.beginFill(this.color, 0.4);
        console.log("color:" + this.color);
        graphics.lineStyle(1, Math.random() * 0xffffff);
        graphics.position.x = this.position.x;
        graphics.position.y = this.position.y;
        graphics.drawCircle(this.position.x, this.position.y, this.radius);
        graphics.endFill();
        return graphics;
    }
}
