# WEB-MESSENGER

#### Учебный проект на курсе "Мидл-фронтенд разработчик" от [Яндекс Практикум](https://practicum.yandex.ru/)

Мессенджер развёрнут на [render.com](https://ya-practicum-messenger.onrender.com) и [netlify.com](https://bespoke-bublanina-b5b75f.netlify.app/)

[![Render](https://img.shields.io/badge/Render-FE3B7.svg?style=for-the-badge&logo=render&logoColor=white)](https://ya-practicum-messenger.onrender.com)
[![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)](https://bespoke-bublanina-b5b75f.netlify.app/)

##### Тестовые данные:
login - catalina\
password - Catalina1

## Scripts

Установка зависимостей

```sh
npm install
```

Development mode

```sh
npm run dev
```

Production mode

```sh
npm run build
```

Сборка проекта и запуск express сервера

```sh
npm run start
```

Запуск тестов

```sh
npm test
```

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Handlebars](https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Stylelint](https://img.shields.io/badge/stylelint-000?style=for-the-badge&logo=stylelint&logoColor=white)
![Render](https://img.shields.io/badge/Render-FE3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## UI

Макет доступен на [figma.com](https://www.figma.com/file/wBn4tYdbnqToVmPdZaglt9/Веб-мессенджер?node-id=0:1&t=B58JbepFsYhzbpiG-1)

[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/wBn4tYdbnqToVmPdZaglt9/Веб-мессенджер?node-id=0:1&t=B58JbepFsYhzbpiG-1)

## За 4 спринта реализовано:

- Вёрстка по макету следующих страниц:
	* авторизация;
	* регистрация;
	* профиль;
	* чаты: список чатов и окно для активного чата;
	* страницы ошибок 404 и 500;
- Приложение разбито на независимые компоненты с помощью шаблонизатора, EventBus и Proxy-объекты.
- Роутинг. Для написания роутера использовался паттерн «Синглтон».
- API для связи с сервером: авторизация, регистрация, редактирование данных юзера (в т.ч. изменение аватара), работа с чатами.
- Подключен WebSocket для работы с real-time сообщениями.
- Единый механизм валидации полей всех форм.
- Глобальное состояние приложения - store. Компоненты обёрнуты в HOC и обновляются при изменении используемых данных в store.
- Написан собственный аналог fetch через XMLHttpRequest для запросов на сервер.
- Применены статические анализаторы кода: eslint + prettier, stylelint, prettier.
- Настройка сборки проекта: Webpack, Docker, Handlebars, NodeJS + Express.
- Используется Husky для запуска линтеров и тестов перед коммитом.

### Планируется реализовать:
- адаптировать вёрстку под мобильные устройства;
- реализовать поиск по чатам;
- добавить возможность изменения аватара чата;
- добавить возможность прикрепления к сообщениям файлов и изображений;
