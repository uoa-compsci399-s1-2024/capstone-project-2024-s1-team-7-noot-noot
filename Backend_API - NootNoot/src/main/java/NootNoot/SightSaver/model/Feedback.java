package NootNoot.SightSaver.model;

import jakarta.persistence.*;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comment;

    public Feedback() {
    }


    public Feedback(String comment) {
        this.comment = comment;
    }


    public String getComment() {
        return this.comment;
    }


    public void setComment(String comment) {this.comment = comment;}

}