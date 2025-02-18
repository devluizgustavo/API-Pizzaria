import User from "../models/User";

class UserController {
  async index(req, res){
    try {
      // Procurar todos os usuários
      const users = await User.findAll({
        attributes: ["id", "nome", "login"]
      });

      if (!users) {
        return res.status(400).json({
          errors: ["Nenhum usuário foi encontrado."]
        })
      }

      return res.status(200).json(users);
    } catch(e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }

  async show(req, res){
    try {
      // Pegar o ID vindo da requisição
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: ["id", "nome", "login"]
      });

      if (!user) {
        return res.status(400).json({
          errors: ["O usuário não existe"]
        })
      }

      return res.status(200).json(user);
    } catch(e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }

  async store(req, res){
    try {
      const user = await User.create(req.body);

      const { nome, login, password } = user;


      return res.status(200).json({
        msg: {
          message: "Usuário criado com sucesso"
        },
        nome: nome,
        login: login,
        password: password
      })
    } catch(e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }

  async update(req, res){
    try {
      const { id } = req.params;
      const { nome, login } = req.body;

      const user = await User.findByPk(id, {
        attributes: ["id", "nome", "login"]
      });

      if (!user) {
        return res.status(404).json({
          msg: ["O cliente não existe"]
        });
      }

      const userUpdate = await user.update({ nome, login });

      return res.status(200).json({
        msg: "Dados Atualizados com Sucesso.",
        user: userUpdate
      })
    } catch(e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }

  async delete(req, res){
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          msg: ["O usuário não existe"]
        });
      }

      await user.destroy();

      return res.status(200).json({msg: "Usuário apagado com sucesso."});
    } catch(e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }
}

export default new UserController();
