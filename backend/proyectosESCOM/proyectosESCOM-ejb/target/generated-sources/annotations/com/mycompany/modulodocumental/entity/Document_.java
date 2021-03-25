package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.DocumentVersion;
import com.mycompany.modulodocumental.entity.Process;
import com.mycompany.modulodocumental.entity.Program;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(Document.class)
public class Document_ { 

    public static volatile SingularAttribute<Document, Integer> idUser;
    public static volatile ListAttribute<Document, Process> listProcess;
    public static volatile SingularAttribute<Document, String> description;
    public static volatile SingularAttribute<Document, Program> fkDocProgram;
    public static volatile SingularAttribute<Document, Integer> id;
    public static volatile SingularAttribute<Document, Integer> state;
    public static volatile ListAttribute<Document, DocumentVersion> listDocumentVersion;
    public static volatile SingularAttribute<Document, String> type;

}