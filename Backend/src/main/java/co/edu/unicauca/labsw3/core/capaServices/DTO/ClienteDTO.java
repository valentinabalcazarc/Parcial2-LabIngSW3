package co.edu.unicauca.labsw3.core.capaServices.DTO;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ClienteDTO {
	private Integer id;
	private String codigo;
	private String nombre;
	private String apellido;
	private String email;
	private Date createAt;

	public ClienteDTO() {

	}
}


