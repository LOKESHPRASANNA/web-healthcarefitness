package com.gym.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Points to the Gym Website frontend folder based on the current directory
        String currentDir = new File("").getAbsolutePath();
        String frontendSrcDir = "file:///" + currentDir + "/../frontend/src/";
        String frontendPublicDir = "file:///" + currentDir + "/../frontend/public/";
        
        registry.addResourceHandler("/**")
                .addResourceLocations(frontendSrcDir, frontendPublicDir, "classpath:/static/");
    }
}
