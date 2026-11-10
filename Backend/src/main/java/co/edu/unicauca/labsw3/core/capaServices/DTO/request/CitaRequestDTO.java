package co.edu.unicauca.labsw3.core.capaServices.DTO.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CitaRequestDTO {
    @NotNull(message = "La cédula del paciente es obligatoria")
    private Long cedulaPaciente;

    @NotNull(message = "La cédula del profesional es obligatoria")
    private Long cedulaProfesional;

    @NotNull(message = "La fecha de la cita es obligatoria")
    @Future(message = "La fecha de la cita debe ser futura")
    private LocalDateTime fecha;
}
