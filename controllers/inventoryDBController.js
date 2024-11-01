const db = require("../db/queries")

function getHome(req, res){
    res.render('index')
}

async function createPlayer(req, res){
    let username = req.body.username
    let servers  = req.body.server
    for(const server of servers){
        await db.insertPlayer(username, server)
    }
    res.redirect('/')

}


async function getPlayersAndServers(req, res){
    let rows = await db.getPlayers()
    rows.forEach(player => {
        let serverArr = player.servers.split(",")
        console.log(serverArr)
        player.servers = serverArr
    })
    console.log(rows)
    res.render('./players',{
        title: "Player List",
        players: rows,
        route: '/edit',
        routeText: 'Edit Player'
    })
}

async function getPlayers(req, res){
    let rows = await db.getPlayers()
    rows.forEach(player => {
        let serverArr = player.servers.split(",")
        console.log(serverArr)
        player.servers = serverArr
    })
    res.render('players',{
        title: 'Create Char - Player Select',
        players:rows,
        route: "/createCharacter",
        routeText: 'Create Character For'
    })

}


module.exports = {
    getHome,
    createPlayer,
    getPlayersAndServers,
    getPlayers

}