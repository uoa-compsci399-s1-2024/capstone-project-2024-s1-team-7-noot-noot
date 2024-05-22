package NootNoot.SightSaver.service;

import java.time.LocalDateTime;
import java.util.List;

import NootNoot.SightSaver.model.Sensor;
import NootNoot.SightSaver.model.Uv;
import NootNoot.SightSaver.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.model.Lux;
import NootNoot.SightSaver.repository.LuxRepository;

@Service
public class LuxService {

    @Autowired
    private LuxRepository luxRepository;
    @Autowired
    private SensorRepository sensorRepository;

    public List<Lux> getAllLuxValues() {
        return luxRepository.findAll();
    }

    public Lux getLuxValueById(Long id) {
        return luxRepository.findById(id).orElse(null);
    }

    public Long getNumberOfLuxValues() {
        return luxRepository.count();
    }

    public Lux saveLux(Lux lux) {
        List<Sensor> sensors = sensorRepository.findAll();
        for (Sensor sensor : sensors) {
            if (sensor.getId().equals(lux.getSensorId())) {
                return luxRepository.save(lux);
            }
        }
        return null;
    }

    public void deleteLux(Long id) {
        luxRepository.deleteById(id);
    }

    public float findLuxValueByID(Long id) {
        for (Lux lux : luxRepository.findAll()) {
            if (lux.getId().equals(id)) {
                return lux.getLux_value();
            }
        }
        return 0;
    }

    public LocalDateTime findLuxValueDateByID(Long id) {
        for (Lux lux : luxRepository.findAll()) {
            if (lux.getId().equals(id)) {
                return lux.getDate_time();
            }
        }
        return null;
    }

}