import React from 'react';

//estilos
import '../../css/business-casual.css'
import '../../css/estilos.css'
import '../../css/bootstrap.min.css'
import '../../css/menu.css'
import 'react-notifications/lib/notifications.css';

//componentes
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Button from '@material-ui/core/Button';
import Select from 'react-select'
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { seleccione } from '../../utilitario/validacionCampos.js';
import MaterialTable from 'material-table';
import Barra from '../general/BarraDirecciones.js';


import Divider from '@material-ui/core/Divider';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

//componentes

//redux
import { actionConsultarModulos, actionConsultarActividadesSinAsignar, actionEliminarActividades, actualizarMensajeAsignar, actionAsignarActividades, actionConsultarActividadesUsuario, actionAsignarActividad } from '../../actions/actionsUsuario.js'
import { connect } from 'react-redux';


class AsignarActividadUsuario extends React.Component {

    state = {
        selectedOption: 0,
        valor: null,
        actividadesSeleccionadas: []
    }

    componentDidMount() {
        if (this.props.cedula === undefined || this.props.cedula.length === 0) {
            this.props.history.push('/adminUsuario');
        }
        this.props.actionConsultarModulos(localStorage.getItem('Token'));
        this.props.actionConsultarActividadesUsuario(this.props.cedula, localStorage.getItem('Token'));
    }
    componentDidUpdate() {
        switch (this.props.mensaje) {
            case 'Actividad asignada':
                NotificationManager.success('Actividad asignada');
                this.setState({ valor: null });
                this.props.actualizarMensajeAsignar('');
                this.props.actionConsultarActividadesUsuario(this.props.cedula, localStorage.getItem('Token'));
                this.props.actionConsultarActividadesSinAsignar(localStorage.getItem('Token'), this.props.cedula, this.state.selectedOption.value);
                break;
            case 'Actividades eliminadas':
                NotificationManager.success('Actividades eliminadas');
                this.props.actualizarMensajeAsignar('');
                this.props.actionConsultarActividadesUsuario(this.props.cedula, localStorage.getItem('Token'));
                if (this.state.selectedOption.value !== undefined) {
                    this.props.actionConsultarActividadesSinAsignar(localStorage.getItem('Token'), this.props.cedula, this.state.selectedOption.value);
                }
                break;
            default:
                break;
        }

    }

    opciones = () => {
        let respuesta = [];
        this.props.modulos.forEach(
            modulo => {
                let objeto = {
                    label: modulo.nombreModulo,
                    value: modulo.idModulo,
                }
                respuesta.push(objeto);
            }
        )
        return respuesta;
    }

    actividades = () => {
        let respuesta = [];
        if (this.props.actividadesSinAsignar !== null && this.props.actividadesSinAsignar !== undefined) {
            this.props.actividadesSinAsignar.forEach(
                actividad => {
                    let objeto = {
                        label: actividad.nombre,
                        value: actividad.idActividad,
                    }
                    respuesta.push(objeto);
                }
            )
            return respuesta;
        } else {
            return null;
        }
    }

