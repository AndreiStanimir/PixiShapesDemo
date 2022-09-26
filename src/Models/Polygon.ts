import { Graphics, Point } from "pixi.js";
import { Shape } from "./Shape";

export class Polygon extends Shape {
    points: Point[];
    getArea(): number {
        var total = 0;

        for (var i = 0, l = this.points.length; i < l; i++) {
            var addX = this.points[i].x;
            var addY = this.points[i == this.points.length - 1 ? 0 : i + 1].y;
            var subX = this.points[i == this.points.length - 1 ? 0 : i + 1].x;
            var subY = this.points[i].y;

            total += addX * addY * 0.5;
            total -= subX * subY * 0.5;
        }

        return Math.abs(total);
    }
    drawShape(): Graphics {
        var graphics = new Graphics();
        graphics.beginFill(this.color, 0.4);
        console.log("color:" + this.color);
        graphics.lineStyle(1, Math.random() * 0xffffff);
        graphics.position.x = this.position.x;
        graphics.position.y = this.position.y;
        graphics.drawPolygon(this.points);
        graphics.endFill();
        return graphics;
    }
    constructor(points: Point[]) {
        super();
        this.points = points;
    }
}
