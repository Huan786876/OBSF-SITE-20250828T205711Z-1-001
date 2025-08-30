const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Páginas GET
router.get('/', (req, res) => res.render('pages/index'));
router.get('/login', (req, res) => res.render('pages/login'));
router.get('/cadastro', (req, res) => res.render('pages/cadastro'));
router.get('/redefinir', (req, res) => res.render('pages/redefinir')); // <- aqui
router.get('/como-ajudar', (req, res) => res.render('pages/como-ajudar'));
router.get('/sobre', (req, res) => res.render('pages/sobre'));
router.get('/contato', (req, res) => res.render('pages/contato'));
router.get('/projetos', (req, res) => res.render('pages/projetos'));

// POST login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  // Aqui você pode validar usuário fixo
  if (email === 'admin@obsf.com' && senha === '123456') {
    res.render('pages/login', { sucesso: 'Login realizado!', erros: [] });
  } else {
    res.render('pages/login', { erros: [{ msg: 'Email ou senha incorretos' }], email });
  }
});

// POST cadastro
router.post('/cadastro',
  [
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('confirmar-senha').custom((value, { req }) => {
      if (value !== req.body.senha) throw new Error('As senhas não coincidem');
      return true;
    }),
    body('termos').notEmpty().withMessage('Aceite os termos')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('pages/cadastro', {
        erros: errors.array(),
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone
      });
    }
    res.render('pages/cadastro', { sucesso: 'Cadastro realizado com sucesso!', erros: [], nome: '', email: '', telefone: '' });
  }
);

// POST redefinir senha
router.post('/redefinir', 
  body('email').notEmpty().withMessage('O email é obrigatório').isEmail().withMessage('Email inválido'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('pages/redefinir', { erros: errors.array(), email: req.body.email });
    }
    res.render('pages/redefinir', { sucesso: 'Instruções enviadas para seu email!', erros: [], email: '' });
  }
);

module.exports = router;
