import { Shape } from "./Shape";
import { Ellipse } from "./Ellipse";
import { Polygon } from "./Polygon";
import { Circle } from "./Circle";
import { Point } from "pixi.js";
export class ShapeBuilder {
    static shape: Shape;
    // public static GetCircle() {
    //     this.shape = new Shape();
    // }
    public static GetEllipse() {
        this.shape = new Ellipse(20, 20);
        return this;
    }
    public static GetCircle(radius?: number) {
        if (radius === undefined) radius = this.randomIntFromInterval(3, 10);
        this.shape = new Circle(radius);
        return this;
    }
    public static GetPolygon(maxHeight: number = 600, maxWidth: number = 600, points?: Point[]) {
        if (points === undefined) {
            var numberOfRandomPoints = this.randomIntFromInterval(3, 10);
            var pointsList = [];
            for (var i = 0; i < numberOfRandomPoints; i++) {
                pointsList.push(
                    new Point(this.randomIntFromInterval(100, maxWidth), this.randomIntFromInterval(10, maxHeight)),
                );
            }

            this.shape = new Polygon(pointsList);
            return this;
        }
        this.shape = new Polygon(points);
        return this;
    }

    public static SetPosition(position: Point) {
        this.shape.position = position;
        return this;
    }
    public static GetRandomShape() {
        var array = [ShapeBuilder.GetEllipse, ShapeBuilder.GetCircle, ShapeBuilder.GetPolygon];
        let randomInt = this.randomIntFromInterval(0, array.length - 1);
        console.log(randomInt);
        return ShapeBuilder.GetPolygon();
        return array[randomInt]();
    }
    public static RandomPostion(maxHeight: number = 300, maxWidth: number = 300) {
        this.shape.position = new Point(
            this.randomIntFromInterval(50, maxWidth - 50),
            this.randomIntFromInterval(50, maxHeight - 50),
        );
        return this;
    }
    public static BuildShape(): Shape {
        return this.shape;
    }

    static randomIntFromInterval(min: number, max: number): number {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
