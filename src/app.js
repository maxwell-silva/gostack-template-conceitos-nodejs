const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

// {
//   id: 01,
//   title: 'Desafio Node.js',
//   url:  'http://github.com',
//   techs: [
//     "Node.js",
//     "ReactJS"
//   ],
//   likes: 0
// }

const repositories = [
];

function validateRepositoryId(request, response, next){
  const { id } = request.params;
  const idExists = repositories.find(repository=>repository.id===id);

  //função uid estava retornando como verdadeiro quando o repositório não existia, mas era
  //um uuid valido
  if(!idExists){
    return response.status(400).json({error: "Repository doesn't exist"})
  }
  return next();
}

app.use("/repositories/:id", validateRepositoryId)

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  repository = {
    id: uuid(),
    title,
    url,
    techs,
    like: 0
  };

  repositories.push(repository);

  response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body

  const repository = repositories.find(repository => repository.id === id)
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  const repositoryUpdate = {
    ...repository,
    title,
    url,
    techs
  }
  repositories[repositoryIndex] = repositoryUpdate;
  response.json(repositoryUpdate)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id)
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  const repositoryUpdate = {
    ...repository,
    like: repository.like +1, 
  }
  repositories[repositoryIndex] = repositoryUpdate;
  response.json({message: "teste Like"})
});

module.exports = app;
