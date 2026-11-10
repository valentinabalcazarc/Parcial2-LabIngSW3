package co.edu.unicauca.labsw3.core.capaServices.DTO.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CitaDTO {
    private int id;
    private LocalDateTime fecha;
    private PacienteDTO paciente;
    private ProfesionalDTO profesional;
}
