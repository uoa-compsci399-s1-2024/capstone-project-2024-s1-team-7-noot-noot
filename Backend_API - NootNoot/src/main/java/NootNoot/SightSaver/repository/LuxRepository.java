package NootNoot.SightSaver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import NootNoot.SightSaver.model.Lux;

import java.util.List;

@Repository
public interface LuxRepository extends JpaRepository<Lux, Long> {
    // Add additional queries as necessary

    @Query("SELECT lux FROM Lux lux WHERE lux.sensorId = :sensorId")
    List<Lux> findBySensorId(@Param("sensorId") String sensorId);

}
