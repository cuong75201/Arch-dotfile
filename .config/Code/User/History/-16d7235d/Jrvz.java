// Introduction to Software Testing
// Authors: Paul Ammann & Jeff Offutt
// Chapter 1, page ??
// Truck class for CloneTest.java

public class Truck extends Vehicle implements Cloneable {
    public Truck(int wheels) {
        super(wheels);
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return new Truck(this.getWheels());
    }
}