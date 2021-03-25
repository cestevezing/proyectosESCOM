package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.Activity;
import com.mycompany.modulodocumental.entity.AnnexVersion;
import com.mycompany.modulodocumental.entity.Program;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(Annex.class)
public class Annex_ { 

    public static volatile ListAttribute<Annex, AnnexVersion> listAnnexVersion;
    public static volatile SingularAttribute<Annex, String> keywords;
    public static volatile SingularAttribute<Annex, String> name;
    public static volatile ListAttribute<Annex, Activity> listActivity;
    public static volatile SingularAttribute<Annex, String> description;
    public static volatile SingularAttribute<Annex, Integer> id;
    public static volatile SingularAttribute<Annex, Integer> state;
    public static volatile SingularAttribute<Annex, Program> fkAxProgram;

}