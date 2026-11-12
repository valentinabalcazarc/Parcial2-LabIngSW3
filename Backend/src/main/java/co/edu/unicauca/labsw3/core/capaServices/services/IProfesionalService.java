package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.List;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.ProfesionalRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.ProfesionalDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.ProfesionalPublicoDTO;

public interface IProfesionalService {
    ProfesionalDTO registrar(ProfesionalRequestDTO datos);
    List<ProfesionalDTO> listar();
    List<ProfesionalPublicoDTO> listarPublico();
}

