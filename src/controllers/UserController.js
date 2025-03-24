import User from "../models/User";

class UserController {
  async index(req, res){
    try {
      // Procurar todos os usuários
      const users = await User.findAll({ attributes: ["id", "nome", "login"] });

      if (!users) {
        return res.status(400).json({ errors: ["Nenhum usuário foi encontrado."] })
      }

      return res.status(200).json(users);
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async show(req, res){
    const { id } = req.params;

    try {
      const user = await User.findByPk(id, { attributes: ["id", "nome", "login"] });

      if (!user) {
        return res.status(400).json({ errors: ["O usuário não existe."] })
      }

      return res.status(200).json(user);
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async store(req, res){
    const { nome="", login="", password="" } = req.body

    try {
      if (!nome || !login || !password) {
        return res.status(400).json({ errors: ["Campos nome, login e senha são obrigatórios."] });
      }

      await User.create({ nome, login, password });

      return res.status(200).json({ msg: "Usuário criado com sucesso" });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async update(req, res){
    const { id } = req.params;
    const { nome, login } = req.body;

    try {
      const user = await User.findByPk(id, { attributes: ["id", "nome", "login"] });

      if (!user) {
        return res.status(404).json({ msg: ["O cliente não existe."] });
      }

      await user.update({ nome, login });

      return res.status(200).json({ msg: "Dados Atualizados com Sucesso." });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async delete(req, res){
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ msg: ["O usuário não existe."] });
      }

      await user.destroy();

      return res.status(200).json({ msg: "Usuário apagado com sucesso." });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }
}

export default new UserController();
