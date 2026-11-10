package co.edu.unicauca.labsw3.core.capaServices.excepciones;

public class EntidadYaExisteException extends RuntimeException {
    public EntidadYaExisteException(String mensaje) {
        super(mensaje);
    }
}
