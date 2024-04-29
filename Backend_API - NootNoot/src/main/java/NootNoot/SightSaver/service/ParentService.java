package NootNoot.SightSaver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.model.Parent;
import NootNoot.SightSaver.repository.ParentRepository;

@Service
public class ParentService {
    
    @Autowired
    private ParentRepository parentRepository;

    public List<Parent> getAllParents() {
        return parentRepository.findAll();
    }

    public Parent getParentById(Long id) {
        return parentRepository.findById(id).orElse(null);
    }

    public Parent saveParent(Parent parent){
        return parentRepository.save(parent);
    }

    public void deleteParentById(Long id){
        parentRepository.deleteById(id);
    }
}
