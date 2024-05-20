package NootNoot.SightSaver.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import NootNoot.SightSaver.model.User;
import NootNoot.SightSaver.service.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{userId}") 
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.getUserById(userId), HttpStatus.OK);
    }
    
    @GetMapping("/numberOfUsers")
    public ResponseEntity<Long> getNumberOfUsers() {
        return new ResponseEntity<>(userService.getNumberOfUsers(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> createNewUser(@RequestBody User newUser) {
        return new ResponseEntity<>(userService.createNewUser(newUser), HttpStatus.CREATED);
    }


    @DeleteMapping("/{userId}")
    public HttpStatus deleteUserById(@PathVariable Long userId) {

        userService.deleteUserById(userId);
        return HttpStatus.NO_CONTENT;
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<String> getUsernameByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userService.getUsernameByEmail(email), HttpStatus.OK);
    }

}