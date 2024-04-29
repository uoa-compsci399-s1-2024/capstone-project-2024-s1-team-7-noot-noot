package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Child;
import NootNoot.SightSaver.service.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/child")
public class ChildController {

    @Autowired
    private ChildService childService;

    @GetMapping
    public ResponseEntity<List<Child>> getAll() {
        return new ResponseEntity<>(childService.getAllChildren(), HttpStatus.OK);
    }

    @GetMapping("/numberOfChildren")
    public ResponseEntity<Long> getNumberOfChildren() {
        return new ResponseEntity<>(childService.getChildCount(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Child> getChildById(@PathVariable Long id) {
        return new ResponseEntity<>(childService.getChildById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Child> addChild(@RequestBody Child child) {
        return new ResponseEntity<>(childService.saveChild(child), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteChild(@PathVariable("id") Long id) {
        childService.deleteChildById(id);
        return HttpStatus.valueOf(204);
    }


}