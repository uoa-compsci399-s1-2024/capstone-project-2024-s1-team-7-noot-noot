package NootNoot.SightSaver.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private String username;
    private String email;
    private boolean parent;

    public UserDTO() {}

    public UserDTO(String username, String email, boolean parent) {
        this.username = username;
        this.email = email;
        this.parent = parent;
    }
}
