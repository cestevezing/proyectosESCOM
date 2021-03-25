import React from 'react';

//componentes
import Barra from '../general/BarraDirecciones.js'
import PopUpUsuario from '../popup/PopUpUsuario.js'
import MaterialTable from 'material-table';
import MTableToolbar from '../../utilitario/MTableToolbar.js';
import { confirmAlert } from 'react-confirm-alert';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { NotificationManager } from 'react-notifications';

//redux conexion
import { connect } from 'react-redux';
import { actionConsultarUsuarios, actualizarMensajeSuspender, actionAsignarCedula, actualizarMensajeEditar, actionActualizarUsuarios, actionSuspenderActivarUsuario } from '../../actions/actionsUsuario.js'
import { withRouter } from 'react-router-dom';

class ContenidoAdminUsuario extends React.Component {

	state = {
		cedula: 0
	}

	componentWillMount() {
		this.props.actionConsultarUsuarios(localStorage.getItem('Token'));
	}

	componentDidUpdate() {
		if (this.props.mensajeSuspender !== '') {
			switch (this.props.mensajeSuspender) {
				case 'Sin permiso':
					NotificationManager.error('No tiene permisos para suspender/activar los usuarios');
					break;
				case 'Operacion hecha con exito':
					NotificationManager.success('Operacion realizada con exito');
					break;
				default:
					break;
			}
		}
	}

	actualizarUsuarios(numeroDocumento) {
		let nuevo = [];
		this.props.usuarios.forEach(function (task, index, array) {
			if (task.numeroDocumento === numeroDocumento) {
				if (task.estado === "Suspendido") {
					let usuario = {
						nombre: task.nombre,
						numeroDocumento: task.numeroDocumento,
						correoElectronico: task.correoElectronico,
						estado: "Activo"
					}
					nuevo.push(usuario);
				} else {
					let usuario = {
						nombre: task.nombre,
						numeroDocumento: task.numeroDocumento,
						correoElectronico: task.correoElectronico,
						estado: "Suspendido"
					}
					nuevo.push(usuario);
				}
			} else {
				nuevo.push(task);
			}
		});
		return nuevo;
	}

	activarDesactivarUsuario(cedula) {
		confirmAlert({
			title: '',
			message: '¿Esta seguro?',
			buttons: [
				{
					label: 'Si',
					onClick: () => {
						if (this.state.cedula === 0) { this.setState({ cedula: cedula }) };
						this.props.actualizarMensajeSuspender('');
						this.props.actionSuspenderActivarUsuario(cedula, localStorage.getItem('Token'), this.actualizarUsuarios(cedula), this.props.usuarios);
					}
				},
				{
					label: 'No',
					onClick: () => NotificationManager.info('Se cancelo la operacion')
				}
			]
		});

	}

	render() {
		return (
			<div>
				<div className="text-left titulo" style={estiloLetrero}>
					<h4>Administrar usuarios</h4>
				</div>
				<Barra texto="Inicio > Administración de usuarios" />
				<div className="col-sm-12" style={{
					paddingTop: "20px",
					paddingRight: "46px",
					paddingLeft: "40px",
					paddingBottom: "7px",
				}}>
				</div>
				<div className="container" style={{
					paddingTop: "7px",
					paddingRight: "44px",
					paddingLeft: "40px",
					paddingBottom: "20px",
					margin: "0px 0px 32px"
				}}>
					<div className="container shadow" style={fondoBarraSuperior}> 
						<div>
							{
								this.props.habilitado ? <div className="col-sm-12">
									<Alert severity="error" variant="outlined">
										<AlertTitle>Sin permiso</AlertTitle>
										No tiene permisos suficientes para consultar los usuarios registrados</Alert>
								</div> :
									<MaterialTable
										title=""
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
												emptyDataSourceMessage: 'Ningun registro de usuarios encontrado'
											},
											toolbar: {
												searchTooltip: 'Buscar',
												searchPlaceholder: 'Buscar'
											}
										}}
										columns={[
											{
												title: 'Numero de identificacion', field: 'numeroDocumento', type: 'numeric',
												headerStyle: estiloCabecera,
												cellStyle: estiloFila
											},
											{ title: 'Nombre', field: 'nombre', headerStyle: estiloCabecera, cellStyle: estiloFila },
											{ title: 'Correo electronico', field: 'correoElectronico', headerStyle: estiloCabecera, cellStyle: estiloFila },
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
												},
												headerStyle: estiloCabecera, cellStyle: estiloFila
											},
										]}
										data={this.props.usuarios}
										options={{
											search: true,
											rowStyle: estiloFila

										}}
										actions={[
											{
												icon: 'edit',
												tooltip: 'Editar informacion',
												onClick: (event, rowData) => {
													this.props.actualizarMensajeSuspender('');
													this.props.actionAsignarCedula(rowData.numeroDocumento);
													this.props.history.push('/editarUsuario');
												}
											},
											{
												icon: 'restore',
												tooltip: 'Suspender / Activar',
												onClick: (event, rowData) => this.activarDesactivarUsuario(rowData.numeroDocumento)
											},
											{
												icon: 'assignmentInd',
												tooltip: 'Administrar actividades',
												onClick: (event, rowData) => {
													this.props.actualizarMensajeSuspender('');
													this.props.actionAsignarCedula(rowData.numeroDocumento);
													this.props.history.push('/asignarActividadUsuario');
												}
											}
										]}

										components={{
											Toolbar: props => (
												<div className="row">
													<div className="col-sm-4">
														<div style={{ padding: '16px' }}>
															<PopUpUsuario funcion={this.anadirTarea} />
														</div>
													</div>
													<div className="col-sm-8">
														<MTableToolbar {...props} />
													</div>
												</div>
											),
										}}

									/>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}


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

const estiloLetrero = {
	paddingTop: "20px",
	paddingRight: "12px",
	paddingLeft: "40px",
	paddingBottom: "1px"
}

const fondoBarraSuperior = {
	background: "#FFFFFF",
	padding: '30px'
}




function mapStateToProps(state) {
	return {
		usuarios: state.user.usuariosRegistrados,
		cedulaEditar: state.user.cedula,
		habilitado: state.user.estadoUsuarios,
		mensajeSuspender: state.user.mensajeSuspender
	}
}


export default withRouter(connect(mapStateToProps, { actionConsultarUsuarios, actionAsignarCedula, actualizarMensajeSuspender, actualizarMensajeEditar, actionActualizarUsuarios, actionSuspenderActivarUsuario })(ContenidoAdminUsuario));