    retornarValor = () => {
        return this.state.valor;
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption });
        this.setState({ valor: null });
        this.props.actionConsultarActividadesSinAsignar(localStorage.getItem('Token'), this.props.cedula, selectedOption.value);
    };

    handleChangeDos = selectedOption => {
        this.setState({ valor: selectedOption });
    };

    onClickCancelar = (event) => {
        event.preventDefault();
        this.props.history.push('/adminUsuario');
    }

    handleSubmit = formValues => {
        if (this.state.valor !== null) {
            let actividad = {
                idActividad: this.state.valor.value,
                nombre: this.state.valor.label
            }
            this.setState({ valor: null });
            this.props.actionAsignarActividad(localStorage.getItem('Token'), this.props.cedula, actividad);
        }
    }
    render() {
        return (
            <>
                <div className="text-left titulo" style={estiloLetrero}>
                    <h4>Asignar actividad a usuario</h4>
                </div>
                <Barra texto="Inicio > Administracion de usuarios > Asignación de actividad a usuario" />
                <div className="container" style={{
                    paddingTop: "7px",
                    paddingRight: "44px",
                    paddingLeft: "40px",
                    paddingBottom: "20px",
                    margin: "0px 0px 32px"

                }}>

                    <div className="container shadow" style={
                        {
                            background: "white",
                            paddingTop: "37px",
                            paddingRight: "31px",
                            paddingLeft: "31px",
                            paddingBottom: "21px"
                        }} >
                        {
                            this.props.habilitado ? <div className="col-sm-12">
                                <Alert severity="error" variant="outlined">
                                    <AlertTitle>Sin permiso</AlertTitle>
                                    No tiene permisos suficientes para administrar las actividades de los usuarios
                                </Alert>
                                <div style={{ padding: "25px 44px 25px 395px" }}>
                                    <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" onClick={this.onClickCancelar} startIcon={<DoneOutlineIcon />} type="submit">Aceptar</Button>{''}
                                </div>
                            </div> :
                                <>
                                    <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                                        <br />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Field name="modulo" validate={[seleccione]} onChange={this.handleChange} component={ReduxFormSelect} options={this.opciones()} />
                                            </div>
                                            <div className="col-md-6">
                                                <Field name="actividad" validate={[seleccione]} valor={this.retornarValor()} onChange={this.handleChangeDos} component={ReduxFormSelectDos} options={this.actividades()} />
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="row">
                                            <div className="col-md-6" style={{paddingLeft:"350px"}}>
                                                <Button
                                                    style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }}
                                                    className="btn btn-dark"
                                                    type="submit"
                                                    variant="contained"
                                                    startIcon={<AddCircleOutlineIcon />}
                                                >Añadir</Button>
                                            </div>
                                            <div className="col-md-6" style={{paddingLeft:"39px"}}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    className="btn btn-dark"
                                                    style={fondoBotonCancelar}
                                                    onClick={this.onClickCancelar}
                                                    startIcon={<CancelIcon />}
                                                >Salir</Button>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <Divider variant="middle" />
                                        <br />
                                    </form>
                                    <div>
                                        <MaterialTable
                                            title="Actividades actualmente asignadas al usuario"
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
                                                    emptyDataSourceMessage: 'Ningun registro de actividad encontrado'
                                                },
                                                toolbar: {
                                                    searchTooltip: 'Buscar',
                                                    searchPlaceholder: 'Buscar',
                                                    nRowsSelected: '{0} actividades seleccionadas',
                                                }
                                            }}
                                            columns={[
                                                { title: 'Nombre de la actividad', field: 'nombre', headerStyle: estiloCabecera, cellStyle: estiloFila }
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
                                                    tooltip: 'Eliminar actividades seleccionadas',
                                                    icon: 'delete',
                                                    onClick: (evt, data) => this.props.actionEliminarActividades(this.state.actividadesSeleccionadas, localStorage.getItem('Token'), this.props.cedula)
                                                }
                                            ]}
                                        />
                                    </div>
                                </>
                        }
                        <br />
                    </div>
                </div>
                <NotificationContainer />
            </>

        )
    }
}

export const ReduxFormSelect = props => {
    const { input, options } = props;
    const { touched, error } = props.meta;
    return (
        <>
            <Select
                {...input}
                maxMenuHeight={185}
                isSearchable={true}
                placeholder='Seleccione un modulo'
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                noOptionsMessage={() => 'Aun no hay ningun modulo registrado'}
                options={options}
            />
            {touched && ((error && <span className="text-danger letra form-group">{error}</span>))}
        </>
    )
}

export const ReduxFormSelectDos = props => {
    const { input, options } = props;
    const { touched, error } = props.meta;
    return (
        <div>
            <Select
                {...input}
                maxMenuHeight={185}
                isSearchable={true}
                value={props.valor}
                placeholder='Seleccione una actividad'
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                options={options}
                noOptionsMessage={() => 'No hay ninguna actividad que mostrar'}
            />
            {touched && ((error && <span className="text-danger letra form-group">{error}</span>))}
        </div>
    )
}

const estiloCabecera = {
    fontSize: '14px',
    fontFamily: 'sans-serif',
    padding: '8px',
    background: '#e7ecf1'

}

const estiloFila = {
    fontSize: '13px',
    fontFamily: 'sans-serif',
    padding: '8px',
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



function mapStateToProps(state) {
    return {
        modulos: state.user.modulosAsignar,
        mensaje: state.user.mensajeAsignar,
        habilitado: state.user.estadoAsignar,
        cedula: state.user.cedula,
        actividades: state.user.actividadesUsuario,
        actividadesSinAsignar: state.user.actividadesSinAsignar,
        configuracion: state.conf.configuracion
    }
}

let asignarActividadUsuario = reduxForm({
    form: 'asignarActividadUsuario'
})(AsignarActividadUsuario)

export default withRouter(connect(mapStateToProps, { actionConsultarModulos, actionEliminarActividades, actionConsultarActividadesSinAsignar, actualizarMensajeAsignar, actionAsignarActividad, actionAsignarActividades, actionConsultarActividadesUsuario })(asignarActividadUsuario));
