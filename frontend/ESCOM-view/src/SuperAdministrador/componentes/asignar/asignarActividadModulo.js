import React from 'react';


import { NotificationContainer, NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import MaterialTable from 'material-table';

//componentes
import Barra from '../general/BarraDirecciones.js';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';


//redux
import { actionConsultarActividadesModulo, actionCambiarEstadoActividades, actualizarMensajeActividades } from '../../actions/actionsModulo'
import { connect } from 'react-redux';

class AsignarActividadModulo extends React.Component {

    state = {
        actividadesSeleccionadas: [],
        habilitado: false
    }
    componentDidMount() {
        if (this.props.codigoModulo === undefined || this.props.codigoModulo.length === 0) {
            this.props.history.push('/adminModulo');
        } else {
            this.props.actionConsultarActividadesModulo(this.props.codigoModulo, localStorage.getItem('Token'));
        }
    }

    componentDidUpdate() {
        switch (this.props.mensaje) {
            case 'Operacion hecha con exito':
                NotificationManager.success('Operacion hecha con exito');
                this.props.actionConsultarActividadesModulo(this.props.codigoModulo, localStorage.getItem('Token'));
                this.props.actualizarMensajeActividades('');
                break;
            case 'Sin permiso':
                if (!this.state.habilitado) { this.setState({ habilitado: true }) };
                break;
            default:
                break;
        }
    }

    onClickCancelar = (event) => {
        event.preventDefault();
        this.props.history.push('/adminModulo');
    }


    render() {
        return (
            <div>
                <div class="text-left titulo" style={estiloLetrero}>
                    <h4>Asignar actividad a modulo</h4>
                </div>
                <Barra texto="Inicio > Asignación de actividad a modulo" />



                <div className="col-sm-12" style={{
                    paddingTop: "7px",
                    paddingRight: "40px",
                    paddingLeft: "40px",
                    paddingBottom: "20px",
                    margin: "0px 0px 32px"

                }}>
                    <div className="container shadow" style={fondoBarraSuperior}>
                        <br />
                        <div className="jumbotron p-1 jumbotron-fluid" style={fondoTabla}>
                            {
                                this.state.habilitado ? <div className="col-sm-12">
                                    <Alert severity="error" variant="outlined">
                                        <AlertTitle>Sin permiso</AlertTitle>
                                        No tiene permisos suficientes para administrar las actividades de los modulos</Alert>
                                    <div style={{ padding: "25px 44px 25px 395px" }}>
                                        <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" onClick={this.onClickCancelar} startIcon={<DoneOutlineIcon />} type="submit">Aceptar</Button>{''}
                                    </div>
                                </div> :
                                    <>
                                        <MaterialTable
                                            title="Actividades actualmente asociadas al modulo"
                                            localization={{
                                                header: {
                                                    actions: ' '
                                                },
                                                pagination: {
                                                    nextTooltip: 'Siguiente ',
                                                    previousTooltip: 'Anterior',
                                                    labelDisplayedRows: '{from}-{to} de {count}',
                                                    lastTooltip: 'Ultima pagina',
                                                    firstTooltip: 'Primera pagina',
                                                    labelRowsSelect: 'Registros',
                                                    firstAriaLabel: 'oooo'
                                                },
                                                body: {
                                                    emptyDataSourceMessage: 'Ningun registro de actividad encontrada'
                                                },
                                                toolbar: {
                                                    searchTooltip: 'Buscar',
                                                    searchPlaceholder: 'Buscar',
                                                    nRowsSelected: '{0} actividades seleccionadas'
                                                }
                                            }}
                                            columns={[
                                                { title: 'Nombre de modulo', field: 'idActividad', headerStyle: estiloCabecera, cellStyle: estiloFila },
                                                { title: 'Descripcion del modulo', field: 'nombre', headerStyle: estiloCabecera, cellStyle: estiloFila },
                                                {
                                                    title: 'Estado', field: 'estado',
                                                    render: rowData => {
                                                        if (rowData.estado === 'Suspendido') {
                                                            return <span className="label label-sm letra"
                                                                style={{
                                                                    textShadow: "none!important",
                                                                    fontSize: "12px",
                                                                    fontFamily: "Open Sans,sans-serif",
                                                                    fontWeight: "300",
                                                                    padding: "3px 6px",
                                                                    color: "#fff",
                                                                    background: "#ED6B75"
                                                                }}>{rowData.estado}</span>
                                                        } else {
                                                            return <span className="label label-sm letra"
                                                                style={{
                                                                    textShadow: "none!important",
                                                                    fontSize: "12px",
                                                                    fontFamily: "Open Sans,sans-serif",
                                                                    fontWeight: "300",
                                                                    padding: "3px 6px",
                                                                    color: "#fff",
                                                                    background: "#408725"
                                                                }}>{rowData.estado}</span>
                                                        }
                                                    }, headerStyle: estiloCabecera, cellStyle: estiloFila
                                                }

                                            ]}
                                            data={this.props.actividades}
                                            options={{
                                                search: true,
                                                rowStyle: estiloFila,
                                                selection: true
                                            }}
                                            onSelectionChange={(rows) => {
                                                this.setState({ actividadesSeleccionadas: rows });
                                            }}
                                            actions={[
                                                {
                                                    tooltip: 'Activar/Suspender actividades seleccionadas',
                                                    icon: 'restore',
                                                    onClick: (evt, data) => this.props.actionCambiarEstadoActividades(this.state.actividadesSeleccionadas, localStorage.getItem('Token'))
                                                }
                                            ]}
                                        />
                                        <br/>
                                        <Divider variant="middle" />
                                        <br/>
                                        <div style={{paddingLeft:"415px"}}>
                                            <Button
                                                startIcon={<CancelIcon />}
                                                style={fondoBotonCancelar}
                                                className="btn btn-dark"
                                                variant="contained"
                                                onClick={this.onClickCancelar}>
                                                Salir</Button>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    <br />
                </div>
                <NotificationContainer />
            </div>
        )
    }
}


const fondoBotonCancelar = {
    background: "gray",
    fontSize: "14px",
    fontFamily: "sans-serif",
    textTransform: "none"

}


const estiloLetrero = {
    paddingTop: "20px",
    paddingRight: "12px",
    paddingLeft: "40px",
    paddingBottom: "1px"
}

const estiloCabecera = {
    fontSize: '13px',
    fontFamily: 'sans-serif',
    padding: '8px',
    background: '#e7ecf1'

}

const estiloFila = {
    fontSize: '12px',
    fontFamily: 'sans-serif',
    padding: '8px',
}

const fondoBarraSuperior = {
    background: "#FFFFFF",
    padding: "25px"

}

const fondoTabla = {
    background: "white"
}


function mapStateToProps(state) {
    return {
        codigoModulo: state.mod.codigoModulo,
        actividades: state.mod.actividadesModulos,
        mensaje: state.mod.mensajeActividadesModulo,
        configuracion: state.conf.configuracion
    }
}

export default withRouter(connect(mapStateToProps, { actionConsultarActividadesModulo, actionCambiarEstadoActividades, actualizarMensajeActividades })(AsignarActividadModulo));

