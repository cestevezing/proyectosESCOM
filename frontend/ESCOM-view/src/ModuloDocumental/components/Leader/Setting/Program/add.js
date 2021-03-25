import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { addProgram } from '../../../../redux/actions/programA.js';

class Add extends Component {

    handleSubmit = formValues => {
        let programN = {
            id: 0,
            name: formValues.name,
            levelEducation: formValues.levelEducation,
            institution: formValues.institution,
            academicCredits: formValues.academicCredits,
            duration: formValues.duration,
            methodology: formValues.methodology,
            requestData: null
        }
        this.props.addProgram(localStorage.getItem('Token'), programN);
        formValues.name = '';
        formValues.levelEducation = '';
        formValues.institution = '';
        formValues.academicCredits = '';
        formValues.duration = '';
        formValues.methodology = '';

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
                                    <h5 class="modal-title" id="exampleModalLabel">NUEVO PROGRAMA</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="form_control_1">Institución: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="institution" component={generarInput} label="Institución" />
                                        </div>
                                    </div>
                                    <label for="form_control_1">Denominación del programa: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="name" component={generarInput} label="Denominación del programa" />
                                        </div>
                                    </div>
                                    <label for="form_control_1">Nivel de formación: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="levelEducation" component={generarInput} label="Nivel de formación" />
                                        </div>
                                    </div>
                                    <label for="form_control_1">Motodología: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="methodology" component={generarInput} label="Motodología" />
                                        </div>
                                    </div>
                                    <label for="form_control_1">Créditos académicos: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="academicCredits" type="number" component={generarInput} label="Créditos académicos" />
                                        </div>
                                    </div>
                                    <label for="form_control_1">Duración semestres: </label>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <Field name="duration" type="number" component={generarInput} label="Duración semestres" />
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

    }
}

let formAdd = reduxForm({
    form: 'addProgram',
    enableReinitialize: true
})(Add)

export default withRouter(connect(mapStateToProps, { addProgram })(formAdd));