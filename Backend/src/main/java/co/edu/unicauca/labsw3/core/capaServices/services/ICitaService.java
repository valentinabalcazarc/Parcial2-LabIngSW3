package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.List;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.CitaRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.CitaDTO;

public interface ICitaService {
    CitaDTO crear(CitaRequestDTO datos);
    List<CitaDTO> listarTodas();
    List<CitaDTO> listarPorPaciente(Long cedulaPaciente);
}
