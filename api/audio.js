import config from '../../config.js';

export default async function(req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    
    const { name } = req.query;
    
    try {
        const r = await fetch(
            `https://raw.githubusercontent.com/${config.OWNER}/${config.REPO}/main/audios/${name}`
        );
        
        if (!r.ok) return res.status(404).end();
        
        res.setHeader('Content-Type', 'audio/webm');
        r.body.pipe(res);
    } 
    catch {
        res.status(404).end();
    }
}