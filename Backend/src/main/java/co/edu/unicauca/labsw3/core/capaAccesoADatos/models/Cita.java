package co.edu.unicauca.labsw3.core.capaAccesoADatos.models;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cita {
    private int id;
    private Profesional profesional;
    private Paciente paciente;
    private LocalDateTime fecha;
}
