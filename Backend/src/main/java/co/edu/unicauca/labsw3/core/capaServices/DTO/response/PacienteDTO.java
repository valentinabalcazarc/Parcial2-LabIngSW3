package co.edu.unicauca.labsw3.core.capaServices.DTO.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PacienteDTO {
    private int id;
    private Long cedula;
    private String email;
    private String nombre;
    private String apellido;
    private LocalDate fechaNac;
}
