import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addAnnex } from '../../../../redux/actions/annexA.js';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { required } from '../../../utilitarian/validations.js';
import { ToastContainer, toast } from 'react-toastify';
import { getAnnexVersions, addAnnexVersion } from '../../../../redux/actions/annexVersionA.js';

class AddVersion extends Component {

    componentWillMount() {
        this.props.getAnnexVersions(sessionStorage.getItem('annex'))
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }

    }
    checkMimeType = (event) => {
        let files = event.target.files

        let exte = files[0].name.split('.').pop()
        if (exte !== 'docx' && exte !== 'pdf') {
            toast.error(exte + ' is not a supported format\n')
            event.target.value = null
            return false
        }
        return true;
    }
    maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 1) {
            const msg = 'Only 1 images can be uploaded at a time'
            event.target.value = null
            toast.warn(msg)
            return false;
        }
        return true;
    }
    checkFileSize = (event) => {
        let files = event.target.files
        let size = 50000000
        if (files[0].size > size) {
            toast.error('is too large, please pick a smaller file\n')
            event.target.value = null
            return false
        }
        return true;
    }
    onChangeHandler = event => {
        var files = event.target.files
        if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
            // if return true allow to setState
            this.setState({
                selectedFile: files,
                loaded: 0
            })
        }
    }

    randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }


    handleAdd = formValue => {
        let annexN = {
            id: 0,
            date: new Date(),
            location: '',
            description: formValue.descriptionA,
            state: 1,
            version: 0,
            annex: sessionStorage.getItem('annex'),
            idUser: 1,
            requestData: null
        }
        const data = new FormData()
        data.append('file', this.state.selectedFile[0])
        this.props.addAnnexVersion(data, annexN);
        this.props.showAnnexVersions(sessionStorage.getItem('annex'))
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <button type="button" className="btn text-light btn-sm float-right naranja " data-toggle="modal" data-target="#addModal" >
                    <i class="fas fa-plus"></i> Agregar
                </button>

                {/** modal element add */}
                <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <form name="agregar" className="form-horizontal" onSubmit={this.props.handleSubmit(this.handleAdd)} id="hola">

                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Agregar Annexo</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <label for="form_control_1">Descripcion: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="descriptionA" validate={[required]} component={generarInput} label="Descripcion" />
                                        </div>
                                    </div>
                                    <br />
                                    <label for="form_control_1">Documento: </label>
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <input type="file" class="form-control" multiple onChange={this.onChangeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-default naranja">Agregar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const generarInput = ({ input, placeholder, label, type, meta: { touched, warning, error } }) => (
    <div>
        <div>
            <input {...input} type={type} className="form-control letra form-control-solid placeholder-no-fix" />
            {touched && ((error && <span className="text-danger letra form-group">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

function mapStateToProps(state) {
    return {
        listAnnexVersion: state.annexVersion.listAnnexVersionR,
        annexS: state.annex.annexR
    }
}

let formAdd = reduxForm({
    form: 'addVersion',
    enableReinitialize: true
})(AddVersion)
export default withRouter(connect(mapStateToProps, { addAnnex, getAnnexVersions, addAnnexVersion })(formAdd));