package com.blockydevs.metamail.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .oauth2Login();
        return http.build();
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
////        http.headers().frameOptions().disable()
////                .and()
////                .authorizeRequests()
////                .antMatchers("/auth/**", "/oauth2/**").permitAll()
////                .antMatchers(HttpMethod.GET, "/").permitAll()
////                .antMatchers(HttpMethod.POST, "/").permitAll()
////                .antMatchers(HttpMethod.PUT, "/").permitAll()
////                .antMatchers(HttpMethod.DELETE, "/**").permitAll()
////                .antMatchers(HttpMethod.OPTIONS, "*").permitAll()
////                .anyRequest().authenticated()
////                .and().cors().configurationSource(corsConfigurationSource())
////                .and().oauth2Login();
//
////        http
////                .cors()
////                .and()
////                .sessionManagement()
////                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////                .and()
////                .csrf()
////                .disable()
////                .formLogin()
////                .disable()
////                .httpBasic()
////                .disable()
////                .exceptionHandling()
////                .and()
////                .authorizeRequests()
////                .antMatchers("/",
////                        "/error",
////                        "/favicon.ico",
////                        "/**/*.png",
////                        "/**/*.gif",
////                        "/**/*.svg",
////                        "/**/*.jpg",
////                        "/**/*.html",
////                        "/**/*.css",
////                        "/**/*.js")
////                .permitAll()
////                .antMatchers("/auth/**", "/oauth2/**")
////                .permitAll()
////                .anyRequest()
////                .authenticated()
////                .and()
////                .oauth2Login();
//
//    }


//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:4200", "http://localhost:8080", "https://accounts.google.com/*")); // <-- you may change "*"
//        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedHeaders(Arrays.asList(
//                "Accept", "Origin", "Content-Type", "Depth", "User-Agent", "If-Modified-Since,",
//                "Cache-Control", "Authorization", "X-Req", "X-File-Size", "X-Requested-With", "X-File-Name"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//    @Bean
//    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
//        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(corsConfigurationSource()));
//        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        return bean;
//    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurerAdapter() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
//            }
//        };
//    }

}
