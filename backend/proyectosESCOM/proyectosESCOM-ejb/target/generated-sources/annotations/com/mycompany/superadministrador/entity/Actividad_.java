package com.mycompany.superadministrador.entity;

import com.mycompany.superadministrador.entity.Modulo;
import com.mycompany.superadministrador.entity.UsuarioActividad;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(Actividad.class)
public class Actividad_ { 

    public static volatile SingularAttribute<Actividad, String> estado;
    public static volatile SingularAttribute<Actividad, Integer> idActividad;
    public static volatile ListAttribute<Actividad, UsuarioActividad> listaUsuarioActividad;
    public static volatile SingularAttribute<Actividad, String> nombreActividad;
    public static volatile SingularAttribute<Actividad, String> descripcionActividad;
    public static volatile SingularAttribute<Actividad, Date> ultimaModificacion;
    public static volatile SingularAttribute<Actividad, Modulo> modulo;

}