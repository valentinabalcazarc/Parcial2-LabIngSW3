package co.edu.unicauca.labsw3.core.capaControladores.excepciones;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import co.edu.unicauca.labsw3.core.capaServices.excepciones.EntidadNoExisteException;
import co.edu.unicauca.labsw3.core.capaServices.excepciones.EntidadYaExisteException;
import jakarta.servlet.http.HttpServletRequest;

/**
 * Convierte las excepciones de la aplicación en respuestas JSON con el código HTTP correcto.
 * Los errores de seguridad (401 y 403) los maneja Spring Security como en el lab (AuthEntryPointJwt).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /** 400: falló @Valid (campos vacíos, email inválido, fecha pasada, etc.) */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> validacion(MethodArgumentNotValidException ex,
                                                          HttpServletRequest req) {
        Map<String, String> errores = new LinkedHashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            errores.putIfAbsent(fe.getField(), fe.getDefaultMessage());
        }
        Map<String, Object> body = cuerpo(HttpStatus.BAD_REQUEST, "Datos inválidos", req);
        body.put("errores", errores);
        return ResponseEntity.badRequest().body(body);
    }

    /** 400: JSON mal formado o fecha/enum con formato incorrecto */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> jsonInvalido(HttpMessageNotReadableException ex,
                                                            HttpServletRequest req) {
        return respuesta(HttpStatus.BAD_REQUEST,
                "El cuerpo de la petición no es válido (revisa formato de fechas: yyyy-MM-dd / yyyy-MM-ddTHH:mm:ss, y los enums)",
                req);
    }

    /** 400: parámetro de la URL con tipo incorrecto, ej. /api/pacientes/abc/citas */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, Object>> tipoInvalido(MethodArgumentTypeMismatchException ex,
                                                            HttpServletRequest req) {
        return respuesta(HttpStatus.BAD_REQUEST, "El parámetro '" + ex.getName() + "' no es válido", req);
    }

    /** 404 */
    @ExceptionHandler(EntidadNoExisteException.class)
    public ResponseEntity<Map<String, Object>> noExiste(EntidadNoExisteException ex, HttpServletRequest req) {
        return respuesta(HttpStatus.NOT_FOUND, ex.getMessage(), req);
    }

    /** 409 */
    @ExceptionHandler(EntidadYaExisteException.class)
    public ResponseEntity<Map<String, Object>> yaExiste(EntidadYaExisteException ex, HttpServletRequest req) {
        return respuesta(HttpStatus.CONFLICT, ex.getMessage(), req);
    }

    private ResponseEntity<Map<String, Object>> respuesta(HttpStatus status, String mensaje,
                                                          HttpServletRequest req) {
        return ResponseEntity.status(status).body(cuerpo(status, mensaje, req));
    }

    private Map<String, Object> cuerpo(HttpStatus status, String mensaje, HttpServletRequest req) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", mensaje);
        body.put("path", req.getRequestURI());
        return body;
    }
}
