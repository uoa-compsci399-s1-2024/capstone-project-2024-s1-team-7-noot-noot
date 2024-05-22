package NootNoot.SightSaver.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddChildRequest {
    private String email;
    private String name ;
    private long sensor_id;
}