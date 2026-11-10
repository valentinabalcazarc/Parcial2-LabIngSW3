package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.List;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.PacienteRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.PacienteDTO;

public interface IPacienteService {
    PacienteDTO registrar(PacienteRequestDTO datos);
    List<PacienteDTO> listar();
}
