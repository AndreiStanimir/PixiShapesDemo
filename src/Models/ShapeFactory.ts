import { SHAPES } from "pixi.js";
import { Ellipse } from "./Ellipse";
import { Shape } from "./Shape";
import { ShapeBuilder } from "./ShapeBuilder";
export class ShapeFactory {
    public static CreateShape() {
        let shapeList = [SHAPES.CIRC, SHAPES.ELIP, SHAPES.POLY];
        var randomShape = shapeList[Math.floor(Math.random() * shapeList.length)];
    }
    public static CreatePolygon() {}
    public static CreateCircle() {}
    public static CreateEllipse(): Shape {
        let shape = ShapeBuilder.GetEllipse().RandomPostion(300, 300).BuildShape();
        return shape;
    }
}
