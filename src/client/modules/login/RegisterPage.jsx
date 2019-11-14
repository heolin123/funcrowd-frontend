import React from "react"
import UserRepository from "../../logic/repositories/UserRepository";
import Loading from "../../components/Loading";
import { Link } from 'react-router-dom';
import CheckboxElement from "../items/components/element/CheckboxElement";
import {Footer} from "../../Footer";
import ActivationEmailSentPanel from "./ActivationEmailSentPanel";

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
            password1: "",
            password2: "",
            acceptTerms: false,
            error: false,
            loading: false,
            activationEmailPanel: false
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.login.length > 0 &&
            this.state.password1.length > 0 &&
            this.state.password2.length > 0 &&
            this.state.email.length > 0 &&
            this.state.acceptTerms == 'true';
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

        let username = this.state.login;
        let email = this.state.email;
        let password1 = this.state.password1;
        let password2 = this.state.password2;

        this.setState({loading: true});
        UserRepository.register(username, email, password1, password2)
            .then(() => {
                this.setState({
                    activationEmailPanel: true,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error.response.data['detail']
                });
            });
    }

    render() {
        if (this.state.loading)
            return <Loading/>;

        if (this.state.activationEmailPanel)
            return <ActivationEmailSentPanel/>;

        let errorMessage = null;
        if (this.state.error) {
            console.log(this.state.error);
            let errorText = "Rejestracja nie powiodła się";
            if (this.state.error === "Username is already used")
                errorText = "Ta nazwa użytkownika jest już użyta";
            else if (this.state.error === "Email is already used")
                errorText = "Ten adres e-mail jest już użyty";
            else if (this.state.error === "Passwords does not match")
                errorText = "Podane hasła nie pasują";

            errorMessage = (
                <div className="form-group">
                    <div className="text-center small login-error-message">
                        {errorText}
                    </div>
                </div>
            );
        }

        return (
            <div className="container-fluid base-row">
                <div className="container">
                    <div className="row">
                        <div className="login-window col-md-6 card-3-static">
                            <h3 className="text-center login-header">
                                Rejestracja
                            </h3>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input id="login"
                                           type="login"
                                           className="login-input form-control"
                                           value={this.state.username}
                                           onChange={this.handleChange}
                                           placeholder="Nazwa użytkownika"/>
                                </div>
                                <div className="form-group">
                                    <input id="email"
                                           type="email"
                                           className="login-input form-control"
                                           value={this.state.email}
                                           onChange={this.handleChange}
                                           placeholder="Adres e-mail"/>
                                </div>
                                <div className="form-group">
                                    <input id="password1"
                                           type="password"
                                           className="login-input form-control"
                                           value={this.state.password1}
                                           onChange={this.handleChange}
                                           placeholder="Hasło"/>
                                </div>
                                <div className="form-group">
                                    <input id="password2"
                                           type="password"
                                           className="login-input form-control"
                                           value={this.state.password2}
                                           onChange={this.handleChange}
                                           placeholder="Powtórz hasło"/>
                                </div>
                                <div className="form-group very-little">
                                    <CheckboxElement className="login-checkbox"
                                                     labelClassName="register-checkbox-label"
                                                     key={'acceptTerms'}
                                                     name={'acceptTerms'}
                                                     value={this.state.acceptTerms}
                                                     onChange={this.handleCheckboxChange}
                                                     label="Wyrażam zgodę na przetwarzanie moich danych osobowych przez administratora danych FunCrowd w celu wzięcia udziału w kursie nauki programu Excel. Podaję dane osobowe dobrowolnie i oświadczam, że są one zgodne z prawdą. Zapoznałem/łam się z Regulaminem strony oraz Polityką Prywatności serwisu, w tym z informacją o celu i sposobach przetwarzania danych osobowych oraz prawie dostępu do treści swoich danych i prawie ich poprawiania lub usunięcia."
                                    />
                                </div>
                                {errorMessage}
                                <button type="submit"
                                     disabled={!this.validateForm()}
                                     className="btn btn-orange-primary login-button">Załóż konto</button>
                            </form>
                            <div className="text-center small login-link">
                                Masz już konto? <Link to="/">Zaloguj się</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
