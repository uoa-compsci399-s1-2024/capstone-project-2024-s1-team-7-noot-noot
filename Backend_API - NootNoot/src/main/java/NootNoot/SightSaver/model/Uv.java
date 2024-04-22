package NootNoot.SightSaver.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
public class UV {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float uv_value;
    private LocalDateTime date_time;


    public UV() {
    }

    public UV(float uv_value, String date_time) {
        this.date_time = LocalDateTime.parse(date_time, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.uv_value = uv_value;

    }


    public Long getId() {return this.id;}
    public float getLux_value(){return this.uv_value;}
    public LocalDateTime getDate_time(){return this.date_time;}


    public void setLux_value(float lux_value){this.uv_value = lux_value;}
    public void setDate_time(String date_time){this.date_time = LocalDateTime.parse(date_time, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));}

}
