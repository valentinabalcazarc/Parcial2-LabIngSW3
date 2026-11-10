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

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.CitaRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.CitaDTO;
import co.edu.unicauca.labsw3.core.capaServices.services.ICitaService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/citas")
public class CitaRestController {

    private final ICitaService citaService;

    public CitaRestController(ICitaService citaService) {
        this.citaService = citaService;
    }

    /** Crear cita médica — Administrador */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public CitaDTO crear(@Valid @RequestBody CitaRequestDTO cita) {
        return citaService.crear(cita);
    }

    /** Listar todas las citas médicas — Administrador */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<CitaDTO> listarTodas() {
        return citaService.listarTodas();
    }
}
