package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Child;
import NootNoot.SightSaver.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/child")
public class ChildController {

    @Autowired
    private ChildService childService;

    @GetMapping
    public List<Child> getAll() {
        return childService.getAllChildren();
    }

    @GetMapping("/numberOfChildren")
    public Long getNumberOfChildren() {
        return childService.getChildCount();
    }

    @GetMapping("/{id}")
    public Child getChildById(@PathVariable Long id) {
        return childService.getChildById(id);
    }

    @PostMapping
    public Child addChild(@RequestBody Child child) {
        return childService.saveChild(child);
    }

    @DeleteMapping("/{id}")
    public void deleteChild(@PathVariable("id") Long id) {
        childService.deleteChildById(id);
    }


}