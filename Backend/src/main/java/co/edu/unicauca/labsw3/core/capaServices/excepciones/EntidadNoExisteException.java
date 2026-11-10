package co.edu.unicauca.labsw3.core.capaServices.excepciones;

public class EntidadNoExisteException extends RuntimeException {
    public EntidadNoExisteException(String mensaje) {
        super(mensaje);
    }
}
