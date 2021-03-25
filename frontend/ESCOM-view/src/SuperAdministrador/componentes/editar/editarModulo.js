import React from 'react';

//componentes
import Barra from '../general/BarraDirecciones';
import Button from '@material-ui/core/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { campo, generarInput } from '../../utilitario/GenerarInputs.js';
import PropTypes from "prop-types";
import { requerido, validacionCuarentaCaracteres, validacionDoscientosCaracteres } from '../../utilitario/validacionCampos.js';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';


//redux
import { actionCargarInformacionDeModulo, actionEditarModulo, actionConsultarActividadesModulo, actualizarMensajeEditar } from '../../actions/actionsModulo.js'
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';


class EditarModulo extends React.Component {

    state = {
        habilitado: false,
        actividadesSeleccionadas: []
    }


    static propTypes = {
        previewLogoUrl: PropTypes.string,
        tipoDeImagen: PropTypes.string,
        pesoMaximo: PropTypes.number,
        anchuraMaxima: PropTypes.number,
        alturaMaxima: PropTypes.number,
        handleSubmit: PropTypes.func.isRequired
    };
    static defaultProps = {
        previewLogoUrl: "https://imgplaceholder.com/400x300",
        tipoDeImagen: "image/jpeg, image/png",
        pesoMaximo: 100,
        anchuraMaxima: 100,
        alturaMaxima: 100
    };
    validateImageWeight = imageFile => {
        if (imageFile && imageFile.size) {
            const imageFileKb = imageFile.size / 1024;
            const { pesoMaximo } = this.props;

            if (imageFileKb > pesoMaximo) {
                return `El tamaño de la imagen debe ser menor o igual a ${pesoMaximo}kb`;
            }
        }
    };
    validateImageWidth = imageFile => {
        if (imageFile) {
            const { anchuraMaxima } = this.props;
            if (imageFile.width > anchuraMaxima) {
                return `El ancho de la imagen debe ser menor o igual a ${anchuraMaxima}px`;
            }
        }
    };
    validateImageHeight = imageFile => {
        if (imageFile) {
            const { alturaMaxima } = this.props;

            if (imageFile.height > alturaMaxima) {
                return `La altura de la imagen debe ser menor o igual a ${alturaMaxima}px`;
            }
        }
    };
    validateImageFormat = imageFile => {
        if (imageFile) {
            const { tipoDeImagen } = this.props;
            if (!tipoDeImagen.includes(imageFile.type)) {
                return `El tipo de imagen debe ser ${tipoDeImagen}`;
            }
        }
    };
    handlePreview = imageUrl => {
        const previewImageDom = document.querySelector(".preview-image");
        previewImageDom.src = imageUrl;
    };

    handleChange = (event, input) => {
        event.preventDefault();
        let imageFile = event.target.files[0];
        const { tipoDeImagen } = this.props;
        if (imageFile) {
            if (!tipoDeImagen.includes(imageFile.type)) {
                NotificationManager.error('Seleccione un archivo de imagen .jpg o .png');
                event.target.value = null;
            } else {
                const localImageUrl = URL.createObjectURL(imageFile);
                const imageObject = new window.Image();

                imageObject.onload = () => {
                    imageFile.width = imageObject.naturalWidth;
                    imageFile.height = imageObject.naturalHeight;
                    input.onChange(imageFile);
                    URL.revokeObjectURL(imageFile);
                };
                imageObject.src = localImageUrl;
                this.handlePreview(localImageUrl);
            }
        }
    };

