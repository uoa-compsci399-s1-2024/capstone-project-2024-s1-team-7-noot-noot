package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Lux;
import NootNoot.SightSaver.service.LuxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lux")
public class LuxController {

    @Autowired
    private LuxService luxService;

    @GetMapping
    public List<Lux> getAll() {
        return luxService.getAllLuxValues();
    }

    @GetMapping("/{id}")
    public Lux getLuxByID(@PathVariable Long id) {
        return luxService.getLuxValueById(id);
    }

    @GetMapping("/numberOfLuxValues")
    public Long getNumberOfLuxValues() {
        return luxService.getNumberOfLuxValues();
    }

    @PostMapping
    public Lux addLux(@RequestBody Lux lux) {
        return luxService.saveLux(lux);
    }


    @DeleteMapping("/{id}")
    public void deleteLux(@PathVariable Long id) {
        luxService.deleteLux(id);
    }
}