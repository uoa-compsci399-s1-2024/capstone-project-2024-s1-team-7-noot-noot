package NootNoot.SightSaver.service;

import java.util.List;
import java.util.Optional;

import NootNoot.SightSaver.model.Researcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import NootNoot.SightSaver.repository.ResearcherRepository;

@Service
public class ResearcherService {

    @Autowired
    private ResearcherRepository researcherRepository;

    public List<Researcher> getAllResearchers() {
        return researcherRepository.findAll();
    }

    public Optional<Researcher> getResearcherById( Long researcherId) {
        return researcherRepository.findById(researcherId);
    }
}
