package NootNoot.SightSaver.repository;

import NootNoot.SightSaver.model.Researcher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearcherRepository extends JpaRepository<Researcher, Long> {
    // Add additional queries as necessary 
}
