import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getListPrograms } from '../../../../redux/actions/programA.js';
import { addDocument } from '../../../../redux/actions/documentA.js';

class Add extends Component {

    componentWillMount() {
        this.props.getListPrograms(localStorage.getItem('Token'))
    }


    handleSubmit = formValues => {
        let documentN = {
            id: 0,
            description: formValues.description,
            idUser: formValues.idUser,
            state: 1,
            program: formValues.program,
            type: formValues.type,
            requestData: null
        }
        this.props.addDocument(localStorage.getItem('Token'), documentN);
        formValues.description = '';
        formValues.idUser = '';
        formValues.program = '';
        formValues.type = '';
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
                <button type="button" className="btn text-light btn-sm float-right naranja " data-toggle="modal" data-target="#addModal" >
                    <i class="fas fa-plus"></i> Agregar
                </button>

                <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
        listProgram: state.program.listProgramR
    }
}

let formAdd = reduxForm({
    form: 'addDocument',
    enableReinitialize: true
})(Add)

export default withRouter(connect(mapStateToProps, { getListPrograms, addDocument })(formAdd));