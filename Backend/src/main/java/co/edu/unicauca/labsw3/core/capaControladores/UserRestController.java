package co.edu.unicauca.labsw3.core.capaControladores;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.labsw3.core.capaServices.DTO.response.UserDTO;
import co.edu.unicauca.labsw3.core.capaServices.services.IUserService;
import co.edu.unicauca.labsw3.core.security.services.UserDetailsImpl;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/usuarios")
public class UserRestController {

    private final IUserService userService;

    public UserRestController(IUserService userService) {
        this.userService = userService;
    }

    /** Datos del usuario logueado — cualquier usuario autenticado */
    @GetMapping("/me")
    public UserDTO usuarioActual(@AuthenticationPrincipal UserDetailsImpl principal) {
        // El username del token es la cédula
        return userService.findByCedula(Long.valueOf(principal.getUsername()));
    }

    /** Listar todos los usuarios — Administrador */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDTO> listar() {
        return userService.findAll();
    }

    /** Consultar un usuario por cédula — Administrador */
    @GetMapping("/{cedula}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDTO consultar(@PathVariable("cedula") Long cedula) {
        return userService.findByCedula(cedula);
    }
}
