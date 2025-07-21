package com.votr.service;

import com.votr.entity.User;
import com.votr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    
    @Transactional
    public User saveUser(String nickname) {
        System.out.println("22222222222");
        return userRepository.findByNickname(nickname)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setNickname(nickname);
                    return userRepository.save(newUser);
                });
    }
    
    @Transactional
    public User updateUserNicknameForCurrentUser(User currentUser, String newNickname) {
        System.out.println("1111111111111111111111");
        userRepository.findByNickname(newNickname).ifPresent(existingUserWithNewNickname -> {
            if (!existingUserWithNewNickname.getId().equals(currentUser.getId())) {
                throw new IllegalArgumentException("Nickname '" + newNickname + "' is already taken.");
            }
        });
        currentUser.setNickname(newNickname);

        System.out.println("---------------------------------------------");
        System.out.println(newNickname);
        return userRepository.save(currentUser);
    }
    
    public User getUserByNickname(String nickname) {
        return userRepository.findByNickname(nickname)
                .orElse(null);
    }
} 