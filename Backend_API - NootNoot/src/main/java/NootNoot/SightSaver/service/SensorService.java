package NootNoot.SightSaver.service;

import java.io.IOException;
import java.util.*;

import NootNoot.SightSaver.model.*;
import NootNoot.SightSaver.repository.LuxRepository;
import NootNoot.SightSaver.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.repository.SensorRepository;


@Service
public class SensorService {

    @Autowired
    private SensorRepository sensorRepository;
    @Autowired
    private UVService uvService;
    @Autowired
    private LuxService luxService;
    @Autowired
    private ChildService childService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LuxRepository luxRepository;

    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    public Sensor getSensorById(Long id) {
        return sensorRepository.findById(id).orElse(null);
    }

    public Long getSensorCount(){
        return sensorRepository.count();
    }

    public Sensor saveSensor(Sensor sensor) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getId().equals(sensor.getChild_id())) {
                return sensorRepository.save(sensor);
            }
        }
        return null;

    }

    public void deleteSensorById(Long id) {
        sensorRepository.deleteById(id);
    }

    public List<Sensor> exportCustomerToExcel(HttpServletResponse response) throws IOException {
        List<Sensor> sensors = sensorRepository.findAll();
        ExcelExportService exportService = new ExcelExportService(sensors, uvService, luxService);
        exportService.exportExcel(response);
        return sensors;
    }

    public Map<String, List<Lux>> getAllSensorLuxDataByEmail(String email) {
        List<Sensor> sensors = new ArrayList<>();
        List<Lux> finalLuxList = new ArrayList<>();
        Map<String, List<Lux>> sensorLuxMap = new HashMap<>();
        Optional<User> parent = userRepository.findByEmail(email);
        if (parent.isPresent()) {
            Long parentId = parent.get().getId();
            List<Child> childList = childService.getChildByParent(parentId);
            for (Sensor sensor : sensorRepository.findAll()) {
                for (Child child : childList) {
                    if (sensor.getChild_id().equals(child.getId())) {
                        sensors.add(sensor);
                    }
                }
            }
            for (Sensor sensor : sensors) {
                for (Child child : childList) {
                    if (sensor.getId().equals(child.getSensor_id())) {
                        List<Lux> luxList = luxRepository.findBySensorId(sensor.getId());

                        // Get the list for the current child, or create a new one if it doesn't exist
                        List<Lux> childLuxList = sensorLuxMap.computeIfAbsent(childService.getChildById(sensor.getChild_id()).getName(), k -> new ArrayList<>());

                        // Add lux data to the child's list
                        childLuxList.addAll(luxList);
                    }
                }
            }
        }
        return sensorLuxMap;
    }
}