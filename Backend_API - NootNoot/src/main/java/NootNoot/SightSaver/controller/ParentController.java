package NootNoot.SightSaver.controller;


import NootNoot.SightSaver.model.Parent;
import NootNoot.SightSaver.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("api/parent")
    public class ParentController {
        @Autowired
        private ParentService parentService;

        @GetMapping
        public ResponseEntity<List<Parent>> getAll() {
            return new ResponseEntity<>(parentService.getAllParents(), HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<Parent> getParentById(@PathVariable Long id) {
            return new ResponseEntity<>(parentService.getParentById(id), HttpStatus.OK);
        }

        @PostMapping
        public ResponseEntity<Parent> addParent(@RequestBody Parent parent) {
            return new ResponseEntity<>(parentService.saveParent(parent), HttpStatus.CREATED);
        }

        @DeleteMapping("/{id}")
        public HttpStatus deleteParent(@PathVariable Long id) {

            parentService.deleteParentById(id);
            return HttpStatus.NO_CONTENT;
        }
}






