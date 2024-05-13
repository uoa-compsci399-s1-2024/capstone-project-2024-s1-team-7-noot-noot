package NootNoot.SightSaver.service;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.http.HttpServletResponse;
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

    public Sensor getSensorById(Long id) {
        return sensorRepository.findById(id).orElse(null);
    }

    public Long getSensorCount(){
        return sensorRepository.count();
    }

    public Sensor saveSensor(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    public void deleteSensorById(Long id) {
        sensorRepository.deleteById(id);
    }

    public List<Sensor> exportCustomerToExcel(HttpServletResponse response) throws IOException {
        List<Sensor> sensors = sensorRepository.findAll();
        ExcelExportService exportService = new ExcelExportService(sensors);
        exportService.exportExcel(response);
        return sensors;
    }



}
