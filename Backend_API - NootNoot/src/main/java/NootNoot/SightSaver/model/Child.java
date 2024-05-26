package NootNoot.SightSaver.model;

import jakarta.persistence.*;

@Entity
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long parent_id;
    private Long sensor_id;
    private String name;

    public Child() {
    }

    public Long getId() {return this.id;}

    public String getName() {
        return this.name;
    }

    public long getParent() {
        return this.parent_id;
    }

    public long getSensor_id() {
        return this.sensor_id;
    }


    public void setName(String newName) {
        this.name = newName;
    }
    public void setParent(long newParent_id) {this.parent_id = newParent_id;}
    public void setSensor_id(long newSensor_id) {this.sensor_id = newSensor_id;}


}