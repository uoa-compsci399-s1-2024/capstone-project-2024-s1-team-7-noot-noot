package NootNoot.SightSaver.repository;

import NootNoot.SightSaver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
     // Add additional queries as necessary 
}
