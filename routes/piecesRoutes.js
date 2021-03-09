const express = require("express");
const router = express.Router();

const { addNewPiece, getAllPieces, addPieceToStory, getID } = require("../lib/queries");

//SUBMIT A PIECE TO STORY AS PENDING
router.post("/", (req, res) => {
  console.log("POST Request: ", req.body);
  addNewPiece(req.body)
    .then((piece) => {
      res.json(piece);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//GET PIECES FOR SPECIFIC STORY
router.get("/:storyID", (req, res) => {

  getAllPieces(req.params.storyID)
  .then((pieces) => {
    res.json(pieces);
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  });
});


//APPROVE PENDING PIECE AND MERGE INTO STORY

// http://localhost:8080/api/pieces/:storyID

router.post("/:storyID", (req, res) => {
  const storyID = req.params.storyID;
  const pieceID = req.body.pieceID;

  addPieceToStory(storyID, pieceID)
    .then((appendedStory) => {
      res.json(appendedStory);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
})
module.exports = router;
