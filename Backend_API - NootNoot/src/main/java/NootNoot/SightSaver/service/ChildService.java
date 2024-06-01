package NootNoot.SightSaver.service;

import java.util.ArrayList;
import java.util.List;

import NootNoot.SightSaver.model.Sensor;
import NootNoot.SightSaver.model.User;
import NootNoot.SightSaver.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.model.Child;
import NootNoot.SightSaver.repository.ChildRepository;

@Service
public class ChildService {
    
    @Autowired
    private ChildRepository childRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private SensorRepository sensorRepository;

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

    public Child saveChild(String email, String name, String sensorid) {
        if(sensorRepository.findById(sensorid).isPresent()) {
            throw new IllegalArgumentException("Sensor with ID is already tied with a child!");
        }
        Child child = new Child();
        child.setName(name);
        List<User> users = userService.getAllUsers();
        for (User user : users) {
            if (user.getEmail().equals(email)) {
                child.setParent(user.getId());
            }
        }
        child.setSensor_id(sensorid);
        Child finalChild = childRepository.save(child);
        Sensor sensor = new Sensor(sensorid, finalChild.getId());
        sensorRepository.save(sensor);
        return finalChild;
    }

    public void deleteChildById(Long id) {
        childRepository.deleteById(id);
    }

    public List<Child> getChildByParent(Long id) {
        return childRepository.findAllByParentId(id);
    }

    public List<Child> getChildByEmail(String email) {
        List<Child> children = getAllChildren();
        List<Child> childList = new ArrayList<>();
        User parent = userService.getUserByEmail(email);
        for (Child child : children) {
            if (child.getParent() == parent.getId()){
                childList.add(child);
            }
        }
        return childList;
    }

}
