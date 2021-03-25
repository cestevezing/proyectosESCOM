package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.Condition;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(UserCondition.class)
public class UserCondition_ { 

    public static volatile SingularAttribute<UserCondition, Integer> fkUcUser;
    public static volatile SingularAttribute<UserCondition, Integer> id;
    public static volatile SingularAttribute<UserCondition, Condition> fkUcCondition;

}