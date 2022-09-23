class Ellipse extends Shape {
    Points: Point[];
    constructor(parameters) {
        this.color =
            "rgb(" +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            ")";
    }
}
