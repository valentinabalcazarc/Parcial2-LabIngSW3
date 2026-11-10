package co.edu.unicauca.labsw3.core.capaAccesoADatos.models;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {
    private User user;
    private LocalDate fechaNac;
}
