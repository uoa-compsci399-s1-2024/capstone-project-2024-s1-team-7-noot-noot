package NootNoot.SightSaver.model;

import jakarta.persistence.*;

@Entity
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long child_id;

    public Sensor() {
    }

    public Sensor(Long child_id) {
        this.child_id = child_id;
    }


    public Long getId() {return this.id;}
    public Long getChild_id() {return this.child_id;}

    public String toString() {
        return "Sensor [id=" + id + ", userId=" + child_id + "]";
    }
}
