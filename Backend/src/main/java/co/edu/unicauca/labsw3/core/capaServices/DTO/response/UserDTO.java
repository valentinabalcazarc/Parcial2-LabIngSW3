package co.edu.unicauca.labsw3.core.capaServices.DTO.response;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Usuario sin contraseña, para devolver al cliente. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int id;
    private Long cedula;
    private String email;
    private String nombre;
    private String apellido;
    private RoleEnum role;
}
