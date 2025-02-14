import jwt from 'jsonwebtoken';
import userIdFromParams from '../models/User';

export default async (req, res, next) => {
  // Pegar o Authorization do Header
  const { authorization } = req.headers;

  // Caso o authorization não for preenchido
  if (!authorization) return res.status(400).json({ errors: ["Você precisa fazer login."] });

  // Caso seja enviado, precisamos fazer a verificação desse Token
  // Extrair SOMENTE o token, e ignorar a primeira parte com desestruturação
  const [, token] = authorization.split(" ");

  // BLOCO TRY/CATCH
  try {
    // Fazer a verificação
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    // Extrair os dados que foram salvos
    const { id, login } = dados;

    // Encontrar o usuário
    const user = await userIdFromParams.findOne({
      where: {
        id, login
      }
    });

    if (!user) {
      return res.status(401).json({ errors: ["O usuário não existe."] })
    }

    // Atribuir o ID do usuário na requisição e o login
    req.id_user = id;
    req.login = login;

    return next();
  } catch(e) {
    return res.status(401).json({
      errors: ["Token expirado ou inválido."],
    });
  }
}
