# MVP - Gestão por Stage de Projeto

## Perfis
- Colaborador: visualiza e atualiza apenas os próprios projetos.
- Gestor: visualiza dashboard macro com filtro por responsável.

## Regras implementadas (frontend)
- Login MVP com os usuários definidos.
- Cadastro de projeto com campos:
  - Nome do projeto
  - Área do projeto
  - Prazo final
  - Cronograma padrão (37 stages do Excel) ou customizado
- Avanço de stage exige:
  - Comentário obrigatório
  - Anexo obrigatório (qualquer tipo)
  - Limite de 25 MB por arquivo

## Cálculo de desempenho
- Progresso real (%) = stages concluídos / total de stages.
- Progresso esperado (%) = dias corridos do projeto / dias totais do projeto.
- Regra de atraso:
  - Se atraso em dias > 10% da duração do projeto: `ATRASADO`
  - Se há atraso, mas <= 10%: `EM RISCO`
  - Se real > esperado + 2 p.p.: `ACIMA DO ESPERADO`
  - Caso contrário: `NO PRAZO`

## Dashboard gestor
- KPIs: No prazo, Acima do esperado, Em risco, Atrasado.
- Filtro por responsável.
- Barra por projeto:
  - Preenchimento ciano: progresso real
  - Marcador branco: progresso esperado
  - Texto central: `% real | stage atual`

## Backend (próximo passo)
- `database_schema.sql` já contém a proposta de banco PostgreSQL para produção.
- Recomendações:
  - API: Node.js + Express
  - ORM: Prisma
  - Auth: JWT + hash de senha (bcrypt)
  - Storage: evidências em SharePoint/OneDrive corporativo ou S3 interno
