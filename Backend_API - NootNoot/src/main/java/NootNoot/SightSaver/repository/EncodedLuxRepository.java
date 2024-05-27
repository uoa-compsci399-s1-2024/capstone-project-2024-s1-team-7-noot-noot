package NootNoot.SightSaver.repository;

import NootNoot.SightSaver.model.Child;
import NootNoot.SightSaver.model.EncodedLux;
import NootNoot.SightSaver.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncodedLuxRepository extends JpaRepository<EncodedLux, Long> {

}