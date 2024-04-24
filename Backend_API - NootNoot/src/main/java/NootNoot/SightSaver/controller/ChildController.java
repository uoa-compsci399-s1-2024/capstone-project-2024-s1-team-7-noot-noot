package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Child;
import NootNoot.SightSaver.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ChildController {
    @Autowired
    private ChildService childService;

    @GetMapping("/child")
    public List<Child> getAll() {
        return childService.getAllChildren();
    }

    @GetMapping("/child/{id}")
    public Child getChildById(@RequestParam("id") Long id) {
        return childService.getChildById(id);
    }

    @PostMapping
    public void addChild(@RequestBody Child child) {
        childService.saveChild(child);
    }

    @DeleteMapping("/child/{id}/delete")
    public void deleteChild(@PathVariable("id") Long id) {
        childService.deleteChildById(id);
    }


}