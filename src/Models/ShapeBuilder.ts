import { Shape } from "./Shape";
import { Ellipse } from "./Ellipse";
import { Point } from "@pixi/math";
import { Polygon } from "./Polygon";

export class ShapeBuilder {
    static shape: Shape;
    // public static GetCircle() {
    //     this.shape = new Shape();
    // }
    public static GetEllipse() {
        this.shape = new Ellipse(20, 20);
        return this;
    }
    public static GetCircle() {
        this.shape = new Ellipse(50, 50);
        return this;
    }
    public static GetPolygon(maxHeight: number = 600, maxWidth: number = 600, points?: Point[]) {
        if (points === undefined) {
            var numberOfRandomPoints = this.randomIntFromInterval(3, 10);
            var pointsList = [];
            for (var i = 0; i < numberOfRandomPoints; i++) {
                pointsList.push(new Point(this.randomIntFromInterval(3, 10)));
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
        var array = [ShapeBuilder.GetEllipse(), ShapeBuilder.GetCircle(), ShapeBuilder.GetPolygon()];
        return array[Math.floor(Math.random() * array.length)];
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

    static randomIntFromInterval(min: number, max: number) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