    renderFileInput = ({ input, type, meta }) => {
        const { tipoDeImagen } = this.props;
        const { touched, error, warning } = meta;
        return (
            <div>
                <input
                    id="numeroUno"
                    style={{ display: 'none' }}
                    name={input.name}
                    type={type}
                    accept={tipoDeImagen}
                    onChange={event => this.handleChange(event, input)}
                />
                <label htmlFor="numeroUno">
                    <Button component="span" startIcon={<PhotoCamera />}>Seleccionar imagen</Button>
                </label>
                {touched && ((error && <span className="text-danger letra form-group">{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        );
    };


    handleSubmitForm = values => {
        if (values.image === undefined | values.image === null) {
            let modulo = {
                nombreModulo: values.nombre,
                descripcionModulo: values.descripcion,
                imagenModulo: campo(this.props.initialValues.imagen),
                estadoModulo: 'Activo'
            }
            this.props.actionEditarModulo(modulo, this.props.codigoModulo, localStorage.getItem('Token'));
            // this.props.actionAgregarModulo(modulo, localStorage.getItem('Token'));
        } else {
            this.getBase64(values.image, (result) => {
                let modulo = {
                    nombreModulo: values.nombre,
                    descripcionModulo: values.descripcion,
                    imagenModulo: result,
                    estadoModulo: 'Activo'
                }
                this.props.actionEditarModulo(modulo, this.props.codigoModulo, localStorage.getItem('Token'));
            });
        }
    };




    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    componentDidUpdate() {
        switch (this.props.mensajeEditar) {
            case 'Sin permiso':
                if (!this.state.habilitado) { this.setState({ habilitado: true }) };
                break;
            case 'modulo editado':
                NotificationManager.success('Informacion actualizada correctamente');
                this.props.actionCargarInformacionDeModulo(this.props.codigoModulo, localStorage.getItem('Token'));
                this.props.actualizarMensajeEditar('');
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        if (this.props.codigoModulo === undefined || this.props.codigoModulo.length === 0) {
            this.props.history.push('/adminModulo');
        } else {
            this.props.actionCargarInformacionDeModulo(this.props.codigoModulo, localStorage.getItem('Token'));
        }
    }


    onClickCancelar = (event) => {
        event.preventDefault();
        this.props.history.push('/adminModulo');
    }

    render() {
        return (
            <div>
                <div className="text-left titulo">
                    <h4>Editar modulo</h4>
                </div>
                <Barra texto="Inicio > Editar modulo" />
                <br />
                <div className="col-sm-12" style={{
                    paddingTop: "0px",
                    paddingRight: "40px",
                    paddingLeft: "40px",
                    paddingBottom: "0px",
                    margin: "0px 0px 30px"

                }}>

                    <div className="container shadow" style={{ background: "white" }}>
                        <br />
                        {
                            this.state.habilitado ? <div className="col-sm-12">
                                <Alert severity="error" variant="outlined">
                                    <AlertTitle>Sin permiso</AlertTitle>
                                    No tiene permisos suficientes para editar la informacion de los modulos
                                </Alert>
                                <div style={{ padding: "25px 44px 25px 395px" }}>
                                    <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" onClick={this.onClickCancelar} startIcon={<DoneOutlineIcon />} type="submit">Aceptar</Button>{''}
                                </div>
                            </div> :
                                <>
                                    <form className="letra" onSubmit={this.props.handleSubmit(this.handleSubmitForm)}>
                                        <table border="0px" style={{ width: "100%" }}>
                                            <tr>
                                                <td colspan="2" style={{ width: "65%", paddingRight: "39px", paddingLeft: "39px" }}>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <label>Nombre</label>
                                                            <Field name="nombre" validate={[requerido, validacionCuarentaCaracteres]} component={generarInput} label="Nombre" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td colspan="2" rowspan="2">
                                                    <label>Imagen</label>
                                                    <div style={{ padding: "30px 30px 30px 77px" }}>
                                                        <img src={campo(this.props.initialValues.imagen)} alt="preview"
                                                            className="preview-image"
                                                            style={{ height: "200px", width: "200px", borderRadius: "50%", objectFit: "cover" }} />
                                                    </div>
                                                    <Field
                                                        name="image"
                                                        type="file"
                                                        validate={[
                                                            this.validateImageWeight
                                                        ]}
                                                        component={this.renderFileInput}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style={{ width: "65%", paddingRight: "39px", paddingLeft: "39px" }}>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <label>Descripcion</label>
                                                            <Field name="descripcion" validate={[requerido, validacionDoscientosCaracteres]} component={renderTextArea} label="Apellido" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <br />
                                        <Divider variant="middle" />
                                        <br />
                                        <div className="row">
                                            <div className="col-md-6" style={{ paddingLeft: "334px" }}>
                                                <Button
                                                    type="submit"
                                                    startIcon={<SaveAltIcon />}
                                                    className="btn btn-dark"
                                                    style={{ background: this.props.configuracion.botones, fontSize: "14px", textTransform: "none" }}
                                                    variant="contained">
                                                    Guardar
                                        </Button>
                                            </div>
                                            <div className="col-md-6" style={{ paddingLeft: "0px" }}>
                                                <Button startIcon={<CancelIcon />}
                                                    style={fondoBotonCancelar}
                                                    variant="contained"
                                                    className="btn btn-dark"
                                                    onClick={this.onClickCancelar}>Salir</Button>
                                            </div>
                                        </div>
                                    </form>
                                    <NotificationContainer />
                                </>
                        }
                        <br />
                    </div>
                </div>
            </div>
        )


    }
}

const renderTextArea = ({ input, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <textarea {...input} style={{ fontSize: "12px" }} rows="10" className="form-control letra form-control-solid placeholder-no-fix" />
            {touched && ((error && <span className="text-danger letra form-group">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);


const fondoBotonCancelar = {
    background: "gray",
    fontSize: "14px",
    fontFamily: "sans-serif",
    textTransform: "none"

}

function mapStateToProps(state) {
    return {
        codigoModulo: state.mod.codigoModulo,
        mensajeEditar: state.mod.mensajeEditarModulo,
        configuracion: state.conf.configuracion,
        initialValues: {
            nombre: state.mod.moduloEditar.nombreModulo,
            descripcion: state.mod.moduloEditar.descripcionModulo,
            imagen: state.mod.moduloEditar.imagenModulo,
        }
    }
}


let formularioEditar = reduxForm({
    form: 'editarModulo',
    enableReinitialize: true
})(EditarModulo)

export default withRouter(connect(mapStateToProps, { actionCargarInformacionDeModulo, actionEditarModulo, actionConsultarActividadesModulo, actualizarMensajeEditar })(formularioEditar));

