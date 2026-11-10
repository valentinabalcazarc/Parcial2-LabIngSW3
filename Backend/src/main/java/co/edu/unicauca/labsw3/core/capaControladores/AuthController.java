package co.edu.unicauca.labsw3.core.capaControladores;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.labsw3.core.capaServices.DTO.request.LoginRequestDTO;
import co.edu.unicauca.labsw3.core.capaServices.DTO.response.JwtResponseDTO;
import co.edu.unicauca.labsw3.core.capaServices.services.AuthImpl;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthImpl objAuthImpl;

    /** Iniciar sesión — Público. El username es la cédula. */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        System.out.println("entrando a generar token");
        JwtResponseDTO token = this.objAuthImpl.authenticateUser(loginRequest);
        return ResponseEntity.ok(token);
    }
}
