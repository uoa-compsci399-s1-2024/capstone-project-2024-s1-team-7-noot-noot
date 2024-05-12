package NootNoot.SightSaver.service;

import NootNoot.SightSaver.model.User;
import NootNoot.SightSaver.model.dto.UserDTO;
import NootNoot.SightSaver.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDTO getUserById(Long userId) {
        User repoUser = userRepository.findById(userId).orElse(null);
        return convertToUserDTO(repoUser);
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

    public UserDTO convertToUserDTO(User user) {
        if (user == null)
            {
                return null;
            }
        return new UserDTO(user.getUsername(), user.getEmail(), user.getParent());
    }
}