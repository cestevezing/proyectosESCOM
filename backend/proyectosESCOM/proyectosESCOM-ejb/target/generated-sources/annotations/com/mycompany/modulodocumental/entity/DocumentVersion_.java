package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.Document;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(DocumentVersion.class)
public class DocumentVersion_ { 

    public static volatile SingularAttribute<DocumentVersion, Date> date;
    public static volatile SingularAttribute<DocumentVersion, Document> fkDvDocument;
    public static volatile SingularAttribute<DocumentVersion, String> description;
    public static volatile SingularAttribute<DocumentVersion, String> location;
    public static volatile SingularAttribute<DocumentVersion, Integer> id;
    public static volatile SingularAttribute<DocumentVersion, Integer> state;
    public static volatile SingularAttribute<DocumentVersion, Integer> version;

}