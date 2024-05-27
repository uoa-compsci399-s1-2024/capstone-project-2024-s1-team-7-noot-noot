package NootNoot.SightSaver.service;

import NootNoot.SightSaver.model.EncodedLux;
import NootNoot.SightSaver.repository.EncodedLuxRepository;
import NootNoot.SightSaver.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EncodedLuxService {
    @Autowired
    private EncodedLuxRepository encodedLuxRepository;

    public List<EncodedLux> getAllEncodedLux() {
        List<EncodedLux> encodedLux = encodedLuxRepository.findAll();
        return encodedLux;
    }
}
