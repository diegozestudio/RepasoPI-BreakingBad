const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Character, Occupation } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      name: el.name,
      img: el.img,
      nickname: el.nickname,
      status: el.status,
      id: el.char_id,
      occupation: el.occupation.map((el) => el),
      birthday: el.birthday,
      appearance: el.appearance.map((el) => el),
      //appearance: [...el.appearance],
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name", "id"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllCharacters = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/characters", async (req, res) => {
  const name = req.query.name;

  let charactersTotal = await getAllCharacters();

  if (name) {
    let characterName = await charactersTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    characterName.length
      ? res.status(200).send(characterName)
      : res.status(400).send("No esta tu personaje loco");
  } else {
    res.status(200).send(charactersTotal);
  }
});

router.get("/occupations", async (req, res) => {
  const occupationsApi = await axios.get(
    "https://breakingbadapi.com/api/characters"
  );
  const occupation = occupationsApi.data.map((char) => char.occupation);
  const occupationsEach = [...new Set(occupation.flat())];
  occupationsEach.forEach((occupation) => {
    Occupation.findOrCreate({
      where: { name: occupation },
    });
  });
  const allOccupations = await Occupation.findAll();
  res.send(allOccupations);
});
//[]

router.post("/character", async (req, res) => {
  let { name, nickname, birthday, img, status, createdInDb, occupation } =
    req.body;
  let newCharacter = await Character.create({
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb,
  });
  let occupationDb = await Occupation.findAll({
    where: { name: occupation },
  });
  newCharacter.addOccupation(occupationDb);
  res.send("Personaje creado con exito");
});

router.get("/characters/:id", async (req, res) => {
  const { id } = req.params;

  const charactersTotal = await getAllCharacters();

  if (id) {
    let characterFind = await charactersTotal.find(
      (character) => character.id === Number(id)
    );
    characterFind
      ? res.status(200).json(characterFind)
      : res.status(400).json("No encontre el personaje");
  }
});

module.exports = router;
