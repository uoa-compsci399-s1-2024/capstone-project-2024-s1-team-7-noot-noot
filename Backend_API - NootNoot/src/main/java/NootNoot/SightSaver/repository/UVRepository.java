package NootNoot.SightSaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import NootNoot.SightSaver.model.Uv;

@Repository
public interface UVRepository extends JpaRepository<Uv, Long> {
    // Add additional queries as necessary 
}
