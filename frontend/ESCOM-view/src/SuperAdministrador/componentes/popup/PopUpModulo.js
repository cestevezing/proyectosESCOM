import React from 'react';

import 'react-notifications/lib/notifications.css';

import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Defecto from '../../imagenes/defecto.jpg';
import PropTypes from "prop-types";
import { requerido, validacionCuarentaCaracteres, validacionDoscientosCaracteres } from '../../utilitario/validacionCampos.js';
import AddIcon from '@material-ui/icons/Add';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { generarInput, generarTextArea } from '../../utilitario/GenerarInputs.js'
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { actionAgregarModulo,actualizarMensajeRegistrar } from '../../actions/actionsModulo.js';
import { connect } from 'react-redux';

class PopUpModulo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.props.reset();
  }

  componentDidUpdate() {
    if (this.props.mensajeRegistrar !== '') {
      switch (this.props.mensaje) {
        case 'modulo registrado':
          NotificationManager.success('Modulo registrado correctamente');
          break;
        case 'Sin permiso':
          NotificationManager.error('No tiene los permisos suficientes para registrar un modulo');
          this.props.reset();
          this.props.actualizarMensajeRegistrar('');
          break;
        default:
          break;
      }
    }
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
    if (!(values.image === undefined | values.image === null)) {
      this.getBase64(values.image, (result) => {
        let modulo = {
          nombreModulo: values.nombre,
          descripcionModulo: values.descripcion,
          imagenModulo: result,
          estadoModulo: 'Activo'
        }
        this.props.actionAgregarModulo(modulo, localStorage.getItem('Token'));
      });
    } else {
      NotificationManager.error('Seleccione un archivo de imagen .jpg o .png');
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

  render() {
    return (
      <>
        <Button style={{ background: this.props.configuracion.botones, fontSize: "14px", textTransform: "none" }} variant="contained" startIcon={<AddIcon />} className="btn btn-dark" onClick={this.toggle}>Registrar modulo</Button>
        <Modal isOpen={this.state.modal}
          toggle={this.toggle}
          style={{ width: "400px" }}
        >
          <ModalHeader toggle={this.toggle} style={{ height: "50px", width: "400px" }} className="center">Registrar modulo</ModalHeader>
          <ModalBody>
            <div style={{ padding: "30px 30px 30px 77px" }}>
              <img src={Defecto} alt="preview"
                className="preview-image"
                style={{ height: "200px", width: "200px", borderRadius: "50%", objectFit: "cover" }} />
            </div>
            <form onSubmit={this.props.handleSubmit(this.handleSubmitForm)}>

              <Field
                name="image"
                type="file"
                validate={[
                  this.validateImageWeight,
                  this.validateImageFormat
                ]}
                component={this.renderFileInput}
              />
              <br />
              <div className="row">
                <div className="col-sm-12">
                  <Field name="nombre" validate={[requerido, validacionCuarentaCaracteres]} component={generarInput} label="Nombre" />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-12">
                  <Field name="descripcion" validate={[requerido, validacionDoscientosCaracteres]} component={generarTextArea} label="Descripcion" />
                </div>
              </div>
              <ModalFooter>
                <Button
                  type="submit"
                  startIcon={<SaveAltIcon />}
                  className="btn btn-dark"
                  style={{ background: this.props.configuracion.botones, fontSize: "13px", textTransform: "none" }}
                  variant="contained">
                  Registrar
                </Button>
                <Button
                  startIcon={<CancelIcon />}
                  style={fondoBotonCancelar}
                  className="btn btn-dark"
                  variant="contained"
                  onClick={this.toggle}>
                  Cancelar</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
        <NotificationContainer />
      </>
    );
  }
}


const fondoBotonCancelar = {
  background: "gray",
  fontFamily: "sans-serif",
  fontSize: "13px",
  textTransform: "none"
}


function mapStateToProps(state) {
  return {
    mensaje: state.mod.mensajeRegistrarModulo,
    configuracion: state.conf.configuracion

  }
}


let formularioModulo = reduxForm({
  form: "formularioModulo"
})(PopUpModulo);

export default withRouter(connect(mapStateToProps, { actionAgregarModulo ,actualizarMensajeRegistrar})(formularioModulo));
