package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Feedback;
import NootNoot.SightSaver.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<Feedback>> getAll() {
        return new ResponseEntity<>(feedbackService.getAllFeedback(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        return new ResponseEntity<>(feedbackService.getFeedbackById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        return new ResponseEntity<>(feedbackService.saveFeedback(feedback), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedbackbyID(id);
        return HttpStatus.valueOf(200);
    }

}
