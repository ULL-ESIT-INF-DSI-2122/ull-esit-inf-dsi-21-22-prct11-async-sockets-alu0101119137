import {Document, connect, model, Schema} from 'mongoose';
import validator from 'validator';

/**
 * Conexion a la base de datos
 */
connect('mongodb://127.0.0.1:27017/dsi-assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

/**
 * Interfaz del usuario
 */
interface UserDocumentInterface extends Document {
  nombre: string,
  apellidos: string,
  edad: number,
  email: string,
  password: string
}

/**
 * Esquema del usuario
 */
const UserSchema = new Schema<UserDocumentInterface>({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellidos: {
    type: String,
    required: true,
    trim: true,
  },
  edad: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
    max: 199,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: (value: string) => {
      if (!validator.isEmail(value)) {
        throw new Error('Error. Debe ser un email con el formato: ayuda@help.com');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

/**
 * Modelo del usuario
 */
export const User = model<UserDocumentInterface>('User', UserSchema);


const user = new User({
  nombre: 'Emma',
  apellidos: 'Hernandez',
  edad: 20,
  email: 'andrea@ull.edu.es',
  password: 'Aguacate2',
});

/**
 * Almacenar un usuario
 */
user.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});

/**
 * Buscar un usuario por email
 */
const filter = user.email?{email: user.email}:{};
User.find(filter).then((result) => {
  console.log('Se ha encontrado:');
  console.log(result);
}).catch((error) => {
  console.log(error);
});


/**
 * Actualizar un usuario
 */
// User.findOneAndUpdate({email: user.email}, user, {
//   new: true,
//   runValidators: true,
// }).then((result) => {
//   console.log('Se ha modificado la edad:');
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// });


/**
 * Eliminar un usuario
 */
// User.findOneAndDelete({title: user.email}).then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// });
