package co.edu.unicauca.labsw3.core.capaServices.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Cita;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Paciente;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.models.Profesional;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories.ICitaRepository;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories.IPacienteRepository;
import co.edu.unicauca.labsw3.core.capaAccesoADatos.repositories.IProfesionalRepository;
import co.edu.unicauca.labsw3.core.capaServices.DTO.request.CitaRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.CitaDTO;
import co.edu.unicauca.labsw3.core.capaServices.excepciones.EntidadNoExisteException;
import co.edu.unicauca.labsw3.core.capaServices.excepciones.EntidadYaExisteException;
import co.edu.unicauca.labsw3.core.capaServices.mapper.DtoMapper;

@Service
public class CitaServiceImpl implements ICitaService {

    private final ICitaRepository citaRepository;
    private final IPacienteRepository pacienteRepository;
    private final IProfesionalRepository profesionalRepository;
    private final DtoMapper mapper;

    public CitaServiceImpl(ICitaRepository citaRepository, IPacienteRepository pacienteRepository,
                           IProfesionalRepository profesionalRepository, DtoMapper mapper) {
        this.citaRepository = citaRepository;
        this.pacienteRepository = pacienteRepository;
        this.profesionalRepository = profesionalRepository;
        this.mapper = mapper;
    }

    @Override
    public CitaDTO crear(CitaRequestDTO datos) {
        Paciente paciente = pacienteRepository.findByCedula(datos.getCedulaPaciente());
        if (paciente == null) {
            throw new EntidadNoExisteException("No existe un paciente con la cédula " + datos.getCedulaPaciente());
        }
        Profesional profesional = profesionalRepository.findByCedula(datos.getCedulaProfesional());
        if (profesional == null) {
            throw new EntidadNoExisteException("No existe un médico con la cédula " + datos.getCedulaProfesional());
        }

        if (citaRepository.existsByProfesionalAndFecha(datos.getCedulaProfesional(), datos.getFecha())) {
            throw new EntidadYaExisteException("El médico ya tiene una cita en esa fecha y hora");
        }
        if (citaRepository.existsByPacienteAndFecha(datos.getCedulaPaciente(), datos.getFecha())) {
            throw new EntidadYaExisteException("El paciente ya tiene una cita en esa fecha y hora");
        }

        Cita cita = citaRepository.save(new Cita(0, profesional, paciente, datos.getFecha()));
        return mapper.toCitaDTO(cita);
    }

    @Override
    public List<CitaDTO> listarTodas() {
        return toCitasDTO(citaRepository.findAll());
    }

    @Override
    public List<CitaDTO> listarPorPaciente(Long cedulaPaciente) {
        if (pacienteRepository.findByCedula(cedulaPaciente) == null) {
            throw new EntidadNoExisteException("No existe un paciente con la cédula " + cedulaPaciente);
        }
        return toCitasDTO(citaRepository.findByPacienteCedula(cedulaPaciente));
    }

    /** Ordena las citas por fecha y las convierte a DTO. */
    private List<CitaDTO> toCitasDTO(List<Cita> citas) {
        List<Cita> ordenadas = new ArrayList<>(citas);
        ordenadas.sort(Comparator.comparing(Cita::getFecha));

        List<CitaDTO> citasDTO = new ArrayList<>();
        for (Cita cita : ordenadas) {
            citasDTO.add(mapper.toCitaDTO(cita));
        }
        return citasDTO;
    }
}
