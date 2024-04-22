package NootNoot.SightSaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import NootNoot.SightSaver.model.Lux;

@Repository
public interface LuxRepository extends JpaRepository<Lux, Long> {
    // Add additional queries as necessary 
}
