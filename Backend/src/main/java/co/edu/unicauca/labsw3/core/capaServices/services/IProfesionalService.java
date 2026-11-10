package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.List;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.ProfesionalRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.ProfesionalDTO;

public interface IProfesionalService {
    ProfesionalDTO registrar(ProfesionalRequestDTO datos);
    List<ProfesionalDTO> listar();
}
