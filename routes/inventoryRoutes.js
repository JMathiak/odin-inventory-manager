const { Router } = require('express')
const invDBController = require("../controllers/inventoryDBController.js")
const {body, validationResult } = require('express-validator')
const invRouter = Router()
let servers = ["Kronos", "Hyperion", "Bera", "Scania", "Aurora", "Elysium"]
const lengthErr = "must be between 4 and 15 characters"
const numericErr = 'must be a number'
const levelRangeErr = 'must be between 1 and 300 (inclusive)'
const bigIntErr = 'must be between 0 and 2,147,483,647'
invRouter.get("/", invDBController.getHome)
invRouter.get("/players", invDBController.getPlayersAndServers)
// invRouter.get("/characters",)
invRouter.get("/createPlayer", (req, res)=>{
    res.render("playerForm", {serverArr: servers})
})
invRouter.post("/createPlayer", invDBController.createPlayer)
invRouter.get("/createCharacter/selectPlayer", invDBController.getPlayers)
invRouter.get("/:playerName/createCharacter", invDBController.postCharacterForm)
invRouter.post("/createCharacter", body('charName').trim()
.isLength({min: 4, max: 15}).withMessage(`Character name ${lengthErr}`),
body('level').trim()
.isNumeric().withMessage(`Character level ${numericErr}`)
.isInt({min: 1, max: 300}).withMessage(`Character level ${levelRangeErr}`),
body('combatPower').trim()
.isNumeric().withMessage(`Combat power ${numericErr}`)
.isInt({min: 0, max: 2147483647 }).withMessage(`Combat power ${bigIntErr}`) ,invDBController.createCharacter)
// invRouter.get("/:playerName/edit",)
// invRouter.post("/:playerName/edit",)
// invRouter.get("/:playerName/delete",)
// invRouter.get("/:playerName/:characterName/edit",)
// invRouter.post("/:playerName/:characterName/edit",)
// invRouter.get("/:playerName/:characterName/delete",)
// invRouter.get("/search",)




module.exports = invRouter;