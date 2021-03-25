package com.mycompany.superadministrador.entity;

import com.mycompany.superadministrador.entity.Actividad;
import com.mycompany.superadministrador.entity.Usuario;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(UsuarioActividad.class)
public class UsuarioActividad_ { 

    public static volatile SingularAttribute<UsuarioActividad, Integer> idRelacion;
    public static volatile SingularAttribute<UsuarioActividad, Usuario> usuario;
    public static volatile SingularAttribute<UsuarioActividad, Date> ultimaModificacion;
    public static volatile SingularAttribute<UsuarioActividad, Actividad> actividad;

}