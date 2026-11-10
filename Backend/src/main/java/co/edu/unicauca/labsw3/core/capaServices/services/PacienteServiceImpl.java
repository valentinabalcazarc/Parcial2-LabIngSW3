package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Paciente;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.RoleEnum;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.User;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories.IPacienteRepository;
import co.edu.unicauca.labsw3.core.capaServices.DTO.request.PacienteRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.PacienteDTO;
import co.edu.unicauca.labsw3.core.capaServices.mapper.DtoMapper;

@Service
public class PacienteServiceImpl implements IPacienteService {

    private final IPacienteRepository pacienteRepository;
    private final IUserService userService;
    private final DtoMapper mapper;

    public PacienteServiceImpl(IPacienteRepository pacienteRepository, IUserService userService, DtoMapper mapper) {
        this.pacienteRepository = pacienteRepository;
        this.userService = userService;
        this.mapper = mapper;
    }

    @Override
    public PacienteDTO registrar(PacienteRequestDTO datos) {
        User user = userService.crearUsuario(datos, RoleEnum.PACIENTE);
        Paciente paciente = pacienteRepository.save(new Paciente(user, datos.getFechaNac()));
        return mapper.toPacienteDTO(paciente);
    }

    @Override
    public List<PacienteDTO> listar() {
        List<PacienteDTO> pacientesDTO = new ArrayList<>();
        for (Paciente paciente : pacienteRepository.findAll()) {
            pacientesDTO.add(mapper.toPacienteDTO(paciente));
        }
        return pacientesDTO;
    }
}
