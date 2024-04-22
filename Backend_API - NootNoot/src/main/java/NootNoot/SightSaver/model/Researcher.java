package NootNoot.SightSaver.model;

import jakarta.persistence.*;

@Entity
public class Researcher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Researcher() {
    }


    public Researcher(String name) {
        this.name = name;
    }

    public Long getId() {return this.id;}
    public String getName() {return this.name;}


    public void setName(String name) {this.name = name;}

}
