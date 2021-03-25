package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.Activity;
import com.mycompany.modulodocumental.entity.Process;
import com.mycompany.modulodocumental.entity.UserCondition;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(Condition.class)
public class Condition_ { 

    public static volatile SingularAttribute<Condition, Integer> number;
    public static volatile SingularAttribute<Condition, Date> finalDate;
    public static volatile ListAttribute<Condition, UserCondition> listUserCondition;
    public static volatile SingularAttribute<Condition, String> name;
    public static volatile ListAttribute<Condition, Activity> listActivity;
    public static volatile SingularAttribute<Condition, Process> fkConProcess;
    public static volatile SingularAttribute<Condition, String> description;
    public static volatile SingularAttribute<Condition, Integer> id;
    public static volatile SingularAttribute<Condition, Integer> state;
    public static volatile SingularAttribute<Condition, Date> startDate;

}