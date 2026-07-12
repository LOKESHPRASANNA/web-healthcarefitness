package com.gym.backend.security;

import com.gym.backend.entity.User;
import com.gym.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<User> users = userRepository.findByUsername(username);
        
        if (users.isEmpty()) {
            // Check if they tried to login with email
            users = userRepository.findByEmail(username.toLowerCase());
            if (users.isEmpty()) {
                throw new UsernameNotFoundException("User Not Found with username or email: " + username);
            }
        }
        
        return UserDetailsImpl.build(users.get(0));
    }
}
