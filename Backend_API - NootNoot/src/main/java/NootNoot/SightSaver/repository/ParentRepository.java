package NootNoot.SightSaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import NootNoot.SightSaver.model.Parent;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {
    // Add additional queries as necessary 
}
