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
        res.json({
            total: Array.isArray(files) ? files.length : 0
        });
    } 
    catch {
        res.json({ total: 0 });
    }
}