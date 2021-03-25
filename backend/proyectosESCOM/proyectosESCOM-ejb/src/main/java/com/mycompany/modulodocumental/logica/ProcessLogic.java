/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.modulodocumental.logica;

import com.mycompany.modulodocumental.entity.Document;
import com.mycompany.modulodocumental.entity.Process;
import com.mycompany.modulodocumental.interfaces.DocumentFacadeLocal;
import com.mycompany.modulodocumental.interfaces.ProcessFacadeLocal;
import com.mycompany.modulodocumental.interfaces.ProcessLogicFacadeLocal;
import com.mycompany.modulodocumental.pojo.ProcessP;
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
public class ProcessLogic implements ProcessLogicFacadeLocal {
    
    @EJB
    private ProcessFacadeLocal processFacade;
    @EJB
    private DocumentFacadeLocal documentFacade;
    @EJB
    UtilitarioFacadeLocal bitacora;
    
    private static final String TABLA = "TBL_PROCESS";
    
    @Override
    public List<ProcessP> listProcess(int id) throws GenericException {
        try {
            List<Process> list = processFacade.listProcess(id);
            List<ProcessP> data = new ArrayList<>();
            for (Process pro : list) {
                ProcessP proP = new ProcessP(pro.getId(), pro.getName(), pro.getDescription());
                data.add(proP);
            }
            return data;
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }
    
    @Override
    public ProcessP getProcessId(int id) throws GenericException {
        try {
            Process pro = processFacade.find(id);
            ProcessP data = new ProcessP(pro.getId(), pro.getName(), pro.getDescription());
            return data;
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }
    
    @Override
    public void addProcess(ProcessP process) throws GenericException {
        try {
            Process data = new Process(process.getName(), process.getDescription(), process.getState());
            Document doc = documentFacade.find(Integer.parseInt(process.getDocument()));
            data.setFkPrcDocument(doc);
            processFacade.create(data);
            process.getRequestData().setTablaInvolucrada(TABLA);
            bitacora.registrarEnBitacora(process.getRequestData());
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }
    
    @Override
    public void editProcess(ProcessP process) throws GenericException {
        try {
            Process data = processFacade.find(process.getId());
            data.setDescription(process.getDescription());
            data.setName(process.getName());
            processFacade.edit(data);
            process.getRequestData().setTablaInvolucrada(TABLA);
            bitacora.registrarEnBitacora(process.getRequestData());
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }
    
    @Override
    public void disableProcess(int id, DatosSolicitudPOJO dataR) throws GenericException {
        try {
            Process data = processFacade.find(id);
            data.setState(-1);
            processFacade.edit(data);
            dataR.setTablaInvolucrada(TABLA);
            bitacora.registrarEnBitacora(dataR);
        } catch (Exception e) {
            throw new GenericException("error server");
        }
    }
    
}
