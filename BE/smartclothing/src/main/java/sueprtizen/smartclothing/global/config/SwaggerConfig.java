package sueprtizen.smartclothing.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "Smartclothing api",
                description = "Smartclothing api",
                version = "v1"
        )
)
@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi userApi() {
        return GroupedOpenApi.builder()
                .group("user-api")
                .pathsToMatch("/users/**")
                .build();
    }

    @Bean
    public GroupedOpenApi clothingApi() {
        return GroupedOpenApi.builder()
                .group("clothing-api")
                .pathsToMatch("/clothing/**")
                .build();
    }
}
