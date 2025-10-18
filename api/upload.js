import config from '../../config.js';

export default async function(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { base64, name } = req.body;
    
    try {
        const r = await fetch(
            `https://api.github.com/repos/${config.OWNER}/${config.REPO}/contents/audios/${name}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${config.TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Add ${name}`,
                    content: base64,
                    branch: 'main'
                })
            }
        );
        
        res.json({ success: r.ok });
    } 
    catch {
        res.json({ success: false });
    }
}