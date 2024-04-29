package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Researcher;
import NootNoot.SightSaver.service.ResearcherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/researcher")
public class ResearcherController {
    @Autowired
    private ResearcherService researcherService;

    @GetMapping
    public ResponseEntity<List<Researcher>> getAll() {

        return new ResponseEntity<>(researcherService.getAllResearchers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Researcher> getResearcherById(@PathVariable Long id) {
        return new ResponseEntity<>(researcherService.getResearcherById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Researcher> addResearcher(@RequestBody Researcher researcher) {
        return new ResponseEntity<>(researcherService.addResearcher(researcher), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteResearcher(@PathVariable Long id) {

        researcherService.deleteResearcher(id);
        return HttpStatus.NO_CONTENT;
    }

}