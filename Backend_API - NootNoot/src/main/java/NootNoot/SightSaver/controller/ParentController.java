package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Feedback;
import NootNoot.SightSaver.model.Parent;
import NootNoot.SightSaver.service.FeedbackService;
import NootNoot.SightSaver.service.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/parent")
    public class ParentController {
        @Autowired
        private ParentService parentService;

        @GetMapping
        public List<Parent> getAll() {
            return parentService.getAllParents();
        }

        @GetMapping("/{id}")
        public Parent getParentById(@PathVariable Long id) {
            return parentService.getParentById(id);
        }

        @PostMapping
        public Parent addParent(@RequestBody Parent parent) {
            return parentService.saveParent(parent);
        }

        @DeleteMapping("/{id}")
        public void deleteParent(@PathVariable Long id) {
            parentService.deleteParentById(id);
        }
}






