/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.superadministrador.interfaces;

import com.mycompany.superadministrador.POJO.ActividadPOJO;
import com.mycompany.superadministrador.POJO.DatosSolicitudPOJO;
import com.mycompany.superadministrador.POJO.ModuloPOJO;
import com.mycompany.superadministrador.utilitarios.ExcepcionGenerica;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author aleja
 */
@Local
public interface LogicaModuloFacadeLocal {
    
    public void registrarModulo(ModuloPOJO modulo)throws ExcepcionGenerica;
    
    public List<ModuloPOJO> devolverModulos()throws ExcepcionGenerica;
    
    public ModuloPOJO traerModuloId(int idModulo) throws ExcepcionGenerica;
    
    public List<ActividadPOJO> listarActividadesModulo(int idModulo) throws ExcepcionGenerica;
    
    public void editarModulo(int idModulo, ModuloPOJO moduloEditar) throws ExcepcionGenerica;
    
    public void cambiarEstadoModulo(int idModulo,DatosSolicitudPOJO datosSolicitud) throws ExcepcionGenerica;
    
    public void cambiarEstadoActividadModulo(List<ActividadPOJO> idActividad) throws ExcepcionGenerica;
    
}
