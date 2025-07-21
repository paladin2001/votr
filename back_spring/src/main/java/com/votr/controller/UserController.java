package com.votr.controller;

import com.votr.entity.User;
import com.votr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor

public class UserController {
    
    private final UserService userService;
    
    @PostMapping("/nickname")
    public ResponseEntity<?> saveUser(@RequestBody NicknameRequest request, HttpSession session) {

        System.out.println("========= saveUser 메소드 시작됨! 세션 ID: " + session.getId() + " =========");

        User currentUser = (User) session.getAttribute("user");

        if (currentUser == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }

        try {
            User updatedUser = userService.updateUserNicknameForCurrentUser(currentUser, request.getNickname());
            session.setAttribute("user", updatedUser);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<User> getUserByNickname(@PathVariable String nickname) {
        User user = userService.getUserByNickname(nickname);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
}

class NicknameRequest {
    private String nickname;
    
    public String getNickname() {

        return nickname;
    }
    
    public void setNickname(String nickname) {

        this.nickname = nickname;
    }
} 