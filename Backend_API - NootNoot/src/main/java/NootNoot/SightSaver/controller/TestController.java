package NootNoot.SightSaver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import NootNoot.SightSaver.model.Child;
import NootNoot.SightSaver.model.Feedback;
import NootNoot.SightSaver.model.Lux;
import NootNoot.SightSaver.model.Parent;
import NootNoot.SightSaver.model.Researcher;
import NootNoot.SightSaver.model.Sensor;
import NootNoot.SightSaver.model.Uv;
import NootNoot.SightSaver.model.User;
import NootNoot.SightSaver.service.ResearcherService;
import NootNoot.SightSaver.service.SensorService;
import NootNoot.SightSaver.service.UVService;
import NootNoot.SightSaver.service.UserService;
import NootNoot.SightSaver.service.ChildService;
import NootNoot.SightSaver.service.FeedbackService;
import NootNoot.SightSaver.service.LuxService;
import NootNoot.SightSaver.service.ParentService;

@RestController
public class TestController {

    @Autowired
    public UserService userService;

    @Autowired
    public ResearcherService researcherService;

    @Autowired
    public FeedbackService feedbackService;

    @Autowired
    public ParentService parentService;

    @Autowired
    public ChildService childService;

    @Autowired
    public SensorService sensorService;

    @Autowired
    public UVService uvService;

    @Autowired
    public LuxService luxService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/researchers")
    public List<Researcher> getAllResearchers() {
        return researcherService.getAllResearchers(); 
    }

    @GetMapping("/feedbacks")
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedback();
    }

    @GetMapping("/parents")
    public List<Parent> getAllParents() {
        return parentService.getAllParents();
    }

    @GetMapping("/children")
    public List<Child> getAllChildren() {
        return childService.getAllChildren();
    }

    @GetMapping("/sensors")
    public List<Sensor> getAllSensors() {
        return sensorService.getAllSensors();
    }

    @GetMapping("/UV")
    public List<Uv> getAllUVValues() {
        return uvService.getAllUVValues();
    }

    @GetMapping("/lux")
    public List<Lux> getAllLuxValues() {
        return luxService.getAllLuxValues();
    }
}
