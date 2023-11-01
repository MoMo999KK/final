export class AuthRequiredError extends Error{
    constructor(messsage="auth is required sorry"){
        super(messsage)
        this.name="AuthRequired"
    }

}