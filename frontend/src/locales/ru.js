const ruTranslation = {
  translation: {
    channels: {
      header: 'Каналы',
      delete: 'Удалить',
      rename: 'Переименовать',
      createChannel: 'Создать канал',
      deleteChannel: 'Удалить канал',
      renameChannel: 'Переименовать канал',
      channelName: 'Имя канала',
      addButton: '+',
      management: 'Управление каналом',
      addChannel: 'Добавить канал',
      latice: ' #',
    },
    messages: {
      send: 'Отправить',
      inputPlaceholder: 'Введите сообщение...',
      newMessage: 'Новое сообщение',
    },

    chat: {
      header: 'Hexlet Chat',
    },

    interfaces: {
      signin: 'Войти',
      logOut: 'Выйти',
      registration: 'Регистрация',
      signup: 'Зарегистрироваться',
      cancel: 'Отменить',
      create: 'Создать',
    },

    warnings: {
      channelExists: 'Такое название канала уже существует!',
      channelDeleted: 'Канал удалён',
      authorizeError: 'Ошибка авторизации',
      unknownError: 'Неизвестная ошибка',
      downloadingError: 'Ошибка соединения',
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelLoading: 'Каналы отсутствуют или загружаются...',
      networkError: 'Проблема с сетью, сообщения не отправляются',
      networkWarning: 'Проблема с сетью, сообщение сохранено и будет отправлено при восстановлении сети',
      sameUser: 'Такой пользователь уже существует',
    },

    validation: {
      wrongLoginPassword: 'Неверные имя пользователя или пароль',
      userExists: 'Пользователь с таким именем уже зарегистрирован',
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
      uniq: 'Должно быть уникальным',
      uniqFailed: 'Это имя канала уже занято',
      reqiured: 'Обязательное поле',
      minPassword: 'Не менее 6 символов',
      passwordSame: 'Пароли должны совпадать',
    },

    info: {
      areYouSure: 'Уверены?',
      pageNotFound: 'Страница не найдена',
      butYouCan: 'Но вы можете перейти',
      toMainPage: 'на главную страницу',
      newMessage: 'Новое сообщение',
      nickname: 'Ваш ник',
      password: 'Ваш пароль',
      noAccount: 'Нет аккаунта?',
      newMessageError: 'Ошибка при отправке сообщения',
      newChannelError: 'Ошибка при создании канала',
      removeChannelError: 'Ошибка при удалении канала',
      renameChannelError: 'Ошибка при переименовании канала',
      username: 'Имя пользователя',
      password2: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
    },

    messagesCounter_one: '{{count}} сообщение',
    messagesCounter_few: '{{count}} сообщения',
    messagesCounter_many: '{{count}} сообщений',
  },

};

export default ruTranslation;
