package com.votr.controller;

import com.votr.dto.NaverUserInfo;
import com.votr.entity.User;
import com.votr.service.NaverAuthService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class NaverAuthController {

    private final NaverAuthService naverAuthService;

    @GetMapping("/check")
    public ResponseEntity<?> checkAuthStatus(HttpSession session) {
        // 세션에서 사용자 정보 확인
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(new AuthResponse(false, user));
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/naver/callback")
    public ResponseEntity<?> handleNaverCallback(@RequestBody NaverCallbackRequest request, HttpSession session) {
        try {
            if (request.getCode() == null || request.getState() == null) {
                return ResponseEntity.badRequest().body("Missing required parameters: code and state");
            }


            String accessToken = naverAuthService.getAccessToken(request.getCode(), request.getState());
            NaverUserInfo userInfo = naverAuthService.getUserInfo(accessToken);
            User user = naverAuthService.saveOrUpdateUser(userInfo);
            
            // 세션에 사용자 정보 저장
            session.setAttribute("user", user);
            
            // 새로운 사용자인 경우 추가 정보가 필요함을 알림
            if (user.isNewUser()) {
                return ResponseEntity.ok(new AuthResponse(true, user));
            }
            
            // 기존 사용자인 경우 바로 로그인 처리
            return ResponseEntity.ok(new AuthResponse(false, user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}

@Getter
@Setter
class NaverCallbackRequest {
    private String code;
    private String state;
}

@Getter
@Setter
class AuthResponse {
    private boolean isNewUser;
    private User user;

    public AuthResponse(boolean isNewUser, User user) {
        this.isNewUser = isNewUser;
        this.user = user;
    }
}

@Getter
@Setter
class ErrorResponse {
    private String message;

    public ErrorResponse(String message) {
        this.message = message;
    }
} 