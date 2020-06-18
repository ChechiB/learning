const repo_base = require('../repository/base_repo')

const getLastId = async(key) => {
    return await repo_base.getLastId(key)
}
const setLastId = async(key)=>{
    return await repo_base.setLastId(key)
}

const saveHash= async(hash,key)=>{
    await repo_base.saveHash(hash,key)
}

const getByHash = async(hash)=>{
    return await repo_base.findByHash(hash)
}

module.exports = {
    getLastId,
    setLastId,
    saveHash,
    getByHash
}