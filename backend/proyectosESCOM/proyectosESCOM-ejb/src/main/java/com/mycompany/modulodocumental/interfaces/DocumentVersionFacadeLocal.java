/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.modulodocumental.interfaces;

import com.mycompany.modulodocumental.entity.DocumentVersion;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author HASHY
 */
@Local
public interface DocumentVersionFacadeLocal {

    void create(DocumentVersion documentVersion);

    void edit(DocumentVersion documentVersion);

    void remove(DocumentVersion documentVersion);

    DocumentVersion find(Object id);

    List<DocumentVersion> findAll();

    List<DocumentVersion> findRange(int[] range);

    int count();
    
    List<DocumentVersion> listVersions(int id);
    
}
