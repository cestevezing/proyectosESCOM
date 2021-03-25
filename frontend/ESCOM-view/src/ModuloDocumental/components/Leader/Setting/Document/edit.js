import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getListPrograms } from '../../../../redux/actions/programA.js';
import { editDocument } from '../../../../redux/actions/documentA.js';

class Edit extends Component {

    componentWillMount() {
        this.props.getListPrograms(localStorage.getItem('Token'))
    }

    handleSubmit = formValues => {
        let documentE = {
            id: this.props.document.id,
            description: formValues.description,
            idUser: formValues.idUser,
            state: this.props.document.state,
            program: formValues.program,
            type: formValues.type,
            requestData: null
        }
        this.props.editDocument(localStorage.getItem('Token'), documentE);
        this.props.history.push("/ListDocument");
    }

    loadProgram() {
        return this.props.listProgram.map((program) => {
            return (
                <option value={program.id}>{program.name}</option>
            )
        })
    }

    loadUser() {
        return (
            <option value="1">Cristian Estevez</option>
        )
    }

    render() {
        return (
            <div >
                <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                                <div class="modal-header">
                                    <h4 class="modal-title" id="exampleModalLabel">NUEVO DOCUMENTO</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="form_control_1">Programa academico: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="program" className="bs-select form-control" component="select">
                                                <option selected value="0">Seleccione...</option>
                                                {this.loadProgram()}
                                            </Field>
                                        </div>
                                    </div>
                                    <br />

                                    <label for="form_control_1">Descripción: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="description" component={generarInput} label="Denominación del programa" />
                                        </div>
                                    </div>
                                    <br />

                                    <label for="form_control_1">Usuario encargado: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="idUser" className="bs-select form-control" component="select">
                                                <option selected value="0">Seleccione...</option>
                                                {this.loadUser()}
                                            </Field>
                                        </div>
                                    </div>
                                    <br />

                                    <label for="form_control_1">Tipo Documento: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="type" component={generarInput} label="Denominación del programa" />
                                        </div>

                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-default naranja">Guardar</button>

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
        listProgram: state.program.listProgramR,
        document: state.document.documentR,
        initialValues: {
            description: state.document.documentR.description,
            idUser: state.document.documentR.idUser,
            program: state.document.documentR.program,
            type: state.document.documentR.type
        }
    }
}

let formEdit = reduxForm({
    form: 'editDocument', 
    enableReinitialize: true
})(Edit)

export default withRouter(connect(mapStateToProps, { getListPrograms,editDocument })(formEdit));