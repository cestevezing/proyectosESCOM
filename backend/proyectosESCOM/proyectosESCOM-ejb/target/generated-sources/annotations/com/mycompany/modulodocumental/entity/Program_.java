package com.mycompany.modulodocumental.entity;

import com.mycompany.modulodocumental.entity.Annex;
import com.mycompany.modulodocumental.entity.Document;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2020-03-25T17:21:43")
@StaticMetamodel(Program.class)
public class Program_ { 

    public static volatile SingularAttribute<Program, Integer> duration;
    public static volatile SingularAttribute<Program, String> institution;
    public static volatile SingularAttribute<Program, Integer> academicCredits;
    public static volatile ListAttribute<Program, Annex> listAnnex;
    public static volatile SingularAttribute<Program, String> name;
    public static volatile SingularAttribute<Program, Integer> id;
    public static volatile SingularAttribute<Program, String> levelEducation;
    public static volatile SingularAttribute<Program, String> methodology;
    public static volatile ListAttribute<Program, Document> listDocument;

}