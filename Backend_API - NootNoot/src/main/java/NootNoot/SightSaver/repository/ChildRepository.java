package NootNoot.SightSaver.repository;

import NootNoot.SightSaver.model.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long>{

    // Add additional queries as necessary
    @Query("SELECT child from Child child where child.parent_id = :parent_id")
    List<Child> findAllByParentId(@Param("parent_id") Long parent_id);
}
