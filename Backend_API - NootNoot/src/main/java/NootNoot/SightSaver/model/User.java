package NootNoot.SightSaver.model;

import jakarta.persistence.*;

@Entity
@Table(name = "[user]")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private boolean parent;

    public User() {}

    public User(String username, String password, String email, boolean parent) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.parent = parent;
    }

    public Long getId() {return this.id;}

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getEmail() {
        return this.email;
    }

    public boolean getParent() {
        return this.parent;
    }

    public void setUsername(String newUsername) {
        this.username = newUsername;
    }

    public void setPassword(String newPassword) {
        this.password = newPassword;
    }

    public void setEmail(String newEmail) {
        this.email = newEmail;
    }

    public void setParent(boolean value) {
        this.parent = value;
    }

}