package co.edu.unicauca.labsw3.core.capaServices.DTO.request;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.TipoProfEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProfesionalRequestDTO extends SignupRequestDTO {
    @NotNull(message = "El tipo de profesional es obligatorio (DOCTOR o TERAPEUTA)")
    private TipoProfEnum tipo;
}
