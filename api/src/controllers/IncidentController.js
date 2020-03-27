const conn = require('../database/connection');

module.exports = {
    // Listando os casos criados
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await conn('incidents').count();

        console.log(count);

        const incidents = await conn('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset( (page-1) * 5 )
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    // Criando um caso
    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        console.log(ong_id);

        // Como o retorno desse mẽtodo insert será um array de única posição com o valor do 'id' que desejo
        // posso usar a desestruturação para pegar a posição 0 direto com o valor desejado
        const [id] = await conn('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    }, 

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await conn('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }

        await conn('incidents').where('id', id).delete();

        return res.status(204).send();
    }
};