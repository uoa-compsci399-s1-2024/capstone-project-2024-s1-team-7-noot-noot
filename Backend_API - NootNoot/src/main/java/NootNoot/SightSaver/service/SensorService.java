package NootNoot.SightSaver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.model.Sensor;
import NootNoot.SightSaver.repository.SensorRepository;

@Service
public class SensorService {
    
    @Autowired
    private SensorRepository sensorRepository;

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }
}
