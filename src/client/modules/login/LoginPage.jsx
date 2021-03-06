import React from "react"
import UserRepository from "../../logic/repositories/UserRepository";
import Loading from "../../components/Loading";
import CheckboxElement from "../items/components/element/CheckboxElement";
import { Link } from 'react-router-dom';
import L from "../../logic/locatization/LocalizationManager";
import urls from "../../Urls"
import {Footer} from "../../Footer";


export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            stayLoggedIn: false,
            error: null,
            loading: false
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleCheckboxChange(event) {
        event.target.value = event.target.checked;
        this.handleChange(event);
    }

    handleSubmit(event) {
        event.preventDefault();

        let email = this.state.email;
        let password = this.state.password;
        let stayLoggedIn = this.state.stayLoggedIn == "true";

        this.setState({loading: true});
        UserRepository.login(email, password)
            .then((user) => {
                this.props.onSuccess(user, stayLoggedIn);
            })
            .catch((error) => {
                console.log(error);
                let responseError = error.response.data['detail'];

                let errorMessage = L.login.unknownError;
                if (responseError === "Authentication credentials were not provided.")
                    errorMessage = L.login.loginIncorrect;

                this.setState({
                    loading: false,
                    error: errorMessage
                });
            });
    }

    render() {
        if (this.state.loading)
            return <Loading/>;

        return (
            <div className="container-fluid base-row">
                <div className="container">
                    <div className="row">
                        <div className="login-window col-lg-6 col-md-10 col-12 card-3-static">
                            <h3 className="text-center login-header">{L.login.loginHeader}</h3>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input id="email"
                                           type="email"
                                           className="login-input form-control"
                                           value={this.state.email}
                                           onChange={this.handleChange}
                                           placeholder={L.login.email}/>
                                </div>
                                <div className="form-group">
                                    <input id="password"
                                           type="password"
                                           className="login-input form-control"
                                           value={this.state.password}
                                           onChange={this.handleChange}
                                           placeholder={L.login.password}/>
                                </div>
                                <div className="from-group little" style={{position: "relative"}}>
                                    <CheckboxElement className="login-checkbox"
                                                     labelClassName="login-checkbox-label"
                                                     name='stayLoggedIn'
                                                     value={this.state.stayLoggedIn}
                                                     onChange={this.handleCheckboxChange}
                                                     label={L.login.rememberMe}/>
                                    <div className="login-reset-password-link login-link">
                                        <Link className="blue-link" to={urls.RESET_PASSWORD}>
                                            {L.login.forgotPassword}
                                        </Link>
                                    </div>
                                </div>
                                <div className="text-center small login-error-message">
                                    {this.state.error}
                                </div>
                                <button type="submit"
                                     disabled={!this.validateForm()}
                                     className="btn btn-orange-primary login-button">{L.login.login}</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
