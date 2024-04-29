package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Lux;
import NootNoot.SightSaver.service.LuxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/lux")
public class LuxController {

    @Autowired
    private LuxService luxService;

    @GetMapping
    public ResponseEntity<List<Lux>> getAll() {
        return new ResponseEntity<>(luxService.getAllLuxValues(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lux> getLuxByID(@PathVariable Long id) {
        return new ResponseEntity<>(luxService.getLuxValueById(id), HttpStatus.OK);
    }

    @GetMapping("/numberOfLuxValues")
    public ResponseEntity<Long> getNumberOfLuxValues() {
        return new ResponseEntity<>(luxService.getNumberOfLuxValues(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Lux> addLux(@RequestBody Lux lux) {
        return new ResponseEntity<>(luxService.saveLux(lux), HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public HttpStatus deleteLux(@PathVariable Long id) {

        luxService.deleteLux(id);
        return HttpStatus.NO_CONTENT;
    }
}