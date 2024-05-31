package NootNoot.SightSaver.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private Long child_id;

    public Sensor() {
    }

    public String getId() {return this.id;}
    public Long getChild_id() {return this.child_id;}

    public void setChild_id(Long child_id) {
        this.child_id = child_id;
    }

    public String toString() {
        return "Sensor [id=" + id + ", userId=" + child_id + "]";
    }
}
