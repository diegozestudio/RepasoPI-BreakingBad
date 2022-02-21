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
      attributes: ["name"],
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

module.exports = router;
