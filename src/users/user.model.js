import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  correo: {
    type: String,
    required: [true, "Email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

UserSchema.methods.toJSON = function(){
  const { __v, password, _id, ...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
}

export default mongoose.model('User', UserSchema);