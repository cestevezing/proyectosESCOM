import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { editActivity } from '../../../../redux/actions/activityA.js';
import { withRouter } from 'react-router-dom';

class Edit extends Component {   
    
    handleSubmit = formValues => {
        let activityE = {
            id: this.props.activity.id,
            name: formValues.name,
            description: formValues.description,
            information: '',
            state: this.props.activity.state,
            idCondition: sessionStorage.getItem('condition'),
            type: formValues.type,
            requestData: null
        }
        this.props.editActivity(localStorage.getItem('Token'),activityE);
    }

    render() {
        return (
            <div>                
                <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <form className="form-horizontal container" onSubmit={this.props.handleSubmit(this.handleSubmit)}>

                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Editar Actividad</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="form_control_1">Nombre: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="name" type="text" component={generarInput} label="Nombre" />
                                        </div>
                                    </div>
                                    <br />
                                    <label for="form_control_1">Descripcion: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="description" type="text" component={generarInput} label="Descripcion" />
                                        </div>
                                    </div>
                                    <br />
                                    <label for="form_control_1">Tipo actividad: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="type" className="bs-select form-control" component={generarSelect}>
                                                <option value="0">Seleccione...</option>
                                                <option value="1">Informativa</option>
                                                <option value="2">Anexo</option>
                                            </Field>
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

const generarSelect = ({ input, label, type, meta: { touched, error }, children }) => (
    <div>
        <div>
            <select {...input} className="form-control letra" style={{ height: "35px", fontSize: "13px" }}>
                {children}
            </select>
            {touched && ((error && <span className="text-danger letra form-group">{error}</span>))}
        </div>
    </div>
)

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
        activity: state.activity.activityR,
        initialValues: {
            name: state.activity.activityR.name,
            description: state.activity.activityR.description,
            type: state.activity.activityR.type
        },
        messageR: state.activity.messageEdit
    }
}

let formEdit = reduxForm({
    form: 'editActivity',
    enableReinitialize: true
})(Edit)

export default withRouter(connect(mapStateToProps, { editActivity })(formEdit));