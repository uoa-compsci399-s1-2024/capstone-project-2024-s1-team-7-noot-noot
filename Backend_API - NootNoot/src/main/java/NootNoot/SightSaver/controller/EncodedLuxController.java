package NootNoot.SightSaver.controller;


import NootNoot.SightSaver.model.EncodedLux;
import NootNoot.SightSaver.service.EncodedLuxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/encodedLux")
public class EncodedLuxController {

    @Autowired
    private EncodedLuxService encodedLuxService;

    @GetMapping
    public List<EncodedLux> getEncodedLux() {
       return encodedLuxService.getAllEncodedLux();
    }
}
