package co.edu.unicauca.labsw3.core.capaControladores;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.ProfesionalRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.ProfesionalDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.ProfesionalPublicoDTO;
import co.edu.unicauca.labsw3.core.capaServices.services.IProfesionalService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/profesionales")
public class ProfesionalRestController {

    private final IProfesionalService profesionalService;

    public ProfesionalRestController(IProfesionalService profesionalService) {
        this.profesionalService = profesionalService;
    }

    /** Listar médicos — Administrador */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ProfesionalDTO> listar() {
        return profesionalService.listar();
    }

    /** Registrar médico — Administrador */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfesionalDTO registrar(@Valid @RequestBody ProfesionalRequestDTO profesional) {
        return profesionalService.registrar(profesional);
    }

    @GetMapping("/publico")
    public List<ProfesionalPublicoDTO> listarPublico() {
        return profesionalService.listarPublico();
    }
}
