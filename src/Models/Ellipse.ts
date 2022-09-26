import { Shape } from "./Shape";
import * as PIXI from "pixi.js";
import { Graphics } from "pixi.js";

export class Ellipse extends Shape {
    width: number;
    height: number;
    getArea(): number {
        return Math.PI * this.width * this.height;
    }
    constructor(a: number, b: number) {
        super();
        this.width = a;
        this.height = b;
    }
    drawShape(): Graphics {
        var graphics = new Graphics();
        graphics.beginFill(this.color, 0.4);
        console.log("color:" + this.color);
        graphics.lineStyle(1, Math.random() * 0xffffff);
        graphics.position.x = this.position.x;
        graphics.position.y = this.position.y;
        graphics.drawEllipse(this.position.x, this.position.y, this.width, this.height);
        graphics.endFill();
        return graphics;
    }
}
