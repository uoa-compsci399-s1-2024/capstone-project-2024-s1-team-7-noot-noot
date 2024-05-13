package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Sensor;
import NootNoot.SightSaver.service.SensorService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/sensor")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @GetMapping
    public ResponseEntity<List<Sensor>> getAll() {

        return new ResponseEntity<>(sensorService.getAllSensors(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sensor> getSensorByID(@PathVariable Long id) {
        return new ResponseEntity<>(sensorService.getSensorById(id), HttpStatus.OK);
    }

    @GetMapping("/numberOfSensors")
    public ResponseEntity<Long> getNumberOfSensors() {
        return new ResponseEntity<>(sensorService.getSensorCount(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Sensor> addSensor(@RequestBody Sensor sensor) {

        return new ResponseEntity<>(sensorService.saveSensor(sensor), HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public HttpStatus deleteSensor(@PathVariable Long id) {

        sensorService.deleteSensorById(id);
        return HttpStatus.NO_CONTENT;
    }

    @GetMapping("/exportToExcel")
    public void exportExcel (HttpServletResponse response) throws IOException {


        response.setContentType("application/octet-stream");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=sensors.xlsx";
        response.setHeader(headerKey, headerValue);
        sensorService.exportCustomerToExcel(response);

    }


}