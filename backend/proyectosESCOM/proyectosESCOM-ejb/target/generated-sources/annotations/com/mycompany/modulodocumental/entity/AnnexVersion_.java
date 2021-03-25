package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.Annex;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(AnnexVersion.class)
public class AnnexVersion_ { 

    public static volatile SingularAttribute<AnnexVersion, Date> date;
    public static volatile SingularAttribute<AnnexVersion, Integer> idUser;
    public static volatile SingularAttribute<AnnexVersion, Annex> fkAvAnnex;
    public static volatile SingularAttribute<AnnexVersion, String> description;
    public static volatile SingularAttribute<AnnexVersion, String> location;
    public static volatile SingularAttribute<AnnexVersion, Integer> id;
    public static volatile SingularAttribute<AnnexVersion, Integer> state;
    public static volatile SingularAttribute<AnnexVersion, Integer> version;

}