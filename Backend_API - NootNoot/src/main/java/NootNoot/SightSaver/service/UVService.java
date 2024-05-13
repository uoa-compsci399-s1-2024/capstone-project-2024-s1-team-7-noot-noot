package NootNoot.SightSaver.service;

import java.time.LocalDateTime;
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

    public Uv getUVValueById(Long id) {
        return uvRepository.findById(id).orElse(null);
    }

    public Long getUVValueCount(){
        return uvRepository.count();
    }

    public Uv saveUV(Uv uv) {
        return uvRepository.save(uv);
    }

    public void deleteUV(Long id) {
        uvRepository.deleteById(id);
    }


}
