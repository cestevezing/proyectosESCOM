import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { getListProcesses } from '../../../../redux/actions/processA.js';
import { editCondition } from '../../../../redux/actions/conditionA.js';
import { withRouter } from 'react-router-dom';

class Edit extends Component {

    componentWillMount() {
        this.props.getListProcesses(localStorage.getItem('Token'), sessionStorage.getItem('documentId'))
    }

    handleSubmit = formValues => {
        let dateS = new Date(formValues.startDate);
        let dateF = new Date(formValues.finalDate);
        console.log(formValues);
        let conditionN = {
            id: this.props.condition.id,
            number: formValues.number,
            name: formValues.name,
            description: formValues.description,
            state: 1,            
            startDate: dateS,
            finalDate: dateF,
            process: formValues.process,
            requestData: null
        }
        console.log(conditionN);
        this.props.editCondition(localStorage.getItem('Token'), conditionN);
    }

    loadList() {
        return this.props.processes.map((process) => {
            return (
                <option value={process.id}>{process.name}</option>
            )
        })
    }

    render() {
        return (
            <div>
                <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Editar condicion</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="form_control_1">Numero condicion: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="number" component={generarInput} label="Numero" />
                                        </div>
                                    </div>
                                    <br />
                                    <label for="form_control_1">Nombre: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="name" component={generarInput} label="Nombre" />
                                        </div>
                                    </div>
                                    <br />
                                    <label for="form_control_1">Descripcion: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="description" component={generarInput} label="Descripcion" />
                                        </div>
                                    </div>
                                    <br />
                                    <label for="form_control_1">Fecha inicio: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="startDate" type="date" component={generarInput} />
                                        </div>
                                    </div>
                                    <br />
                                    <label for="form_control_1">Fecha final: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="finalDate" type="date" component={generarInput} />
                                        </div>
                                    </div>
                                    <br />
                                    <label for="form_control_1">Proceso: </label>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <Field name="process" className="bs-select form-control" component={generarSelect}>
                                                <option selected value="0">Seleccione...</option>
                                                {this.loadList()}
                                            </Field>
                                        </div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
        processes: state.process.listProcessR,
        condition: state.condition.conditionR,
        initialValues: {
            number: state.condition.conditionR.number,
            name: state.condition.conditionR.name,
            description: state.condition.conditionR.description,
            process: state.condition.conditionR.process,            
            startDate: state.condition.conditionR.startDate,
            finalDate: state.condition.conditionR.finalDate
        }
    }

}

let formEdit = reduxForm({
    form: 'editCondition',
    enableReinitialize: true
})(Edit)

export default withRouter(connect(mapStateToProps, { getListProcesses, editCondition })(formEdit));