# Figma tokens

Os JSON desta pasta sao gerados por `scripts/figma-tokens.mjs` a partir de `src/data/tessera.js`. Nao edite os JSON: mude o valor em `tessera.js` e rode o script de novo.

```
node scripts/figma-tokens.mjs                    # layout swap (padrao)
node scripts/figma-tokens.mjs --layout=parallel
```

Cada execucao escreve os dois formatos: `dtcg/` (W3C, com alias) e `flat/` (caminho como chave, valor resolvido, sem alias).

## 1. Ordem de import

1. `01-primitives.json`
2. `02-semantic-*.json`
3. `03-elevation.json`

Primitives vem primeiro porque os semanticos sao aliases dele. Importado fora de ordem, o alias nao encontra o alvo. No formato `flat` nao ha alias, mas mantenha a ordem para as colecoes nascerem na mesma sequencia.

Elevation fica por ultimo e a parte porque sombra nao e color variable. No `dtcg` sai como `$type: "shadow"`, com uma lista de camadas. No `flat` sai como a string CSS. Muitos plugins de variables ignoram sombra nos dois casos. Se isso acontecer, crie os tres effect styles na mao a partir desse arquivo.

## 2. Calibrar o formato antes de importar de verdade

Cada plugin le um dialeto proprio de JSON. Antes do import real:

1. Crie no Figma uma colecao de teste com duas ou tres variables na mao, uma delas alias de outra.
2. Exporte essa colecao com o plugin que voce vai usar.
3. Compare com `dtcg/01-primitives.json` e `flat/01-primitives.json`: forma das chaves, nome da colecao, nome do modo, como o alias aparece.
4. Importe o formato que bateu. Se nenhum bater, ajuste `toDtcg` ou `toFlat` no script, nao o JSON.

Apague a colecao de teste depois.

## 3. Reimportar

Reimportar atualiza as variables que casam por nome e cria as que nao existem. Nao apaga nada.

Por isso renomear um token gera duplicata: o nome novo entra e o antigo continua la. Renomeie sempre em `tessera.js`, rode o script, reimporte e apague o orfao no Figma na mao.

## 4. Layouts no plano Starter, e depois dele

No Starter uma colecao tem um modo so, entao nao da para ter as marcas como modes.

- `swap`: todo `02-semantic-*.json` declara a mesma colecao, `Semantic`. Importar outro por cima troca a marca do arquivo inteiro, porque os nomes batem.
- `parallel`: cada arquivo declara `Semantic <Marca>`. As colecoes convivem e cada componente fica preso a marca escolhida.

Hoje `tessera.js` tem uma marca so, entao sai um arquivo semantico e os dois layouts diferem apenas no nome da colecao. Se `tessera.js` passar a exportar `BRANDS` como lista, o script gera um arquivo por marca.

Quando o plano subir: crie uma colecao `Semantic` com um modo por marca e importe cada `02-semantic-*.json` no modo correspondente. Os nomes das variables ja sao os mesmos em todos, entao nada muda no script e o `--layout` deixa de importar.
