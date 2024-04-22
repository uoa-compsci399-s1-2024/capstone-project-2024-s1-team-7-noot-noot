package NootNoot.SightSaver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.model.Lux;
import NootNoot.SightSaver.repository.LuxRepository;

@Service
public class LuxService {
    
    @Autowired
    private LuxRepository luxRepository;

    public List<Lux> getAllLuxValues() {
        return luxRepository.findAll();
    }
}
