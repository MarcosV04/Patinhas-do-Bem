# Patinhas do Bem

## Sobre o projeto
Vocês explicam sobre o projeto

## Funcionalidades

- Tela de login.
- Tela de cadastro de conta.
- Listagem de animais cadastrados.
- Cadastro de pets com nome, espécie, raça, tamanho e peso.
- Visualização das informações individuais de cada pet.
- Menu lateral de navegação.
- Tela de clínicas veterinárias com dados ilustrativos.
- Tela inicial de localização do pet.
- Interface para futura integração com rastreamento GPS.
- Acesso às seções de cuidados e lojas pet.

Algumas funcionalidades ainda estão em desenvolvimento. A autenticação de usuários, o armazenamento permanente dos dados, o rastreamento GPS, a carteirinha de vacinação e a listagem funcional de pet shops ainda precisam ser implementados.

## Tecnologias utilizadas

- **JavaScript:** linguagem utilizada no desenvolvimento.
- **React:** biblioteca para construção de interfaces.
- **React Native:** desenvolvimento de interfaces para dispositivos móveis.
- **Expo:** ferramentas para desenvolvimento e execução do aplicativo.
- **React Hooks:** gerenciamento de estados e efeitos com `useState`, `useRef` e `useEffect`.
- **Animated:** animações da interface, incluindo o menu lateral.
- **StyleSheet:** definição dos estilos dos componentes.
- **Git:** controle de versão do código.
- **GitHub:** hospedagem do repositório.

## Requisitos

Para executar o projeto, é necessário instalar:

1. **Node.js (versão LTS):** https://nodejs.org/
2. **Git:** https://git-scm.com/downloads
3. **Visual Studio Code:** https://code.visualstudio.com/
4. **Expo Go:** https://expo.dev/go

Também é possível executar o projeto em um emulador Android configurado no computador.

## Como baixar o projeto

Abra um terminal e execute:

```bash
git clone https://github.com/MarcosV04/Patinhas-do-Bem.git
```

Entre na pasta do projeto:

```bash
cd Patinhas-do-Bem
```

## Como instalar as dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

Esse comando instala as dependências definidas no arquivo `package.json`.

## Como executar o aplicativo

Após instalar as dependências, execute:

```bash
npx expo start
```

O Expo iniciará o servidor de desenvolvimento e exibirá um QR Code no terminal.

### Executar em um celular

1. Instale o Expo Go em um celular compatível.
2. Conecte o celular e o computador à mesma rede Wi-Fi.
3. Execute `npx expo start` no computador.
4. Escaneie o QR Code usando o método indicado pelo Expo Go.
5. Aguarde o carregamento do aplicativo.

Se a conexão local não funcionar, tente:

```bash
npx expo start --tunnel
```

A conexão por túnel pode ser mais lenta.

### Executar em um emulador Android

1. Instale e configure o Android Studio.
2. Crie e inicie um emulador Android.
3. Execute `npx expo start` na pasta do projeto.
4. Pressione `a` no terminal do Expo para tentar abrir o aplicativo no emulador.

## Estrutura do projeto

A estrutura principal esperada é semelhante a esta:

```text
Patinhas-do-Bem/
├── App.js
├── app.json
├── package.json
├── package-lock.json
├── assets/
│   ├── logo.png
│   ├── voltar.png
│   ├── ponto.png
│   ├── cadastra.png
│   ├── mel.jpeg
│   └── nina.jpeg
└── README.md
```

A estrutura exata pode variar conforme a configuração do projeto.

### Principais arquivos

- `App.js`: contém as telas, os estados, as funções e os estilos do aplicativo.
- `assets/`: armazena as imagens utilizadas na interface.
- `package.json`: registra as dependências e os comandos do projeto.
- `package-lock.json`: registra as versões resolvidas das dependências instaladas pelo npm.
- `app.json`: contém configurações do aplicativo Expo.
- `README.md`: apresenta o projeto e explica como instalá-lo e executá-lo.

Os nomes e as extensões dos arquivos de imagem devem corresponder exatamente aos utilizados no código. Não remova nem renomeie arquivos da pasta `assets` sem atualizar suas referências no `App.js`.

## Como atualizar o projeto

Se o repositório já estiver clonado no computador, entre na pasta do projeto e execute:

```bash
git pull
npm install
npx expo start
```

O comando `git pull` busca as alterações publicadas no repositório. O comando `npm install` instala ou atualiza as dependências conforme os arquivos de configuração.

## Solução de problemas

### O comando npm não funciona

Verifique se o Node.js foi instalado corretamente:

```bash
node -v
npm -v
```

Se os comandos não forem reconhecidos, confira a instalação e reinicie o terminal.

### O aplicativo não encontra uma imagem

Confira se o arquivo existe na pasta `assets/` e se o nome e a extensão correspondem exatamente ao que aparece no código.

### O aplicativo não inicia

Confirme que o terminal está na pasta correta do projeto e execute:

```bash
npm install
npx expo start
```

Se o problema continuar, verifique a mensagem de erro exibida no terminal.

### O celular não consegue conectar

Confira se o servidor Expo está ativo e se o celular e o computador estão na mesma rede Wi-Fi. Se necessário, tente iniciar o servidor com `npx expo start --tunnel`.

## Desenvolvimento

Projeto em desenvolvimento.
