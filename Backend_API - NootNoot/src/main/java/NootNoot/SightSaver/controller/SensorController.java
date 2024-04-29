package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Sensor;
import NootNoot.SightSaver.repository.SensorRepository;
import NootNoot.SightSaver.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/sensor")
public class SensorController {
    @Autowired
    private SensorService sensorService;
    @Autowired
    private SensorRepository sensorRepository;

    @GetMapping
    public List<Sensor> getAll() {
        return sensorService.getAllSensors();
    }

    @GetMapping("/{id}")
    public Sensor getSensorByID(@PathVariable Long id) {
        return sensorService.getSensorById(id);
    }

    @GetMapping("/numberOfSensors")
    public Long getNumberOfSensors() {
        return sensorService.getSensorCount();
    }

    @PostMapping
    public Sensor addSensor(@RequestBody Sensor sensor) {
        return sensorService.saveSensor(sensor);
    }


    @DeleteMapping("/{id}")
    public void deleteSensor(@PathVariable Long id) {
        sensorService.deleteSensorById(id);
    }
}