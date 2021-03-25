import React from 'react';

//Menu lateral, superior y contenido de inicio
import MenuSuperior from "./SuperAdministrador/componentes/menu/MenuBlancoSuperior.js"
import MenuLateral from "./SuperAdministrador/componentes/menu/MenuLateral.js"
import Login from "./SuperAdministrador/componentes/general/Login.js"
import Inicio from "./SuperAdministrador/componentes/general/ContenidoInicio.js"

//inactividad
import IdleTimer from 'react-idle-timer'

//administrar usuario
import EditarUsuario from './SuperAdministrador/componentes/editar/editarUsuario.js'
import AsignarActividadUsuario from './SuperAdministrador/componentes/asignar/AsignarActividadUsuario.js'

//administrar modulo
import AdminModulo from './SuperAdministrador/componentes/administrar/ContenidoAdminModulo.js'
import EditarModulo from './SuperAdministrador/componentes/editar/editarModulo.js';
import AsignarActividadModulo from './SuperAdministrador/componentes/asignar/asignarActividadModulo.js';
import EditarActividad from './SuperAdministrador/componentes/editar/editarActividad.js';

import Configuracion from './SuperAdministrador/componentes/administrar/ContenidoConfiguracion.js';
//Administrar actividad
import Actividad from './SuperAdministrador/componentes/administrar/ContenidoAdminActividad.js'

import RedireccionarUsuario from './SuperAdministrador/componentes/redirecciones/RedireccionarUsuario.js';
import ContenidoReportes from './SuperAdministrador/componentes/reportes/ContenidoReportes.js';
// import Color from './SuperAdministrador/componentes/color.js';

//estilos
import './SuperAdministrador/css/business-casual.css'
import './SuperAdministrador/css/estilos.css'
import './SuperAdministrador/css/bootstrap.min.css'
import './SuperAdministrador/css/menu.css'

//rutas modulo documental
import LeaderMenu from "./ModuloDocumental/components/General/leaderMenu.js";
import HomeMenu from "./ModuloDocumental/components/General/homeMenu.js";
import Home from "./ModuloDocumental/components/Home/home.js";
import HomeDef from "./ModuloDocumental/components/Home/homeDef.js";
import ListProgram from "./ModuloDocumental/components/Leader/Setting/Program/listProgramS.js";
import ListCondition from "./ModuloDocumental/components/Leader/Setting/Condition/listConditionS.js";
import ViewCondition from "./ModuloDocumental/components/Leader/Setting/Condition/viewConditionS.js";
import ProcessProgram from "./ModuloDocumental/components/Leader/Process/processProgram.js";
import ProcessCondition from "./ModuloDocumental/components/Leader/Process/processCondition.js";
import ProcessActivity from "./ModuloDocumental/components/Leader/Process/processActivity.js";
import ListDocument from "./ModuloDocumental/components/Leader/Setting/Document/listDocumentS.js";
import ListProcess from "./ModuloDocumental/components/Leader/Setting/Process/listProcessS.js";
import ListAnnex from "./ModuloDocumental/components/Leader/Setting/Annex/listAnnexS";
import VersionAnnex from "./ModuloDocumental/components/Leader/Documentation/AnnexSearch/versionAnnex.js";
import SearchAnnexs from "./ModuloDocumental/components/Leader/Documentation/AnnexSearch/searchAnnexs.js";
import VersionDocument from "./ModuloDocumental/components/Leader/Documentation/Versioning/versionDocument.js";
import AddInformation from "./ModuloDocumental/components/User/Process/addInformation.js";
import UserActivity from "./ModuloDocumental/components/User/Process/userActivity.js";
import UserCondition from "./ModuloDocumental/components/User/Process/userCondition.js";
import Prueba from "./ModuloDocumental/components/prueba.js";
import Classification from './ModuloDocumental/components/User/Classification/classification.js';

//rutas
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

