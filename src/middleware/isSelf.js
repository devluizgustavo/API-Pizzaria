// middleware/isSelf.js
import jwt from 'jsonwebtoken';
//import UserModel from '../models/UserModel';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Caso o authorization não for preenchido
    if (!authorization) return res.status(400).json({ errors: ["Você precisa fazer login."] });

    // Extrair o token do cabeçalho Authorization
    const [, token] = authorization.split(" ");

    if (!token) {
      return res.status(401).json({ message: "Token não encontrado" });
    }

    // Decodificar o token JWT
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Verificar se o ID do usuário logado corresponde ao ID do usuário na URL
    const userIdFromToken = decoded.id;
    const userIdFromParams = req.params.id;

    console.log(userIdFromParams, userIdFromToken);

    if (userIdFromToken !== Number(userIdFromParams)) {
      return res.status(403).json({ message: "Você não tem permissão para acessar os dados de outro usuário" });
    }

    // Se o ID corresponder, permitir o acesso à rota
    return next();

  } catch (error) {
    return res.status(500).json({ message: "Erro ao verificar permissão", error });
  }
}
