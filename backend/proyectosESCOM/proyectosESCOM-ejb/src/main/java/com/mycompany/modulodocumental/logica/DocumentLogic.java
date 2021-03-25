/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.modulodocumental.logica;

import com.mycompany.modulodocumental.entity.Document;
import com.mycompany.modulodocumental.entity.Program;
import com.mycompany.modulodocumental.interfaces.DocumentFacadeLocal;
import com.mycompany.modulodocumental.interfaces.DocumentLogicFacadeLocal;
import com.mycompany.modulodocumental.interfaces.ProgramFacadeLocal;
import com.mycompany.modulodocumental.pojo.DocumentP;
import com.mycompany.modulodocumental.utility.GenericException;
import com.mycompany.superadministrador.POJO.DatosSolicitudPOJO;
import com.mycompany.superadministrador.interfaces.UtilitarioFacadeLocal;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;

/**
 *
 * @author hashy
 */
@Stateless
public class DocumentLogic implements DocumentLogicFacadeLocal {

    @EJB
    DocumentFacadeLocal documentFacade;
    @EJB
    ProgramFacadeLocal programFacade;
    @EJB
    UtilitarioFacadeLocal bitacora;

    private static final String TABLA = "TBL_DOCUMENT";

    @Override
    public int getIdDocument(int id) throws GenericException {
        try {
            int data = documentFacade.documentIdR(id);
            return data;
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }

    @Override
    public DocumentP getDocumentId(int id) throws GenericException {
        try {
            Document doc = documentFacade.find(id);
            DocumentP data = new DocumentP(doc.getId(), doc.getDescription(), doc.getType(), doc.getState());
            data.setProgram(doc.getFkDocProgram().getName());
            return data;
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }

    @Override
    public List<DocumentP> listDocument() throws GenericException {
        try {
            List<Document> list = documentFacade.findAll();
            List<DocumentP> data = new ArrayList<>();
            for (Document doc : list) {
                if (doc.getState() == 1) {
                    DocumentP aux = new DocumentP(doc.getId(), doc.getDescription(), doc.getType(), doc.getState());
                    aux.setProgram(doc.getFkDocProgram().getName());
                    data.add(aux);
                }
            }
            return data;
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }

    @Override
    public DocumentP documentIdEdit(int id) throws GenericException {
        try {
            Document doc = documentFacade.find(id);
            DocumentP data = new DocumentP(doc.getId(), doc.getDescription(), doc.getType(), doc.getState());
            data.setProgram(doc.getFkDocProgram().getId() + "");
            data.setIdUser(doc.getIdUser());
            return data;
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }

    @Override
    public void addDocument(DocumentP document) throws GenericException {
        try {
            Document data = new Document(document.getDescription(), document.getType(), document.getState());
            Program pro = programFacade.find(Integer.parseInt(document.getProgram()));
            data.setFkDocProgram(pro);
            documentFacade.create(data);
            document.getRequestData().setTablaInvolucrada(TABLA);
            bitacora.registrarEnBitacora(document.getRequestData());
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }

    @Override
    public void editDocument(DocumentP document) throws GenericException {
        try {
            Document data = documentFacade.find(document.getId());
            data.setDescription(document.getDescription());
            data.setIdUser(document.getIdUser());
            data.setType(document.getType());
            Program pro = programFacade.find(Integer.parseInt(document.getProgram()));
            data.setFkDocProgram(pro);
            documentFacade.edit(data);
            document.getRequestData().setTablaInvolucrada(TABLA);
            bitacora.registrarEnBitacora(document.getRequestData());
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }

    @Override
    public void disableDocument(int id, DatosSolicitudPOJO dataR) throws GenericException {
        try {
            Document data = documentFacade.find(id);
            data.setState(-1);
            documentFacade.edit(data);
            dataR.setTablaInvolucrada(TABLA);
            bitacora.registrarEnBitacora(dataR);
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }

}
