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
                .cors()
                .and()
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()

                .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/subscribe").permitAll()
                .antMatchers("/", "/board/list", "/api/post/**", "/animation/**", "/api/animation/**").permitAll()
                .antMatchers("/user/login", "/user/signup", "/api/user/**").permitAll()
                .anyRequest().authenticated()
                .and()

                .formLogin()
                .loginPage("/user/login")
                .loginProcessingUrl("/login")
                // 성공 시 JSON 응답
                .successHandler((request, response, authentication) -> {
                    response.setStatus(200);
                    response.setContentType("application/json;charset=UTF-8");
                    response.getWriter().write("{\"success\":true}");
                })
                // 실패 시 JSON 응답
                .failureHandler((request, response, exception) -> {
                    response.setStatus(401);
                    response.setContentType("application/json;charset=UTF-8");
                    response.getWriter().write("{\"success\":false,\"message\":\"아이디 또는 비밀번호가 잘못되었습니다.\"}");
                })
                .permitAll()
                .and()

                .logout()
                .logoutUrl("/logout")  // POST /logout
                .logoutSuccessHandler((request, response, authentication) -> {
                    // 로그아웃 성공 시 JSON 응답
                    response.setStatus(200);
                    response.setContentType("application/json;charset=UTF-8");
                    response.getWriter().write("{\"success\":true}");
                })
                .permitAll()
                .and()

                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    // /api 로 시작하는 요청은 JSON 응답
                    if (request.getRequestURI().startsWith("/api")) {
                        response.setStatus(401);
                        response.setContentType("application/json;charset=UTF-8");
                        response.getWriter().write("{\"isAuthenticated\":false}");
                    } else {
                        // 일반 페이지는 로그인 페이지로 리다이렉트
                        response.sendRedirect("/user/login");
                    }
                })
                .and()

                .userDetailsService(authService);

        return http.build();
    }
}