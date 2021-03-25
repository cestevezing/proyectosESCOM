package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.Annex;
import com.mycompany.modulodocumental.entity.Condition;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(Activity.class)
public class Activity_ { 

    public static volatile SingularAttribute<Activity, String> name;
    public static volatile SingularAttribute<Activity, String> description;
    public static volatile SingularAttribute<Activity, String> information;
    public static volatile SingularAttribute<Activity, Integer> id;
    public static volatile SingularAttribute<Activity, Integer> state;
    public static volatile SingularAttribute<Activity, Annex> fkActAnnex;
    public static volatile SingularAttribute<Activity, String> type;
    public static volatile SingularAttribute<Activity, Condition> fkActCondition;

}