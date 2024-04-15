package NootNoot.SightSaver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class TestController {

    @GetMapping
    public Object hello() {
        java.util.Map<String, String> object = new HashMap<>();
        object.put("name", "test name");
        object.put("email", "test@email.com");
        return object;
    }
}
git