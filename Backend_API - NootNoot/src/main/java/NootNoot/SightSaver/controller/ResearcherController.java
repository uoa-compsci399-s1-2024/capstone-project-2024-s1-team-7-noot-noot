package NootNoot.SightSaver.controller;

import NootNoot.SightSaver.model.Researcher;
import NootNoot.SightSaver.service.ResearcherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/researcher")
public class ResearcherController {
    @Autowired
    private ResearcherService researcherService;

    @GetMapping
    public List<Researcher> getAll() {
        return researcherService.getAllResearchers();
    }

    @GetMapping("/{id}")
    public Researcher getResearcherById(@PathVariable Long id) {
        return researcherService.getResearcherById(id);
    }

    @PostMapping
    public Researcher addResearcher(@RequestBody Researcher researcher) {
        return researcherService.addResearcher(researcher);
    }

    @DeleteMapping("/{id}")
    public void deleteResearcher(@PathVariable Long id) {
        researcherService.deleteResearcher(id);
    }

}