import { SHAPES } from "pixi.js";
import { Ellipse } from "./Ellipse";
import { Shape } from "./Shape";
import { ShapeBuilder } from "./ShapeBuilder";
export class ShapeFactory {
    public static CreateRandomShape(): Shape {
        var shapeList: { (): Shape }[] = [this.CreateCircle, this.CreateEllipse, this.CreateRandomShape];
        var randomShape = shapeList[Math.floor(Math.random() * shapeList.length)];

        return randomShape();
    }
    public static CreatePolygon(): Shape {
        return ShapeBuilder.GetPolygon().RandomPostion().BuildShape();
    }
    public static CreateCircle(): Shape {
        let shape = ShapeBuilder.GetEllipse().RandomPostion(300, 300).BuildShape();
        return shape;
    }
    public static CreateEllipse(): Shape {
        let shape = ShapeBuilder.GetEllipse().RandomPostion(300, 300).BuildShape();
        return shape;
    }
}
