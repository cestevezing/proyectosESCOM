package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.Condition;
import com.mycompany.modulodocumental.entity.Document;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(Process.class)
public class Process_ { 

    public static volatile SingularAttribute<Process, String> name;
    public static volatile SingularAttribute<Process, Document> fkPrcDocument;
    public static volatile SingularAttribute<Process, String> description;
    public static volatile SingularAttribute<Process, Integer> id;
    public static volatile SingularAttribute<Process, Integer> state;
    public static volatile ListAttribute<Process, Condition> listCondition;

}