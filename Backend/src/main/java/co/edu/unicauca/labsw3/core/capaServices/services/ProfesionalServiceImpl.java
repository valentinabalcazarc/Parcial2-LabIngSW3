package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Profesional;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.RoleEnum;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.User;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories.IProfesionalRepository;
import co.edu.unicauca.labsw3.core.capaServices.DTO.request.ProfesionalRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.ProfesionalDTO;
import co.edu.unicauca.labsw3.core.capaServices.mapper.DtoMapper;

@Service
public class ProfesionalServiceImpl implements IProfesionalService {

    private final IProfesionalRepository profesionalRepository;
    private final IUserService userService;
    private final DtoMapper mapper;

    public ProfesionalServiceImpl(IProfesionalRepository profesionalRepository, IUserService userService,
                                  DtoMapper mapper) {
        this.profesionalRepository = profesionalRepository;
        this.userService = userService;
        this.mapper = mapper;
    }

    @Override
    public ProfesionalDTO registrar(ProfesionalRequestDTO datos) {
        User user = userService.crearUsuario(datos, RoleEnum.MEDICO);
        Profesional profesional = profesionalRepository.save(new Profesional(user, datos.getTipo()));
        return mapper.toProfesionalDTO(profesional);
    }

    @Override
    public List<ProfesionalDTO> listar() {
        List<ProfesionalDTO> profesionalesDTO = new ArrayList<>();
        for (Profesional profesional : profesionalRepository.findAll()) {
            profesionalesDTO.add(mapper.toProfesionalDTO(profesional));
        }
        return profesionalesDTO;
    }
}
