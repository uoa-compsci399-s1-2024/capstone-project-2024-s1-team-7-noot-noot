package NootNoot.SightSaver.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EncodedLux {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sensor_id;
    private String date_time;

    public EncodedLux() {
    }


    public EncodedLux(String datetime) {
        this.date_time = datetime;
    }

    public Long getId() {return this.id;}
    public String getDateTime() {
        return this.date_time;
    }
    public String getSensor_id() {return this.sensor_id;}


    public void setDate_time(String date_time) {this.date_time = date_time;}
}
