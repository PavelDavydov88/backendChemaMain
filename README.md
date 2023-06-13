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
- url https://disk.yandex.ru/d/FZm3yCqhOWRHBQ

## дамп БД

Запустить контейнер с бд:
- docker-compose up postgres

Команда, чтобы загрузить базу в котейнер БД Postgres:
- docker exec -i postgres pg_restore -U postgres -C -d dbkinopoisk < “C:\..\backendChema-main\dbkinopoisk.sql”

## Запуск docker-compose.yml

Запустить docker-compose.yml расположенный в корне проекта:

- docker-compose up



## Swagger приложения:

http://localhost:4000/api/docs


## Postman Workspace

Ссылка на наше рабочее пространство где все готово для тестов

Если ссылка не работает обратитесь за новой к авторам

https://app.getpostman.com/join-team?invite_code=9c95a03e81e92dc977a14fc0c117b924&target_code=c74233e8e848f9eb42f15d678319a1c8


## АККАУНТ АДМИНИСТРАТОРА
{
"email": "123",
"password": "123"
}
