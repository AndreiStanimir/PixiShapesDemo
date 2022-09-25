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
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xe74c3c);
        graphics.drawEllipse(this.position.x, this.position.y, this.width, this.height);
        graphics.endFill();
        return graphics;
    }
}
