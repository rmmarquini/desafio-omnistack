const crypto = require('crypto');
const conn = require('../database/connection');

module.exports = {
    // Passamos os métodos 'async' e ' await', pois uma transação de bando é assíncrona e desejamos que nossa api aguarde o sucesso do cadastro
    // Lista as ONGs cadastradas
    async index(req, res) {
        const ongs = await conn('ongs').select('*');
        return res.json(ongs);
    },
    
    // Cadastra uma nova ONG
    async create(req, res) {
        // Fixa-se os campos da tabela para evitar que dados indesejados sejam recebidos
        // Para isso utiliza-se a desestruturação
        const { name, email, whatsapp, city, uf } = req.body;
        // Como estamos gerando um ID ũnico para cada ONG, utilizamos a biblioteca 'crypto' do nodejs
        const id = crypto.randomBytes(4).toString('HEX');
        await conn('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return res.json({ id });
    }
}