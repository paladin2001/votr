package com.votr.repository;

import com.votr.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNaverId(String naverId);
    Optional<User> findByEmail(String email);
    Optional<User> findByNickname(String nickname);
} 