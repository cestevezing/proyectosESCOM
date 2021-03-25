package com.mycompany.superadministrador.entity;

import com.mycompany.superadministrador.entity.Actividad;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(Modulo.class)
public class Modulo_ { 

    public static volatile SingularAttribute<Modulo, String> estado;
    public static volatile SingularAttribute<Modulo, byte[]> imagen;
    public static volatile SingularAttribute<Modulo, Integer> idModulo;
    public static volatile SingularAttribute<Modulo, String> descripcionModulo;
    public static volatile SingularAttribute<Modulo, Date> ultimaModificacion;
    public static volatile SingularAttribute<Modulo, String> nombreModulo;
    public static volatile SingularAttribute<Modulo, String> url;
    public static volatile SingularAttribute<Modulo, String> acronimo;
    public static volatile ListAttribute<Modulo, Actividad> listaActividad;

}