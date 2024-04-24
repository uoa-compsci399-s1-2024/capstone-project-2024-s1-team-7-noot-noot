package NootNoot.SightSaver.model;

import jakarta.persistence.*;

@Entity
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int parent_id;
    private int sensor_id;
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

    public int getSensor_id() {
        return this.sensor_id;
    }


    public void setName(String newName) {
        this.name = newName;
    }
    public void setParent(int newParent_id) {this.parent_id = newParent_id;}
    public void setSensor_id(int newSensor_id) {this.sensor_id = newSensor_id;}


}