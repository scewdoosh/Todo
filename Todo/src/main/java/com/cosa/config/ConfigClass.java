package com.cosa.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
public class ConfigClass {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Bean
	public SecurityFilterChain security(HttpSecurity http) {
		http.authorizeHttpRequests((authorize) -> authorize
				.requestMatchers("/api/post-user","/api/get-me","/api/test","/h2-console/**","/api/swagger/**","/swagger-ui/**","/swagger-ui.html/**","/v3/api-docs/**").permitAll()
			.anyRequest().authenticated()
		)
		.csrf(csrf -> csrf
                .ignoringRequestMatchers("/h2-console/**")
                .disable()
            )
		.headers(head -> head.frameOptions(frame -> frame.sameOrigin()));
		http.httpBasic(Customizer.withDefaults());
		http.sessionManagement(t -> t.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		return http.build();
	}
	
	@Bean
	public DaoAuthenticationProvider provider() {
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider(userDetailsService);
		auth.setPasswordEncoder(new BCryptPasswordEncoder(12));
		return auth;
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();
	    config.addAllowedOriginPattern("https://*.todo-frontend-springboot.pages.dev");
	    config.addAllowedOrigin("https://todo-frontend-springboot.pages.dev");
	    config.addAllowedOrigin("http://localhost:3000");
	    config.addAllowedMethod("*");
	    config.addAllowedHeader("*");
	    config.setAllowCredentials(true);

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);
	    return source;
	}
}
