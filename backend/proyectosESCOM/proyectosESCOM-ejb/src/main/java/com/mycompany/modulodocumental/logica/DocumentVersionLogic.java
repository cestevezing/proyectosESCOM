/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.modulodocumental.logica;

import com.mycompany.modulodocumental.entity.DocumentVersion;
import com.mycompany.modulodocumental.interfaces.DocumentVersionFacadeLocal;
import com.mycompany.modulodocumental.interfaces.DocumentVersionLogicFacadeLocal;
import com.mycompany.modulodocumental.pojo.DocumentVersionP;
import com.mycompany.modulodocumental.utility.GenericException;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;

/**
 *
 * @author hashy
 */
@Stateless
public class DocumentVersionLogic implements DocumentVersionLogicFacadeLocal {

    @EJB
    private DocumentVersionFacadeLocal documentVersionFacade;

    @Override
    public List<DocumentVersionP> listDocumentVersion(int id) throws GenericException {
        try {
            List<DocumentVersion> list = documentVersionFacade.listVersions(id);
            List<DocumentVersionP> data = new ArrayList<>();
            for (DocumentVersion aux : list) {
                DocumentVersionP ver = new DocumentVersionP(aux.getId(), aux.getDescription(), aux.getVersion(), aux.getLocation(), aux.getState(), aux.getDate());
                data.add(ver);
            }
            return data;
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }

}
