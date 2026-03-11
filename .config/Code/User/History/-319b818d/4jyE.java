// Introduction to Software Testing
// Authors: Paul Ammann & Jeff Offutt
// Chapter 1, page ??
// JUnit tests for Vehicle.java, Truck.java 

import static org.junit.Assert.*;
import org.junit.*;
import java.util.*;

public class CloneTest {
   // this test passes
   @Test
   public void cloneSuper() {
      Vehicle v = new Vehicle(4);
      Vehicle w = (Vehicle) v.clone();
      assertFalse(v == w);
      assertEquals(v.getClass(), w.getClass());
      assertTrue(v.equals(w));
   }

   // this test fails!
   @Test
   public void cloneSub() {
      Truck s = new Truck(4);
      Truck t = (Truck) s.clone();
      assertFalse(s == t);
      assertEquals(s.getClass(), t.getClass());
      assertTrue(s.equals(t));
   }
}
