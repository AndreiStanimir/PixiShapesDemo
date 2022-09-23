import { SHAPES } from "pixi.js";

class ShapeFactory {
    public static CreateShape() {
        let shapeList = [SHAPES.CIRC, SHAPES.ELIP, SHAPES.POLY];
        var randomShape = shapeList[Math.floor(Math.random() * shapeList.length)];
    }
}
