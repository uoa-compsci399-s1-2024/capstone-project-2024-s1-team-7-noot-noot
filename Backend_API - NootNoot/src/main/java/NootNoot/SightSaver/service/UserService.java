package NootNoot.SightSaver.service;

import NootNoot.SightSaver.model.User;
import NootNoot.SightSaver.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    public Long getNumberOfUsers() {
        return userRepository.count();
    }

    public User createNewUser(User newUser) {
        System.out.println(newUser);
        return userRepository.save(newUser);
    }

    public String getUsernameByEmail (String email) {
        for (User user : getAllUsers()) {
            if (user.getEmail().equals(email)) {
                return user.getUsername();
            }
        }
        return null;
    }
}