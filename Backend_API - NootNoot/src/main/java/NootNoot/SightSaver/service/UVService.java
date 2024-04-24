package NootNoot.SightSaver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.model.Uv;
import NootNoot.SightSaver.repository.UVRepository;

@Service
public class UVService {
    
    @Autowired
    private UVRepository uvRepository;

    public List<Uv> getAllUVValues() {
        return uvRepository.findAll();
    }
}
