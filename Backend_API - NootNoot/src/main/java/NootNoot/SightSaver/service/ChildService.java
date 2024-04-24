package NootNoot.SightSaver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.model.Child;
import NootNoot.SightSaver.repository.ChildRepository;

@Service
public class ChildService {
    
    @Autowired
    private ChildRepository childRepository;

    public List<Child> getAllChildren() {
        return childRepository.findAll();
    }

    public Child getChildById(Long id) {
        return childRepository.findById(id).orElse(null);
    }

    public Long getChildCount() {
        return childRepository.count();
    }

    public Child saveChild(Child child) {
        return childRepository.save(child);
    }

    public void deleteChildById(Long id) {
        childRepository.deleteById(id);
    }





}
