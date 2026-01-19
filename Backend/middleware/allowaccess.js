const allowaccess = (...allowedRoles)=>{
    return (req, res, next)=>{
        
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({error:"Access denied"})
        }
        next();
    }
}

module.exports = allowaccess;