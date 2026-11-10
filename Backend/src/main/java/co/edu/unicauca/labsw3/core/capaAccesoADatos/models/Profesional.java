package co.edu.unicauca.labsw3.core.capaAccesoADatos.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profesional {
    private User user;
    private TipoProfEnum tipo;
}