//store
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './SuperAdministrador/reducers';
import thunk from 'redux-thunk'


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends React.Component {

	constructor(props) {
		super(props)
		this.idleTimer = null
		this.onAction = this._onAction.bind(this)
		this.onActive = this._onActive.bind(this)
		this.onIdle = this._onIdle.bind(this)
	}


	render() {
		return (
			<Provider store={createStoreWithMiddleware(reducers)}>
				<IdleTimer
					ref={ref => { this.idleTimer = ref }}
					element={document}
					onActive={this.onActive}
					onIdle={this.onIdle}
					onAction={this.onAction}
					debounce={250}
					timeout={1000 * 60 * 10} />
				<Router>
					<Switch>
						{/*Ruta para inicio*/}
						<Route exact path="/" render={() => {
							return <div>
								<Login />
							</div>
						}}>
						</Route>

						<RutaProtegida path="/inicio">
							<>
								<div id="wrapper">
									<Inicio />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/adminUsuario">
							<>
								<MenuLateral />
								<MenuSuperior />
								<div id="wrapper">
									<RedireccionarUsuario />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/editarUsuario">
							<>
								<div id="wrapper">
									<MenuLateral />
									<MenuSuperior />
									<EditarUsuario />
								</div>
							</>
						</RutaProtegida>
						<RutaProtegida path="/asignarActividadUsuario">
							<>
								<div id="wrapper">
									<MenuLateral />
									<MenuSuperior />
									<AsignarActividadUsuario />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/adminModulo">
							<>
								<MenuLateral />
								<MenuSuperior />
								<div id="wrapper">
									<AdminModulo />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/editarModulo">
							<>
								<div id="wrapper">
									<MenuLateral />
									<MenuSuperior />
									<EditarModulo />
								</div>
							</>
						</RutaProtegida>
						<RutaProtegida path="/asignarActividadModulo">
							<>
								<div id="wrapper">
									<MenuLateral />
									<MenuSuperior />
									<AsignarActividadModulo />
								</div>
							</>
						</RutaProtegida>
						<RutaProtegida path="/adminActividad">
							<>
								<MenuLateral />
								<MenuSuperior />
								<div id="wrapper">
									<Actividad />
								</div>
							</>
						</RutaProtegida>
						<RutaProtegida path="/editarActividad">
							<>
								<MenuLateral />
								<MenuSuperior />
								<div id="wrapper">
									<EditarActividad />
								</div>
							</>
						</RutaProtegida>
						<RutaProtegida path="/reportes">
							<>
								<MenuLateral />
								<MenuSuperior />
								<div id="wrapper">
									<ContenidoReportes />
								</div>
							</>
						</RutaProtegida>
						<RutaProtegida path="/configuracion">
							<>
								<MenuLateral />
								<MenuSuperior />
								<div id="wrapper">
									<Configuracion />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/homeDocumentary">
							<>
								<HomeMenu />
								<MenuSuperior />
								<div id="wrapper">
									<Home />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/Prueba">
							<>
								<HomeMenu />
								<MenuSuperior />
								<div id="wrapper">
									<Prueba />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/Classification">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<Classification />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/AddInformation">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<AddInformation />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/UserActivity">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<UserActivity />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/UserCondition">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<UserCondition />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/HomeDef">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<HomeDef />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/ListCondition">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ListCondition />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/ProcessProgram">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ProcessProgram />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/ProcessCondition">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ProcessCondition />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/ProcessActivity">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ProcessActivity />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/viewCondition">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ViewCondition />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/ListAnnex">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ListAnnex />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/VersionAnnex">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<VersionAnnex />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/SearchAnnexs">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<SearchAnnexs />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/VersionDocument">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<VersionDocument />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/ListProgram">
							<>
								<HomeMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ListProgram />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/ListDocument">
							<>
								<HomeMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ListDocument />
								</div>
							</>
						</RutaProtegida>

						<RutaProtegida path="/ListProcess">
							<>
								<LeaderMenu />
								<MenuSuperior />
								<div id="wrapper">
									<ListProcess />
								</div>
							</>
						</RutaProtegida>
					</Switch>
				</Router>

			</Provider>
		);
	}

	_onAction(e) {
		//captura cualquier accion que realiza el usuario
		//console.log('user did something', e)
	}

	_onActive(e) {
		//captura la accion cuando el usuario pasa de estar inactivo a activo
		// console.log('user is active', e)
		// console.log('time remaining', this.idleTimer.getRemainingTime())
	}

	_onIdle(e) {
		//captura la accion despues pasados x minutos de inactividad
		// console.log('user is idle', e)
		// console.log('last active', this.idleTimer.getLastActiveTime())
		localStorage.setItem('Token', ' ');
		window.location.href = "/";
	}
}

function RutaProtegida({ children, ...rest }) {
	let atributo = false;
	let token = localStorage.getItem('Token');
	if (token !== ' ') {
		atributo = true;
	}
	return (
		<Route
			{...rest}
			render={({ location }) =>
				atributo ? (
					children
				) : (
						<Redirect
							to={{
								pathname: "/"
							}}
						/>
					)
			}
		/>
	);
}


export default App;
