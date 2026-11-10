package co.edu.unicauca.labsw3.core.capaControladores;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.PacienteRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.CitaDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.PacienteDTO;
import co.edu.unicauca.labsw3.core.capaServices.services.ICitaService;
import co.edu.unicauca.labsw3.core.capaServices.services.IPacienteService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/pacientes")
public class PacienteRestController {

    private final IPacienteService pacienteService;
    private final ICitaService citaService;

    public PacienteRestController(IPacienteService pacienteService, ICitaService citaService) {
        this.pacienteService = pacienteService;
        this.citaService = citaService;
    }

    /** Listar pacientes — Administrador */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<PacienteDTO> listar() {
        return pacienteService.listar();
    }

    /** Registrar paciente — Administrador */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public PacienteDTO registrar(@Valid @RequestBody PacienteRequestDTO paciente) {
        return pacienteService.registrar(paciente);
    }

    /**
     * Listar citas médicas de un paciente — Paciente (solo las propias).
     * La cédula de la URL tiene que ser la misma del token (el username es la cédula); si no, 403.
     */
    @GetMapping("/{cedula}/citas")
    @PreAuthorize("hasRole('PACIENTE') and #cedula.toString() == authentication.name")
    public List<CitaDTO> listarCitas(@PathVariable("cedula") Long cedula) {
        return citaService.listarPorPaciente(cedula);
    }
}
