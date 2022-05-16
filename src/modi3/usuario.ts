import {User} from './index';

/**
 * Clase Usuario
 */
export class Usuario {
  constructor() {}

  crearUser(name: string, ap: string, date: number, em: string, pass: string) {
    const user = new User({
      nombre: name,
      apellidos: ap,
      edad: date,
      email: em,
      password: pass,
    });

    user.save().then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  // buscarUser(email: string) {
  //   const filter = email?{email: email}:{};
  //   User.find(filter).then((result) => {
  //     console.log(result);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
}

const u = new Usuario();
u.crearUser('Andrea', 'Hernández', 23, 'andrea@gmail.com', 'Holamundo');
// u.buscarUser('andrea@gmail.com');
