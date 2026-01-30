# Estética Clinic App — MVP (Spec-First)

Este repositório contém a **especificação inicial** do MVP para uma clínica de estética de pequeno porte.

> **O que você consegue visualizar no GitHub agora:**
> - Estrutura de dados em **SQL** (tabelas e relacionamentos)
> - API em **OpenAPI (Swagger)** com endpoints do MVP
> - Visão geral e fluxo
>
> Isso já serve para revisar com a clínica, abrir issues e planejar o desenvolvimento. Depois, podemos gerar o backend/front a partir desta especificação.

---

## 📌 Escopo do MVP
- Clientes
- Anamnese única (estética)
- Agenda de atendimentos
- Registro de tratamento (prontuário)
- Orçamentos simples
- Upload básico de arquivos
- Usuários e login

---

## 🗃️ Modelo de Dados (SQL)
Veja `db/schema.sql` para todas as tabelas.

### Diagrama (alto nível)
```
Clientes (1) ──< Anamneses
Clientes (1) ──< Agendamentos ──< Tratamentos
Clientes (1) ──< Orcamentos
Clientes (1) ──< Arquivos
Usuarios (N) controla acesso
```

---

## 🔌 API (OpenAPI)
A especificação OpenAPI está em `docs/openapi.yaml`.

**Principais recursos:**
- `/auth/login`
- `/clientes`
- `/anamneses`
- `/agendamentos`
- `/tratamentos`
- `/orcamentos`
- `/arquivos`

---

## 🚀 Próximos passos sugeridos
1. Revisar e ajustar campos conforme a realidade da clínica.
2. Gerar backend automaticamente a partir do OpenAPI (NestJS/Express) ou implementar manualmente.
3. Criar frontend simples (React) consumindo os endpoints.

Se quiser, eu gero um **starter completo** (backend + frontend) em uma próxima iteração.
