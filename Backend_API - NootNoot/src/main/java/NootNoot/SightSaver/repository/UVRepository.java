package NootNoot.SightSaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import NootNoot.SightSaver.model.UV;

@Repository
public interface UVRepository extends JpaRepository<UV, Long> {
    // Add additional queries as necessary 
}