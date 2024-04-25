package NootNoot.SightSaver.repository;

import NootNoot.SightSaver.model.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long>{
    // Add additional queries as necessary 
}
