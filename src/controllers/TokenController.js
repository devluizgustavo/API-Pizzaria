import User from "../models/User";
import jwt from 'jsonwebtoken';

class TokenController {
  async store(req, res) {
    const { login = "", password = "" } = req.body;

    try {
      if (!login && !password) {
        return res.status(400).json({ errors: ["Login e senha precisam ser enviados."] });
      }

      // Procurar usuário pelo login para verificar a existência
      const user = await User.findOne({ where: { login } });

      // Caso usuário não seja encontrado
      if (!user) {
        return res.status(400).json({ errors: ["O usuário não existe."] });
      }

      // Caso a senha esteja incorreta
      if(!(await user.passwordIsValid(password))) {
        return res.status(400).json({errors: ["Senha inválida."]})
      }

      // Se o código chegou nessa região é por que o usuário e senha estão corretos. Então extraimos o id de User
      const { id } = user;

      // Criar Token --->   Resgatar Dados |          Token         |
      const token = jwt.sign({ id, login }, process.env.TOKEN_SECRET, {
        // Tempo de expiração
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({ token });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }
}

export default new TokenController()
