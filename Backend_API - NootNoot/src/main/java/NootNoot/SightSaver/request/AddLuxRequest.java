package NootNoot.SightSaver.request;

import NootNoot.SightSaver.model.Lux;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddLuxRequest {

    private String email;
    private List<Lux> luxList;

}
