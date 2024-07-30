export default function handler(req,res) {
    require('dotenv').config();
    let app_name = process.env.APP_NAME;
    let version = process.env.APP_VERSION;
    return res.status(200).json({ app: app_name , version: version });
    
    
}