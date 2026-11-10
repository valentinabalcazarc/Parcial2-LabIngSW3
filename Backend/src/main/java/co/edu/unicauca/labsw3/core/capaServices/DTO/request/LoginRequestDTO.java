package co.edu.unicauca.labsw3.core.capaServices.DTO.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {
    // La cédula del usuario
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
