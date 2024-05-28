package NootNoot.SightSaver.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class Lux{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float lux_value;
    private LocalDateTime date_time;
    private String sensorId;


    public Lux() {
    }



    public Lux(float lux_value, String date_time, String sensorId) {
        this.date_time = LocalDateTime.parse(date_time, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.lux_value = lux_value;
        this.sensorId = sensorId;
    }


    public Long getId() {return this.id;}
    public float getLux_value(){return this.lux_value;}
    public LocalDateTime getDate_time(){return this.date_time;}
    public String getSensorId(){return this.sensorId;}

    @Override
    public String toString() {
        return "Lux{" +
                "id=" + id +
                ", lux_value=" + lux_value +
                ", date_time=" + date_time +
                ", sensorId=" + sensorId +
                '}';
    }

    public void setId(Long id){this.id = id;}
    public void setLux_value(float lux_value){this.lux_value = lux_value;}
    public void setDate_time(String date_time){this.date_time = LocalDateTime.parse(date_time, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));}


}
