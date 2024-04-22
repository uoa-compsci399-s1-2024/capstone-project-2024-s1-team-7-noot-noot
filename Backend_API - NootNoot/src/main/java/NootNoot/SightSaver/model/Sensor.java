package NootNoot.SightSaver.model;

import jakarta.persistence.*;

@Entity
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long user_id;
    private Long lux_id;
    private Long uv_id;


    public Sensor() {
    }


    public Sensor(Long user_id, Long lux_id, Long uv_id) {
        this.user_id = user_id;
        this.lux_id = lux_id;
        this.uv_id = uv_id;

    }


    public Long getId() {return this.id;}
    public Long getUserId() {return this.user_id;}
    public Long getLuxId() {return this.lux_id;}
    public Long getUvId() {return this.uv_id;}

    public void setUserId(Long user_id) {this.user_id = user_id;}
    public void setLuxId(Long lux_id) {this.lux_id = lux_id;}
    public void setUvId(Long uv_id) {this.uv_id = uv_id;}

}
