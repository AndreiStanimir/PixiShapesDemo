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
    public static GetPolygon(points: Point[]) {
        this.shape = new Polygon(points);
        return this;
    }
    public static SetPosition(position: Point) {
        this.shape.position = position;
        return this;
    }
    public static GetRandomShape() {
        var array = [ShapeBuilder.GetEllipse()];
        return array[Math.floor(Math.random() * array.length)];
    }
    public static RandomPostion(maxHeight: number, maxWidth: number) {
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
