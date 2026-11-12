package co.edu.unicauca.labsw3.core.capaServices.mapper;

import org.springframework.stereotype.Component;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Cita;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Paciente;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Profesional;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.User;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.CitaDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.PacienteDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.ProfesionalDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.ProfesionalPublicoDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.UserDTO;

/**
 * Convierte entidades a DTOs. Se hace a mano porque Paciente y Profesional
 * tienen el User adentro (composición) y ModelMapper no lo aplana bien.
 */
@Component
public class DtoMapper {

    public UserDTO toUserDTO(User u) {
        return new UserDTO(u.getId(), u.getCedula(), u.getEmail(), u.getNombre(), u.getApellido(), u.getRole());
    }

    public PacienteDTO toPacienteDTO(Paciente p) {
        User u = p.getUser();
        return new PacienteDTO(u.getId(), u.getCedula(), u.getEmail(), u.getNombre(), u.getApellido(),
                p.getFechaNac());
    }

    public ProfesionalDTO toProfesionalDTO(Profesional p) {
        User u = p.getUser();
        return new ProfesionalDTO(u.getId(), u.getCedula(), u.getEmail(), u.getNombre(), u.getApellido(),
                p.getTipo());
    }

    public CitaDTO toCitaDTO(Cita c) {
        return new CitaDTO(c.getId(), c.getFecha(), toPacienteDTO(c.getPaciente()),
                toProfesionalDTO(c.getProfesional()));
    }

    public ProfesionalPublicoDTO toProfesionalPublicoDTO(Profesional p) {
        User u = p.getUser();
        return new ProfesionalPublicoDTO(u.getNombre(), u.getApellido(), p.getTipo());
    }
}
