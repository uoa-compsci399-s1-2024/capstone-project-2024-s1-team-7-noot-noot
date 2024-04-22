package NootNoot.SightSaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import NootNoot.SightSaver.model.Sensor;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {
    // Add additional queries as necessary 
}
