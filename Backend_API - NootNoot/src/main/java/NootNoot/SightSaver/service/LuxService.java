package NootNoot.SightSaver.service;

import java.time.LocalDateTime;
import java.util.List;

import NootNoot.SightSaver.model.Sensor;
import NootNoot.SightSaver.model.Uv;
import NootNoot.SightSaver.repository.SensorRepository;
import NootNoot.SightSaver.request.AddLuxRequest;
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

    public String saveLux(Lux lux) {
        List<Sensor> sensors = sensorRepository.findAll();
        for (Sensor sensor : sensors) {
            if (sensor.getId().equals(lux.getSensorId())) {
                luxRepository.save(lux);
                return "Lux data successfully inserted";
            }
        }
        return "Sensor does not exist!";
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

    public List<Lux> findLuxByID(String sensorId) {
        return luxRepository.findBySensorId(sensorId);
    }

    public String saveLuxList(AddLuxRequest luxRequest) {
        List<Sensor> sensors = sensorRepository.findAll();
        for (Sensor sensor : sensors) {
            for (Lux lux : luxRequest.getLuxList()) {
                if (sensor.getId().equals(lux.getSensorId())) {
                    luxRepository.save(lux);
                }
            }
        }
        return "Lux data successfully inserted";
    }

}