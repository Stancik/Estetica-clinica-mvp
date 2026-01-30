-- =========================================================

-- Estética Clinic App - MVP

-- Banco de Dados: PostgreSQL

-- =========================================================

 

-- ========================

-- Usuários do sistema

-- ========================

CREATE TABLE usuarios (

  id SERIAL PRIMARY KEY,

  nome TEXT NOT NULL,

  email TEXT UNIQUE NOT NULL,

  senha_hash TEXT NOT NULL,

  perfil TEXT NOT NULL CHECK (perfil IN ('admin', 'profissional')),

  ativo BOOLEAN NOT NULL DEFAULT TRUE,

  criado_em TIMESTAMP NOT NULL DEFAULT NOW()

);

 

-- ========================

-- Clientes

-- ========================

CREATE TABLE clientes (

  id SERIAL PRIMARY KEY,

  nome_completo TEXT NOT NULL,

  telefone TEXT,

  email TEXT,

  data_nascimento DATE,

  observacoes TEXT,

  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),

  atualizado_em TIMESTAMP NOT NULL DEFAULT NOW()

);

 

-- ========================

-- Anamnese Estética

-- ========================

CREATE TABLE anamneses (

  id SERIAL PRIMARY KEY,

  cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,

  possui_doencas BOOLEAN,

  quais_doencas TEXT,

  faz_uso_medicamentos BOOLEAN,

  quais_medicamentos TEXT,

  alergias TEXT,

  gestante BOOLEAN,

  procedimentos_anteriores TEXT,

  queixa_principal TEXT,

  consentimento_lgpd BOOLEAN NOT NULL DEFAULT FALSE,

  data_preenchimento TIMESTAMP NOT NULL DEFAULT NOW()

);

 

-- ========================

-- Agendamentos

-- ========================

CREATE TABLE agendamentos (

  id SERIAL PRIMARY KEY,

  cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,

  data DATE NOT NULL,

  hora_inicio TIME NOT NULL,

  duracao_minutos INT NOT NULL CHECK (duracao_minutos > 0),

  procedimento_descricao TEXT NOT NULL,

  status TEXT NOT NULL CHECK (

    status IN ('agendado', 'confirmado', 'realizado', 'falta', 'reagendado')

  ),

  observacoes TEXT

);

 

-- ========================

-- Tratamentos Realizados (Prontuário)

-- ========================

CREATE TABLE tratamentos (

  id SERIAL PRIMARY KEY,

  cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,

  agendamento_id INT REFERENCES agendamentos(id) ON DELETE SET NULL,

  descricao_procedimento TEXT NOT NULL,

  produtos_utilizados TEXT,

  observacoes_clinicas TEXT,

  intercorrencia_ocorreu BOOLEAN DEFAULT FALSE,

  descricao_intercorrencia TEXT,

  data_atendimento TIMESTAMP NOT NULL DEFAULT NOW()

);

 

-- ========================

-- Orçamentos

-- ========================

CREATE TABLE orcamentos (

  id SERIAL PRIMARY KEY,

  cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,

  descricao TEXT NOT NULL,

  valor_total NUMERIC(12,2) NOT NULL CHECK (valor_total >= 0),

  status TEXT NOT NULL CHECK (status IN ('aberto', 'aprovado', 'rejeitado')),

  observacoes TEXT,

  criado_em TIMESTAMP NOT NULL DEFAULT NOW()

);

 

-- ========================

-- Arquivos (Fotos / Documentos)

-- ========================

CREATE TABLE arquivos (

  id SERIAL PRIMARY KEY,

  cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,

  tipo TEXT NOT NULL CHECK (tipo IN ('foto', 'documento')),

  caminho_arquivo TEXT NOT NULL,

  descricao TEXT,

  criado_em TIMESTAMP NOT NULL DEFAULT NOW()

);

 

-- ========================

-- Índices para performance

-- ========================

CREATE INDEX idx_anamneses_cliente ON anamneses(cliente_id);

CREATE INDEX idx_agendamentos_cliente ON agendamentos(cliente_id);

CREATE INDEX idx_tratamentos_cliente ON tratamentos(cliente_id);

CREATE INDEX idx_orcamentos_cliente ON orcamentos(cliente_id);
