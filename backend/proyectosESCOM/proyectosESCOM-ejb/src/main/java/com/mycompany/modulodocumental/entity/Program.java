/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.modulodocumental.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author HASHY
 */
@Entity
@Table(name = "TBL_PROGRAM") 
public class Program implements Serializable {
    
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "PK_PRO_ID")
    private int id;
    @Column(name = "PRO_NAME")
    private String name;
    @Column(name = "PRO_LEVEL_EDUCATION")
    private String levelEducation;
    @Column(name = "PRO_INSTITUTION")
    private String institution;
    @Column(name = "PRO_ACADEMIC_CREDITS")
    private int academicCredits;
    @Column(name = "PRO_DURATION")
    private int duration;
    @Column(name = "PRO_METHODOLOGY")
    private String methodology;
   

    @OneToMany(mappedBy = "fkDocProgram")
    private List<Document> listDocument;
    
    @OneToMany(mappedBy = "fkAxProgram")
    private List<Annex> listAnnex;

    public Program() {
    }

    public Program(String name, String levelEducation, String institution, int academicCredits, int duration, String methodology) {
        this.name = name;
        this.levelEducation = levelEducation;
        this.institution = institution;
        this.academicCredits = academicCredits;
        this.duration = duration;
        this.methodology = methodology;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLevelEducation() {
        return levelEducation;
    }

    public void setLevelEducation(String levelEducation) {
        this.levelEducation = levelEducation;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public int getAcademicCredits() {
        return academicCredits;
    }

    public void setAcademicCredits(int academicCredits) {
        this.academicCredits = academicCredits;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getMethodology() {
        return methodology;
    }

    public void setMethodology(String methodology) {
        this.methodology = methodology;
    }

    public List<Document> getListDocument() {
        return listDocument;
    }

    public void setListDocument(List<Document> listDocument) {
        this.listDocument = listDocument;
    }

    public List<Annex> getListAnnex() {
        return listAnnex;
    }

    public void setListAnnex(List<Annex> listAnnex) {
        this.listAnnex = listAnnex;
    }
    
    
    
}
