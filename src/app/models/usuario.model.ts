export class Usuario{
  constructor(
    public _id: Number,
    public name: String,
    public email: String,
    public phone_number: String,
    public identification: String,

    public role_id: Number,
    public password: String,
    public password_confirmation: String



  ){}
}
