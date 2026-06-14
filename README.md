# Monitor Cigarrinha do Milho

Projeto escolar desenvolvido com HTML, CSS e JavaScript puro para o tema **Agro forte, futuro sustentável**.

A proposta apresenta uma página inicial explicando a problemática da cigarrinha-do-milho e um dashboard interativo que simula o monitoramento de armadilhas em diferentes áreas de uma lavoura.

## Sobre o problema

## Sobre o problema

A cigarrinha-do-milho, conhecida cientificamente como *Dalbulus maidis*, é uma praga que pode transmitir doenças associadas ao complexo de enfezamentos do milho, causando prejuízos à produtividade e à qualidade das lavouras. Por isso, o monitoramento da presença do inseto é essencial para apoiar decisões mais rápidas, precisas e sustentáveis no manejo agrícola.

No Paraná, já existem iniciativas importantes de acompanhamento da cigarrinha-do-milho, como a plataforma CigarrinhaWeb, que reúne informações registradas por técnicos e produtores a partir da verificação das armadilhas no campo.

Este projeto contribui com essa lógica de monitoramento ao propor uma etapa automatizada: a coleta de dados diretamente na lavoura por meio de visão computacional. Com o uso de uma ESP32-CAM, o sistema captura imagens das armadilhas, simula a contagem dos insetos e disponibiliza os dados em um dashboard interativo, reduzindo a dependência de registros manuais e fortalecendo o uso de dados na agricultura sustentável.


## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- Canvas API para o gráfico
- LocalStorage para salvar a preferência de modo claro ou escuro

Não foram usadas bibliotecas, frameworks ou templates prontos.

## Estrutura de arquivos

```text
monitor-cigarrinha/
├── index.html
├── dashboard.html
├── style.css
├── script.js
├── dashboard.js
├── README.md
└── assets/
    └── imgs/
```

## Como executar

1. Baixe ou copie a pasta do projeto.
2. Abra o arquivo `index.html` no navegador.
3. Clique em **Abrir dashboard**.
4. No dashboard, alterne entre os cenários de demonstração.

## Cenários de demonstração

### Cenário 1: monitoramento normal

- Armadilha A: 4 cigarrinhas
- Armadilha B: 7 cigarrinhas
- Armadilha C: 6 cigarrinhas

Resultado esperado: todos os cards ficam em estado normal, sem alerta.

### Cenário 2: área infestada detectada

- Armadilha A: 5 cigarrinhas
- Armadilha B: 31 cigarrinhas
- Armadilha C: 8 cigarrinhas

Resultado esperado: a Armadilha B fica em destaque vermelho, o alerta aparece e o gráfico mostra a barra acima do limite didático.

## O que observar na avaliação

Este projeto demonstra:

- Uso de tags semânticas: `header`, `main`, `section`, `article`, `aside`, `footer` e `nav`.
- CSS com classes e IDs.
- Layout responsivo com Grid, Flexbox e media queries.
- JavaScript com variáveis, objetos, funções e eventos.
- Manipulação do DOM para criar cards, atualizar textos, mostrar alertas e redesenhar o gráfico.
- Gráfico feito sem biblioteca, usando Canvas API.
- Modo escuro via JavaScript, com preferência salva no navegador.
- Espaços reservados para fotos autorais com textos `aria-label` descritivos.
- Conteúdo autoral relacionado ao tema agro e sustentabilidade.

## Espaços para imagens autorais

A home possui placeholders para:

1. Foto da armadilha adesiva amarela instalada no milharal com o protótipo de monitoramento.
2. Foto dos estudantes analisando dados ou testando o sistema.

Essas imagens devem ser adicionadas depois na pasta `assets/imgs/`.

## Referências

IDR-PARANÁ. **Paraná lança plataforma CigarrinhaWeb para reforçar combate à cigarrinha-do-milho no Show Rural**. 2026.

AGÊNCIA ESTADUAL DE NOTÍCIAS DO PARANÁ. **Lançada no Show Rural, plataforma monitora cigarrinha-do-milho nas lavouras do Paraná**. 2026.

ADAPAR. **Monitoramento do complexo do enfezamento e seu vetor**. 2023.

## Autoria

Projeto desenvolvido para fins educacionais.
