import config from '../../config.js';

export default async function(req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    
    try {
        const r = await fetch(
            `https://api.github.com/repos/${config.OWNER}/${config.REPO}/contents/audios`,
            {
                headers: {
                    Authorization: `Bearer ${config.TOKEN}`
                }
            }
        );
        
        const files = await r.json();
        res.json(
            (Array.isArray(files) ? files : []).map(f => ({
                name: f.name,
                download_url: `/api/audio/${f.name}`,
                size: f.size
            }))
        );
    } 
    catch {
        res.json([]);
    }
}