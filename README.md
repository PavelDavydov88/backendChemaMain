<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Архив с изображениями

Скачать архив с изображениями для приложения и распаковать в корень проекта 
- url .rar:  ...

## Запуск docker-compose.yml

Запустить docker-compose.yml расположенный в корне проекта

docker-compose up

## Архив БД 

Скачать архив с БД приложения и распаковать в папку 
- “C:\...\store”  

Команда, чтобы загрузить базу к котейнер БД Postgres:
- docker exec -i postgres psql -U postgres -d dbkinopoisk < “C:\...\store\backup.sql”

## Swagger приложения:  
 
http://localhost:4000/api/docs
