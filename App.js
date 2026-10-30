
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';

const LARANJA = '#FF7E35';
const PESSEGO = '#F0BFA9';
const BRANCO = '#FFFFFF';
const PRETO = '#242424';

const petsIniciais = [
  { id: '1', nome: 'Mel', especie: 'Cachorro', peso: '20 kg', raca: 'Vira-lata', tamanho: 'Grande' },
  { id: '2', nome: 'Nina', especie: 'Gato', peso: '4 kg', raca: 'Vira-lata', tamanho: 'Pequeno' },
];

function imagemDoPet(pet) {
  if (pet.nome === 'Mel') return require('./assets/mel.jpeg');
  if (pet.nome === 'Nina') return require('./assets/nina.jpeg');
  return null;
}

export default function App() {
  const [tela, setTela] = useState('login');
  const [menuAberto, setMenuAberto] = useState(false);
  const animacaoMenu = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animacaoMenu, {
      toValue: menuAberto ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [menuAberto, animacaoMenu]);

  const [pets, setPets] = useState(petsIniciais);
  const [petEmEdicao, setPetEmEdicao] = useState(null);
  const [petSelecionado, setPetSelecionado] = useState(petsIniciais[0]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomePet, setNomePet] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [peso, setPeso] = useState('');
  const [vacinas, setVacinas] = useState({});
  const [nomeVacina, setNomeVacina] = useState('');
  const [dataAplicacao, setDataAplicacao] = useState('');
  const [proximaDose, setProximaDose] = useState('');

  function botao(texto, acao, estilo = {}) {
    return (
      <Pressable
        onPress={acao}
        style={({ pressed }) => [
          styles.botao,
          estilo,
          pressed && { opacity: 0.75 },
        ]}
      >
        <Text style={styles.textoBotao}>{texto}</Text>
      </Pressable>
    );
  }

  function campo(rotulo, valor, alterar, exemplo, senhaCampo = false) {
    return (
      <View style={styles.grupoCampo}>
        <Text style={styles.rotulo}>{rotulo}</Text>
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={alterar}
          placeholder={exemplo}
          placeholderTextColor="#80685D"
          secureTextEntry={senhaCampo}
        />
      </View>
    );
  }

  function abrirTela(nome) {
    setMenuAberto(false);
    setTela(nome);
  }

  function cabecalho(titulo, voltar = 'inicio') {
    return (
      <View style={styles.cabecalho}>
        <Pressable
          onPress={() => abrirTela(voltar)}
          style={styles.acaoCabecalho}
        >
          <Image
            source={require('./assets/voltar.png')}
            style={styles.voltarImagem}
            resizeMode="contain"
          />
        </Pressable>

        <Text style={styles.tituloCabecalho} numberOfLines={1}>
          {titulo}
        </Text>

        <Pressable
          onPress={() => setMenuAberto(true)}
          style={styles.acaoCabecalho}
        >
          <Image
            source={require('./assets/ponto.png')}
            style={styles.pontoImagem}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    );
  }

  function editarPet(pet) {
    setPetEmEdicao(pet.id);

    setNomePet(pet.nome);
    setEspecie(pet.especie);
    setRaca(pet.raca);
    setTamanho(pet.tamanho);
    setPeso(pet.peso);

    abrirTela('cadastroPet');
  }

  function excluirPet() {
    Alert.alert(
      'Excluir pet',
      `Tem certeza de que deseja excluir ${petSelecionado.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setPets((atuais) =>
              atuais.filter(
                (pet) => pet.id !== petSelecionado.id
              )
            );

            setVacinas((atuais) => {
              const novasVacinas = { ...atuais };
              delete novasVacinas[petSelecionado.id];
              return novasVacinas;
            });

            setPetSelecionado(null);
            abrirTela('inicio');
          },
        },
      ]
    );
  }

  function adicionarPet() {
    if (!nomePet.trim() || !especie.trim()) {
      alert('Informe pelo menos o nome e a espécie do pet.');
      return;
    }

    if (petEmEdicao) {
      const petAtualizado = {
        id: petEmEdicao,
        nome: nomePet.trim(),
        especie: especie.trim(),
        raca: raca.trim() || 'Não informada',
        tamanho: tamanho.trim() || 'Não informado',
        peso: peso.trim() || 'Não informado',
      };

      setPets((atuais) =>
        atuais.map((pet) =>
          pet.id === petEmEdicao ? petAtualizado : pet
        )
      );

      setPetSelecionado(petAtualizado);
      setPetEmEdicao(null);
    } else {
      const novoPet = {
        id: String(Date.now()),
        nome: nomePet.trim(),
        especie: especie.trim(),
        raca: raca.trim() || 'Não informada',
        tamanho: tamanho.trim() || 'Não informado',
        peso: peso.trim() || 'Não informado',
      };

      setPets((atuais) => [...atuais, novoPet]);
      setPetSelecionado(novoPet);
    }

    setNomePet('');
    setEspecie('');
    setRaca('');
    setTamanho('');
    setPeso('');

    abrirTela('inicio');
  }

  function adicionarVacina() {
    if (!nomeVacina.trim() || !dataAplicacao.trim()) {
      alert('Informe o nome da vacina e a data de aplicação.');
      return;
    }

    const novaVacina = {
      id: String(Date.now()),
      nome: nomeVacina.trim(),
      data: dataAplicacao.trim(),
      proximaDose: proximaDose.trim() || 'Não informada',
    };

    setVacinas((atuais) => ({
      ...atuais,
      [petSelecionado.id]: [
        ...(atuais[petSelecionado.id] || []),
        novaVacina,
      ],
    }));

    setNomeVacina('');
    setDataAplicacao('');
    setProximaDose('');
  }

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar backgroundColor={LARANJA} barStyle="light-content" />

      {tela === 'login' && (
        <ScrollView contentContainerStyle={styles.loginFundo}>
          <View style={styles.loginCartao}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logoImagem}
              resizeMode="contain"
            />

            {campo('Login:', email, setEmail, 'Digite seu email ou telefone')}
            {campo('Senha:', senha, setSenha, 'Digite sua senha', true)}

            <Pressable
              onPress={() => alert('A recuperação de senha será implementada depois.')}
            >
              <Text style={styles.linkEsqueci}>
                Esqueceu sua senha? Clique aqui
              </Text>
            </Pressable>

            {botao('Entrar', () => abrirTela('inicio'), styles.botaoPreto)}

            <Pressable onPress={() => abrirTela('cadastroConta')}>
              <Text style={styles.linkCadastro}>
                Ainda não tem uma conta?
                {'\n'}Cadastre-se agora!
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}

      {tela === 'cadastroConta' && (
        <ScrollView contentContainerStyle={styles.loginFundo}>
          <View style={styles.loginCartao}>
            <Text style={styles.tituloLogin}>Crie sua conta</Text>
            {campo('Email:', email, setEmail, 'Digite seu email')}
            {campo('Senha:', senha, setSenha, 'Crie uma senha', true)}
            {botao('Cadastrar', () =>
              alert('O cadastro será conectado ao banco de dados depois.')
            )}
            {botao('Voltar ao login', () => abrirTela('login'), styles.botaoPreto)}
          </View>
        </ScrollView>
      )}

      {tela === 'inicio' && (
        <View style={styles.tela}>
          {/* A tela inicial não tem botão de casinha */}
          <View style={styles.cabecalho}>
            <View style={styles.espacoCabecalho} />

            <Text style={styles.tituloCabecalho} numberOfLines={1}>
              Patinhas do Bem
            </Text>

            <Pressable
              onPress={() => setMenuAberto(true)}
              style={styles.acaoCabecalho}
            >
              <Image
                source={require('./assets/ponto.png')}
                style={styles.pontoImagem}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={styles.listaPets}
            showsVerticalScrollIndicator={false}
          >
            {pets.map((pet) => (
              <Pressable
                key={pet.id}
                style={styles.petCard}
                onPress={() => {
                  setPetSelecionado(pet);
                  abrirTela('pet');
                }}
              >
                <View style={styles.fotoPet}>
                  {imagemDoPet(pet) ? (
                    <Image
                      source={imagemDoPet(pet)}
                      style={styles.fotoPetImagem}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.fotoSemImagem}>
                      <Text style={styles.textoSemImagem}>Foto não cadastrada</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.nomePet}>{pet.nome}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Único botão de cadastro: patinha com sinal de + */}
          <View style={styles.rodape}>
            <Pressable
              onPress={() => abrirTela('cadastroPet')}
              style={styles.botaoAdicionar}
              accessibilityLabel="Cadastrar pet"
            >
              <Image
                  source={require('./assets/cadastra.png')}
                  style={styles.cadastraImagem}
                  resizeMode="contain"
                />
            </Pressable>
          </View>
        </View>
      )}

      {tela === 'cadastroPet' && (
        <View style={styles.tela}>
          {cabecalho('Cadastre seu Pet')}
          <ScrollView contentContainerStyle={styles.formulario}>
            {campo('Nome:', nomePet, setNomePet, 'Digite o nome do seu pet')}
            {campo('Espécie:', especie, setEspecie, 'Cachorro, gato...')}
            {campo('Raça:', raca, setRaca, 'Digite a raça do seu pet')}
            {campo('Tamanho:', tamanho, setTamanho, 'Pequeno, médio ou grande')}
            {campo('Peso:', peso, setPeso, 'Ex.: 5 kg')}
            {botao('Cadastrar', adicionarPet)}
          </ScrollView>
        </View>
      )}

      {tela === 'pet' && petSelecionado && (
        <View style={styles.tela}>
          {cabecalho('Informações do pet')}
          <ScrollView contentContainerStyle={styles.detalhes}>
            <Text style={styles.nomeDetalhe}>{petSelecionado.nome}</Text>

            <View style={styles.fotoDetalhe}>
              {imagemDoPet(petSelecionado) ? (
                <Image
                  source={imagemDoPet(petSelecionado)}
                  style={styles.fotoDetalheImagem}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.textoSemImagem}>Foto não cadastrada</Text>
              )}
            </View>

            <View style={styles.gradeInfo}>
              {[
                `Espécie: ${petSelecionado.especie}`,
                `Peso: ${petSelecionado.peso}`,
                `Raça: ${petSelecionado.raca}`,
                `Tamanho: ${petSelecionado.tamanho}`,
              ].map((info) => (
                <View key={info} style={styles.etiqueta}>
                  <Text style={styles.textoEtiqueta}>{info}</Text>
                </View>
              ))}
            </View>

            {botao('Localização', () => abrirTela('localizacao'))}
            {botao(
              'Carteirinha de vacinas',
              () => abrirTela('vacinas'),
              styles.botaoSecundario
            )}
            {botao(
              'Editar informações',
              () => editarPet(petSelecionado),
              styles.botaoSecundario
            )}
            {botao(
              'Excluir pet',
              excluirPet,
              styles.botaoSecundario
            )}
          </ScrollView>
        </View>
      )}

      {tela === 'localizacao' && (
        <View style={styles.tela}>
          {cabecalho('Localização do pet', 'pet')}

          <ScrollView contentContainerStyle={styles.localizacaoConteudo}>
            <Text style={styles.nomeDetalhe}>
              {petSelecionado?.nome || 'Meu pet'}
            </Text>

            <View style={styles.mapaLocalizacao}>
              <View style={styles.mapaCirculo}>
                <Text style={styles.iconeLocalizacao}>📍</Text>
              </View>

              <Text style={styles.tituloMapa}>
                Localização do pet
              </Text>

              <Text style={styles.textoMapa}>
                O mapa será exibido aqui quando um dispositivo
                de rastreamento estiver conectado.
              </Text>
            </View>

            <View style={styles.statusLocalizacao}>
              <View style={styles.indicadorDesconectado} />

              <View style={styles.statusTextoContainer}>
                <Text style={styles.statusTitulo}>
                  Rastreador não conectado
                </Text>

                <Text style={styles.statusDescricao}>
                  A localização atual ainda não está disponível.
                </Text>
              </View>
            </View>

            {botao(
              'Conectar rastreador',
              () =>
                alert(
                  'A conexão com um dispositivo GPS será implementada posteriormente.'
                )
            )}

            <Text style={styles.avisoLocalizacao}>
              Para acompanhar seu pet em tempo real, será necessário
              conectar um dispositivo de rastreamento compatível.
            </Text>
          </ScrollView>
        </View>
      )}

      {tela === 'vacinas' && (
        <View style={styles.tela}>
          {cabecalho('Carteirinha de vacinação', 'pet')}

          <ScrollView contentContainerStyle={styles.formulario}>
            <Text style={styles.nomeDetalhe}>
              {petSelecionado?.nome}
            </Text>

            <Text style={styles.subtituloCidade}>
              Vacinas registradas
            </Text>

            {(vacinas[petSelecionado.id] || []).length === 0 ? (
              <View style={styles.clinica}>
                <Text style={styles.textoClinica}>
                  Nenhuma vacina cadastrada ainda.
                </Text>
              </View>
            ) : (
              (vacinas[petSelecionado.id] || []).map((vacina) => (
                <View key={vacina.id} style={styles.cartaoVacina}>
                  <Text style={styles.nomeVacina}>
                    {vacina.nome}
                  </Text>

                  <Text style={styles.textoVacina}>
                    Aplicação: {vacina.data}
                  </Text>

                  <Text style={styles.textoVacina}>
                    Próxima dose: {vacina.proximaDose}
                  </Text>
                </View>
              ))
            )}

            <View style={styles.linhaDivisoria} />

            <Text style={styles.subtituloCidade}>
              Adicionar vacina
            </Text>

            {campo(
              'Nome da vacina:',
              nomeVacina,
              setNomeVacina,
              'Ex.: Antirrábica'
            )}

            {campo(
              'Data de aplicação:',
              dataAplicacao,
              setDataAplicacao,
              'Ex.: 29/10/2026'
            )}

            {campo(
              'Próxima dose:',
              proximaDose,
              setProximaDose,
              'Ex.: 29/10/2027'
            )}

            {botao('Salvar vacina', adicionarVacina)}
          </ScrollView>
        </View>
      )}


      {tela === 'veterinarios' && (
        
        <View style={styles.tela}>
          {cabecalho('Clínicas veterinárias')}
          <ScrollView contentContainerStyle={styles.formulario}>
            <Text style={styles.subtituloCidade}>Maringá - PR</Text>
            {[
              'Paws&Care Clínica Veterinária 24h',
              'Vida Animal Centro Veterinário',
              'Cão&Companhia Clínica',
            ].map((nome) => (
              <View key={nome} style={styles.clinica}>
                <Text style={styles.textoClinica}>{nome}</Text>
              </View>
            ))}

            <View style={styles.linhaDivisoria} />
            <Text style={styles.subtituloCidade}>Sarandi - PR</Text>
            {[
              'AmparoVet Hospital Veterinário',
              'BemCuidar Clínica Veterinária',
              'SaúdePet Clínica Especializada',
            ].map((nome) => (
              <View key={nome} style={styles.clinica}>
                <Text style={styles.textoClinica}>{nome}</Text>
              </View>
            ))}

            <Text style={styles.aviso}>
              Lista ilustrativa. Os dados das clínicas serão verificados antes de publicar.
            </Text>
          </ScrollView>
        </View>
      )}

      {tela === 'cuidados' && (
        <View style={styles.tela}>
          {cabecalho('Cuidados')}
          <ScrollView contentContainerStyle={styles.formulario}>
            {['Banho', 'Passeio', 'Alimentação', 'Brincadeiras'].map((item) => (
              <Pressable
                key={item}
                style={styles.itemCuidado}
                onPress={() =>
                  alert(`As informações sobre ${item.toLowerCase()} serão adicionadas depois.`)
                }
              >
                <Text style={styles.textoCuidado}>{item}  ›</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Barra lateral: abre sem trocar de tela */}
      
      {/* Barra lateral */}
      <Animated.View
        pointerEvents={menuAberto ? 'auto' : 'none'}
        style={[
          styles.camadaMenu,
          {
            display: menuAberto ? 'flex' : 'none',
            opacity: animacaoMenu.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <Pressable
          style={styles.fundoMenu}
          onPress={() => setMenuAberto(false)}
        />

        <Animated.View
          style={[
            styles.barraLateral,
            {
              transform: [
                {
                  translateX: animacaoMenu.interpolate({
                    inputRange: [0, 1],
                    outputRange: [245, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable
            style={styles.fecharMenu}
            onPress={() => setMenuAberto(false)}
          >
            <Text style={styles.textoFechar}>×</Text>
          </Pressable>

          <Text style={styles.tituloMenu}>Informações</Text>
          <View style={styles.divisorMenu} />

          {botao('Veterinários', () => abrirTela('veterinarios'), styles.botaoMenu)}

          {botao(
            'Lojas Pet',
            () => {
              setMenuAberto(false);
              alert('A lista de lojas pet será adicionada depois.');
            },
            styles.botaoMenu
          )}

          {botao('Cuidados', () => abrirTela('cuidados'), styles.botaoMenu)}
        </Animated.View>
      </Animated.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: BRANCO,
  },
  tela: {
    flex: 1,
    backgroundColor: BRANCO,
  },
  loginFundo: {
    flexGrow: 1,
    backgroundColor: LARANJA,
    padding: 22,
    justifyContent: 'center',
  },
  loginCartao: {
    backgroundColor: LARANJA,
    borderRadius: 25,
    padding: 22,
    minHeight: 480,
    justifyContent: 'center',
  },
  logoImagem: {
    width: 220,
    height: 180,
    alignSelf: 'center',
    marginBottom: 25,
  },
  tituloLogin: {
    color: BRANCO,
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grupoCampo: {
    marginBottom: 12,
  },
  rotulo: {
    color: BRANCO,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: PESSEGO,
    color: PRETO,
    borderRadius: 9,
    paddingHorizontal: 12,
    height: 45,
    elevation: 2,
  },
  linkEsqueci: {
    color: BRANCO,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 12,
  },
  linkCadastro: {
    color: BRANCO,
    textAlign: 'center',
    fontSize: 13,
    marginTop: 17,
    lineHeight: 19,
  },
  botao: {
    backgroundColor: LARANJA,
    borderRadius: 9,
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 12,
    elevation: 2,
  },
  botaoPreto: {
    backgroundColor: '#000000',
    alignSelf: 'center',
    minWidth: 130,
  },
  botaoSecundario: {
    backgroundColor: PESSEGO,
  },
  textoBotao: {
    color: BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cabecalho: {
    backgroundColor: LARANJA,
    minHeight: 75,
    paddingTop: 8,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  acaoCabecalho: {
    width: 42,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  espacoCabecalho: {
    width: 42,
  },
  voltarImagem: {
    width: 50,
    height: 45,
    fontSize: 38,
    fontWeight: 'bold',
    lineHeight: 42,
  },
  patinhasIcone: {
    color: BRANCO,
    fontSize: 25,
  },
  tituloCabecalho: {
    color: BRANCO,
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  listaPets: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
  },
  petCard: {
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
    borderBottomWidth: 4,
    borderBottomColor: LARANJA,
    paddingBottom: 18,
  },
  fotoPet: {
    width: 185,
    height: 185,
    borderRadius: 100,
    borderWidth: 9,
    borderColor: LARANJA,
    backgroundColor: PESSEGO,
    overflow: 'hidden',
  },
  fotoPetImagem: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  fotoSemImagem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  textoSemImagem: {
    color: PRETO,
    textAlign: 'center',
    fontSize: 13,
  },
  nomePet: {
    overflow: 'hidden',
    backgroundColor: LARANJA,
    color: BRANCO,
    fontSize: 25,
    paddingHorizontal: 22,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: -2,
  },
  rodape: {
    height: 55,
    backgroundColor: LARANJA,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoAdicionar: {
    width: 58,
    height: 55,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: LARANJA,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -12,
  },
  rodapeIcone: {
    fontSize: 29,
    color: BRANCO,
  },
  sinalMais: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    backgroundColor: LARANJA,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoMais: {
    color: BRANCO,
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 19,
  },
  formulario: {
    padding: 22,
    paddingBottom: 35,
  },
  detalhes: {
    alignItems: 'center',
    padding: 22,
  },
  nomeDetalhe: {
    fontSize: 25,
    color: LARANJA,
    marginBottom: 12,
  },
  fotoDetalhe: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: PESSEGO,
    borderWidth: 8,
    borderColor: '#E9C9B9',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoDetalheImagem: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  gradeInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 22,
  },
  etiqueta: {
    backgroundColor: PRETO,
    borderRadius: 25,
    padding: 12,
    maxWidth: '100%',
  },
  textoEtiqueta: {
    color: BRANCO,
    fontSize: 13,
  },
  subtituloCidade: {
    color: LARANJA,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  clinica: {
    backgroundColor: PESSEGO,
    borderRadius: 30,
    padding: 15,
    marginBottom: 12,
  },
  textoClinica: {
    color: PRETO,
    fontSize: 14,
  },
  linhaDivisoria: {
    height: 4,
    backgroundColor: LARANJA,
    marginVertical: 20,
  },
  aviso: {
    color: PRETO,
    fontSize: 12,
    marginTop: 15,
  },
  itemCuidado: {
    backgroundColor: PESSEGO,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
  },
  textoCuidado: {
    color: BRANCO,
    fontSize: 18,
    textAlign: 'center',
  },

  localizacaoConteudo: {
    padding: 22,
    alignItems: 'center',
    paddingBottom: 35,
  },
  mapaLocalizacao: {
    width: '100%',
    minHeight: 300,
    backgroundColor: '#F5E8DF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: PESSEGO,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    marginVertical: 15,
  },
  mapaCirculo: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: BRANCO,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    elevation: 3,
  },
  iconeLocalizacao: {
    fontSize: 42,
  },
  tituloMapa: {
    color: PRETO,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  textoMapa: {
    color: PRETO,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  statusLocalizacao: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PESSEGO,
    borderRadius: 12,
    padding: 15,
    marginTop: 8,
  },
  indicadorDesconectado: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#888888',
    marginRight: 12,
  },
  statusTextoContainer: {
    flex: 1,
  },
  statusTitulo: {
    color: PRETO,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusDescricao: {
    color: PRETO,
    fontSize: 12,
    marginTop: 5,
    lineHeight: 18,
  },
  avisoLocalizacao: {
    color: PRETO,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 18,
  },

  camadaMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 999,
    elevation: 999,
  },
  fundoMenu: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  barraLateral: {
    width: 245,
    maxWidth: '78%',
    backgroundColor: LARANJA,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 25,
    elevation: 12,
  },
  fecharMenu: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  textoFechar: {
    color: BRANCO,
    fontSize: 34,
  },
  tituloMenu: {
    color: BRANCO,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 15,
  },
  divisorMenu: {
    height: 1,
    backgroundColor: BRANCO,
    marginBottom: 15,
  },
  botaoMenu: {
    backgroundColor: PESSEGO,
    borderRadius: 20,
    marginTop: 12,
  },
  pontoImagem: {
    width: 50,
    height: 50,
    alignSelf: 'rigth',
    marginBottom: 5,
    borderRadius: 100 
  },
  cadastraImagem: {
    width: 100,
    height: 180,
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 100 
  },
  cartaoVacina: {
    backgroundColor: PESSEGO,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: LARANJA,
  },
  nomeVacina: {
    color: PRETO,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoVacina: {
    color: PRETO,
    fontSize: 14,
    marginTop: 4,
  },
});


