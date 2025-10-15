package com.seanet.demo.config;

import com.seanet.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
     * CSS, JavaScript, 이미지, 폰트 파일 등은 인증 없이 접근 가능하도록 설정
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

                // URL별 접근 권한 설정
                .authorizeRequests()
                    // 공개 페이지
                    .antMatchers("/", "/board/list").permitAll()
                    // 인증 관련 페이지
                    .antMatchers("/user/login", "/user/signup").permitAll()
                    // 공개 API 엔드포인트
                    .antMatchers("/api/user/**", "/api/post/**", "/api/animation/**").permitAll()
                    // SSE 및 애니메이션 기능
                    .antMatchers("/subscribe", "/animation/**").permitAll()
                    // 그 외 모든 요청은 인증 필요
                    .anyRequest().authenticated()
                .and()

                // 폼 기반 로그인 설정
                .formLogin()
                    .loginPage("/user/login")                               // 커스텀 로그인 페이지 URL
                    .loginProcessingUrl("/login")                             // 로그인 처리 URL (POST)
                    .defaultSuccessUrl("/", true)      // 로그인 성공 시 리다이렉트
                    .failureUrl("/user/login?error=true")   // 로그인 실패 시 리다이렉트
                    .permitAll()
                .and()

                // 로그아웃 설정
                .logout()
                    .logoutSuccessUrl("/")  // 로그아웃 성공 시 메인 페이지로 이동
                    .permitAll()
                .and()

                // 사용자 정보 로딩 서비스 설정
                .userDetailsService(authService);

        return http.build();
    }
}