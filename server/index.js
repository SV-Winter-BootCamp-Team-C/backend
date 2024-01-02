const express = require('express'); // express설치해서 사용가능
const app = express(); // app에 사용할 express함수 불러오기
const port = process.env.NODE_DOCKER_PORT || 8000; // 원하는 포트로(3000,4000,5000)
const YAML = require('js-yaml');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const specs = YAML.load(
  fs.readFileSync('./swagger/swaggerconfig.yaml', 'utf8')
);
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`port 8000 start`);
});
