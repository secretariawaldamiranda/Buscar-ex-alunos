# Busca de ex-alunos — 2000 a 2025

Site estático para consultar 6.873 entradas de listas de ex-alunos. Inclui filtros por ano, pesquisa sem acentos, sugestões de grafias próximas, palavras em outra ordem e uma fila inicial de possíveis problemas de digitalização.

O site está pronto para o GitHub Pages. Não precisa instalar bibliotecas, configurar um banco de dados ou executar uma compilação.

## Publicar pelo navegador

1. Crie um repositório no GitHub. Sugestão de nome: `busca-ex-alunos`.
2. Extraia o ZIP recebido. Abra a pasta `site-ex-alunos`.
3. No repositório, use **Add file → Upload files** e envie os arquivos dessa pasta. O `index.html` deve ficar diretamente na raiz do repositório, ao lado de `app.js`, `dados.js` e `styles.css`. Não envie apenas o ZIP nem deixe o site dentro de uma pasta extra.
4. Confirme o envio com **Commit changes**. Se o navegador ocultar `.nojekyll` e `.gitignore`, você pode criá-los pelo botão **Add file → Create new file**; `.nojekyll` fica vazio. Esses arquivos já estão no ZIP.
5. Abra **Settings → Pages**. Em **Build and deployment**, selecione **Deploy from a branch**.
6. Escolha a branch **main**, a pasta **/(root)** e clique em **Save**. Se a branch tiver outro nome, escolha a que recebeu os arquivos.
7. Aguarde a publicação. O endereço aparece em **Settings → Pages → Visit site**. Para um repositório chamado `busca-ex-alunos`, normalmente será `https://SEU-USUARIO.github.io/busca-ex-alunos/`.

Documentação oficial: [Criar um site do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) e [Configurar a origem de publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

No GitHub Free, o Pages está disponível para repositórios públicos. Os arquivos usam caminhos relativos, por isso funcionam tanto na raiz de um domínio quanto dentro do caminho de um repositório.

## Dados e acesso

**O pacote contém a lista completa de nomes. Este site não tem login: quando publicado, seus visitantes poderão consultar e baixar os dados presentes em `dados.js`.** O GitHub Pages pode disponibilizar o site publicamente mesmo quando o repositório é privado; a visibilidade do repositório não deve ser usada como controle de acesso ao site. Confirme que essa divulgação corresponde ao uso pretendido pela escola antes de publicar.

O site não inclui o PDF nem a planilha de conferência. A pesquisa acontece no navegador, sem enviar os termos digitados para um serviço de busca. Não há analytics, fontes externas ou dependências de terceiros. O provedor de hospedagem recebe as requisições normais para carregar a página e seus arquivos.

Se o objetivo for acesso restrito à equipe, esta versão estática em Pages não fornece esse controle; será necessária uma hospedagem com autenticação.

## Abrir no computador

Mantenha os arquivos juntos e abra `index.html` no navegador. A consulta também funciona sem internet. Se preferir um servidor local e tiver Python instalado, execute na pasta:

```sh
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura da página e textos |
| `styles.css` | Visual e adaptação para celular |
| `app.js` | Busca, filtros, ordenação e paginação |
| `dados.js` | Lista completa dos registros e alertas iniciais |
| `favicon.svg` | Ícone da aba do navegador |
| `.nojekyll` | Mantém a publicação como arquivos estáticos |
| `.gitignore` | Evita incluir documentos de trabalho e arquivos locais por acidente |

## Corrigir ou atualizar a lista

As edições feitas na planilha Excel não atualizam este site automaticamente. Esta versão contém uma cópia inicial dos dados extraídos em 22/10/2026.

Para uma correção pontual, abra `dados.js` no repositório pelo botão de edição, localize o registro pelo ID e ajuste o campo `name` após conferir a fonte. Preserve `id`, `year`, `page` e `number` para manter a referência. Confirme com **Commit changes**; o Pages publicará a atualização. Recarregue a página sem cache caso a versão anterior ainda apareça.

Exemplo de registro, apenas para explicar os campos:

```js
{
  "id": "EX00001",
  "year": 2000,
  "name": "Nome conforme o documento",
  "page": 1,
  "number": 1,
  "flags": [],
  "related": [],
  "review": false
}
```

O arquivo começa com `window.EX_ALUNOS_DATA = [` e termina com `];`. Preserve aspas, vírgulas e colchetes ao editar. `flags` contém os motivos dos alertas, `related` contém IDs relacionados e `review` define a inclusão no filtro de conferência. Esses três campos são resultados da comparação inicial e não são recalculados pelo site após editar um nome. Ao concluir uma conferência, atualize os alertas dos registros envolvidos conforme a decisão.

Para acrescentar ou remover entradas, além de atualizar `dados.js`, ajuste os totais e o período apresentados em `index.html`. Se acrescentar anos fora de 2000–2025, ajuste também os limites da lista de anos em `app.js`.

## Limites da conferência

- Os nomes originais foram preservados na cópia inicial. Nenhuma pessoa foi unificada ou excluída automaticamente.
- Há 236 pares com sugestões de conferência, envolvendo 395 registros. Repetições entre anos também estão indicadas, como informação.
- Semelhança de nomes não prova duplicidade nem identidade. Homônimos e repetições em vários anos podem ser legítimos.
- As sugestões não detectam todos os erros de OCR. Confira os papéis ou as imagens originais.
- O ano é o cabeçalho da lista, sem presumir que seja o ano de conclusão.

## Verificação da versão entregue

Os 6.873 registros foram mantidos. A lógica de busca foi verificada com acentos, letras trocadas, palavras fora de ordem, pesquisa por ID, filtros, ordenação, ausência de resultados e paginação. A estrutura foi preparada para servir todos os recursos por caminhos relativos, sem compilação.
