package NootNoot.SightSaver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.model.UV;
import NootNoot.SightSaver.repository.UVRepository;

@Service
public class UVService {
    
    @Autowired
    private UvRepository uvRepository;

    public List<UV> getAllUVValues() {
        return uvRepository.findAll();
    }
}
