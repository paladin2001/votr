package com.votr.service;

import com.votr.dto.NaverUserInfo;
import com.votr.entity.User;
import com.votr.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class NaverAuthService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Value("${naver.client.id}")
    private String clientId;

    @Value("${naver.client.secret}")
    private String clientSecret;

    @Value("${naver.redirect.uri}")
    private String redirectUri;

    public String getAccessToken(String code, String state) {
        try {
            String url = "https://nid.naver.com/oauth2.0/token";
            String uri = UriComponentsBuilder.fromHttpUrl(url)
                    .queryParam("grant_type", "authorization_code")
                    .queryParam("client_id", clientId)
                    .queryParam("client_secret", clientSecret)
                    .queryParam("code", code)
                    .queryParam("state", state)
                    .build()
                    .toString();

            Map<String, String> response = restTemplate.getForObject(uri, Map.class);
            if (response == null || !response.containsKey("access_token")) {
                throw new RuntimeException("Failed to get access token from Naver");
            }
            return response.get("access_token");
        } catch (Exception e) {
            throw new RuntimeException("Error getting access token: " + e.getMessage());
        }
    }

    public NaverUserInfo getUserInfo(String accessToken) {
        try {
            String url = "https://openapi.naver.com/v1/nid/me";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);

            HttpEntity<?> entity = new HttpEntity<>(headers);
            Map<String, Map<String, String>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    Map.class
            ).getBody();

            if (response == null || !response.containsKey("response")) {
                throw new RuntimeException("Failed to get user info from Naver");
            }

            Map<String, String> userInfo = response.get("response");
            NaverUserInfo naverUserInfo = new NaverUserInfo();
            naverUserInfo.setId(userInfo.get("id"));
            naverUserInfo.setEmail(userInfo.get("email"));
            naverUserInfo.setNickname(userInfo.get("nickname"));
            naverUserInfo.setProfileImage(userInfo.get("profile_image"));
            return naverUserInfo;
        } catch (Exception e) {
            throw new RuntimeException("Error getting user info: " + e.getMessage());
        }
    }

    public User saveOrUpdateUser(NaverUserInfo naverUserInfo) {
        User user = userRepository.findByNaverId(naverUserInfo.getId())
                .orElse(null);

        if (user == null) {
            // 새로운 사용자인 경우
            user = new User();
            user.setNaverId(naverUserInfo.getId());
            user.setEmail(naverUserInfo.getEmail());
            user.setNickname(naverUserInfo.getNickname());
            user.setProfileImage(naverUserInfo.getProfileImage());
            user.setIsNewUser(true);  // 새로운 사용자임을 표시
        } else {
            // 기존 사용자인 경우
            user.setEmail(naverUserInfo.getEmail());
            user.setNickname(naverUserInfo.getNickname());
            user.setProfileImage(naverUserInfo.getProfileImage());
            user.setIsNewUser(false);
        }

        return userRepository.save(user);
    }
} 