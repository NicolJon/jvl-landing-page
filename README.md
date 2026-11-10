# JVL — Landing page

Site institucional da JVL Componentes Automotivos, com linhas atendidas, produtos, categorias, história, contatos e publicações do Instagram.

## Estrutura

- `index.html`: página responsiva com estilos e interações.
- `assets/`: logo e imagens usadas no site, incluindo produtos da loja JVL no Mercado Livre.
- `copy-revisada.md`: copy aprovada para referência editorial.

## Executar localmente

Abra `index.html` em um navegador ou sirva a pasta com um servidor HTTP estático. Não há instalação nem etapa de build. A tipografia é carregada pelo Google Fonts.

## Publicação

Pronto para GitHub Pages usando a branch `main` e a pasta raiz (`/`). Os caminhos de imagens são relativos para funcionar no endereço do projeto.

## Busca e mensuração

- O endereço principal configurado é `https://jvlpecas.com.br/`. Ajuste `index.html`, `robots.txt` e `sitemap.xml` se o domínio de publicação mudar.
- Publique `robots.txt` e `sitemap.xml` na raiz junto com `index.html`. No Google Search Console, cadastre a propriedade do domínio, conclua a verificação por DNS (ou adicione a tag de verificação fornecida pelo Google diretamente no `<head>` do HTML) e envie `https://jvlpecas.com.br/sitemap.xml`.
- Preencha os IDs oficiais de GA4 e Pixel da Meta em `tracking-config.js`. Valores vazios desativam as respectivas tags. A faixa de consentimento impede o carregamento de ambas até o visitante aceitar.
- `privacidade.html` explica a coleta e permite reabrir a escolha de cookies. Revise o texto com a JVL antes da publicação definitiva.
- Os eventos registram visitas, cliques para WhatsApp, telefone, email e Mercado Livre. No GA4, `generate_lead` indica clique para WhatsApp; no Pixel, o evento correspondente é `Contact`. Um clique mede intenção de contato, não uma conversa ou venda confirmada.
- Teste a publicação com o relatório em tempo real do GA4, o Meta Pixel Helper e a inspeção de URL do Search Console. Essas verificações dependem dos IDs, da propriedade e do site publicado.

## Contatos

- Instagram: https://www.instagram.com/jvlpecas/
- Mercado Livre: https://www.mercadolivre.com.br/pagina/jvlpecasdiesel
- WhatsApp: https://wa.me/5544999237457

As imagens e marcas pertencem aos respectivos titulares.
