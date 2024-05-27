package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Child;
import NootNoot.SightSaver.repository.ChildRepository;
import NootNoot.SightSaver.request.AddChildRequest;
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
    @Autowired
    private ChildRepository childRepository;

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

    @GetMapping("/{parent_id}")
    public ResponseEntity<List<Child>> getChildByParentId(@PathVariable Long parent_id) {
        return new ResponseEntity<>(childService.getChildByParent(parent_id), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Child>> getChildByParentEmail(@PathVariable String email) {
        return new ResponseEntity<>(childService.getChildByEmail(email), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Child> addChild(@RequestBody Child child) {
        return new ResponseEntity<>(childService.saveChild(child), HttpStatus.CREATED);
    }

    @PostMapping("/addChild")
    public ResponseEntity<Child> addChild(@RequestBody AddChildRequest childRequest) {
        return new ResponseEntity<>(childService.saveChild(childRequest.getEmail(), childRequest.getName(), childRequest.getSensor_id()), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteChild(@PathVariable("id") Long id) {
        childService.deleteChildById(id);
        return HttpStatus.valueOf(200);
    }


}