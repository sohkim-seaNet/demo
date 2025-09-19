package com.seanet.demo.config;

import com.seanet.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security 웹 보안 설정
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authService).passwordEncoder(passwordEncoder);
    }

    /**
     * 정적 리소스(CSS, JS, 이미지 등)에 대한 보안 예외 설정
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .antMatchers("/css/**", "/js/**", "/img/**", "/fonts/**")
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    /**
     * HTTP 보안 설정을 담당하는 메인 설정 메소드
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().disable()
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()

                .authorizeRequests()
                // 메인 페이지, 게시판 목록, 게시글 API는 누구나 접근 가능
                .antMatchers("/", "/board/list", "/api/post/**").permitAll()
                // 로그인, 회원가입, 사용자 API는 누구나 접근 가능
                .antMatchers("/user/login", "/user/signup", "/api/user/**").permitAll()
                // 위에서 명시하지 않은 모든 요청은 인증이 필요
                .anyRequest().authenticated()
                .and()

                .formLogin()
                .loginPage("/user/login")   // 커스텀 로그인 페이지 URL
                .loginProcessingUrl("/login") // 로그인 처리 URL (POST 요청)
                .defaultSuccessUrl("/", true)
                .failureUrl("/user/login?error=true")
                .permitAll()
                .and()

                .logout()
                .logoutSuccessUrl("/")
                .permitAll()
                .and()

                // 사용자 정보 로딩 서비스 설정
                .userDetailsService(authService);

        return http.build();
    }
}

