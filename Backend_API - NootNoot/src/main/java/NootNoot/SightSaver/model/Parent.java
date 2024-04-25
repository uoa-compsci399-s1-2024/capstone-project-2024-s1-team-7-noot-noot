package NootNoot.SightSaver.model;

import jakarta.persistence.*;

@Entity
public class Parent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private float uv_goal;
    private int number_of_children;
    private int feedback_id;

    public Parent() {
    }


    public Parent(String name, Float uv_goal, int number_of_children, int feedback_id) {
        this.name = name;
        this.uv_goal = uv_goal;
        this.number_of_children = number_of_children;
        this.feedback_id = feedback_id;
    }


    public Long getId() {return this.id;}
    public String getName() {
        return this.name;
    }
    public float getUvGoal() {
        return this.uv_goal;
    }
    public int getNumber_of_children() {
        return this.number_of_children;
    }
    public int getFeedback_id() {
        return this.feedback_id;
    }

    public void setName(String newName) {
        this.name = newName;
    }

    public void setUv_goal(float newUv_goal) {
        this.uv_goal = newUv_goal;
    }

    public void setNumber_of_children(int newNumber_of_children) {
        this.number_of_children = newNumber_of_children;
    }

    public void setFeedback_id(int newFeedback_id) {
        this.feedback_id = newFeedback_id;
    }

}