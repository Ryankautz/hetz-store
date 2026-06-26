# 🎸 Hetz Store

A **Hetz Store** é um e-commerce premium de instrumentos musicais e equipamentos de áudio profissional, desenvolvido para oferecer uma experiência de compra moderna, fluida e com alto apelo estético. É um projeto focado em demonstrar boas práticas de desenvolvimento web frontend com Next.js, interações ricas e validações de dados rigorosas.

> ✅ **Status do Projeto**: **Concluído / Pronto para Portfólio** 🚀

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando ferramentas modernas de desenvolvimento web:

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
* **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
* **Componentes Base**: [Base UI](https://base-ui.com/) (primitivos headless e acessíveis do time do MUI) e componentes inspirados no ecossistema [shadcn/ui](https://ui.shadcn.com/)
* **Animações**: [Framer Motion](https://www.framer.com/motion/) (utilizado para micro-interações, efeitos de zoom, animações de layout e transições do carrinho, filtros e alternador de tema)
* **Notificações**: [Sonner](https://sonner.emilkowal.ski/) (sistema moderno de toasts flutuantes)
* **Gerenciamento de Tema**: [Next Themes](https://github.com/pacocoursey/next-themes) (Dark/Light Mode persistente e livre de oscilações de hidratação)
* **Ícones**: [Lucide React](https://lucide.dev/)

---

## ✨ Funcionalidades Implementadas

O projeto conta com um fluxo completo de e-commerce totalmente operacional e interativo:

### 1. Catálogo e Filtros Inteligentes
* Exibição de produtos divididos por categorias com cards de produtos animados.
* Filtros específicos de marcas (Fender, Gibson, PRS, Ibanez, etc.) para a categoria de Guitarras.
* Filtros gerais de categorias, faixa de preço máxima (slider dinâmico) e disponibilidade em estoque.
* Ordenação flexível (Destaques, Menor Preço, Maior Preço, Melhor Avaliados).
* Animações de reposicionamento de grid com AnimatePresence e Layout do Framer Motion.

### 2. Página de Detalhes Dinâmica (`/produto/[id]`)
* Rota dinâmica com geração dinâmica de metadados para SEO baseados no produto.
* Visualização da imagem com efeito de zoom interativo.
* Especificações técnicas geradas sob demanda com base no instrumento selecionado.
* Seletor de quantidade de itens e recomendação inteligente de produtos relacionados da mesma categoria.

### 3. Carrinho de Compras Persistente
* Drawer lateral interativo e animado.
* Salvamento automático do estado das compras no `localStorage` do navegador para persistência.
* Cálculo em tempo real do preço total e quantidade de itens.
* Notificações flutuantes com ação rápida de **Desfazer** para remover itens recém-adicionados.

### 4. Lista de Favoritos (Wishlist)
* Salvamento de produtos na lista de favoritos clicando no coração (❤️) nos cards ou detalhes.
* Página exclusiva (`/favoritos`) para exibição e remoção dos itens favoritos.
* Contador dinâmico e animado no cabeçalho integrando carrinho e favoritos de forma global.

### 5. Checkout Seguro e Inteligente
* Fluxo dividido em três etapas claras: Dados Pessoais, Endereço de Entrega e Detalhes de Pagamento.
* **Autocompletar de Endereço**: Integração em tempo real com a API do **ViaCEP** preenchendo automaticamente rua, bairro, cidade e estado a partir do CEP.
* **Validações Rigorosas**: Validação de formato de e-mail, telefone, CPF (utilizando o algoritmo validador de dois dígitos oficiais do CPF brasileiro), CEP, formato e número do cartão de crédito, validade e CVV.
* **Máscaras de Entrada**: Formatação em tempo real dos campos numéricos digitados (CPF, CEP, Telefone, Cartão, Expiry, CVV).
* **Tela de Sucesso**: Exibição detalhada com resumo do pedido, geração de número de pedido dinâmico (`HZ-ANO-NUMERO`), ação de copiar o código para a área de transferência com um clique e atalho direto para rastreamento.

### 6. Rastreamento de Encomendas Interativo (`/rastreio`)
* Leitura automática de parâmetros da URL (`?code=...`) vindos da página de sucesso do checkout.
* Simulação de rastreamento com variação lógica determinística baseada no número do pedido (códigos de pedidos terminados em números pares constam como *Entregue*, enquanto ímpares constam *Em Trânsito* com previsão de entrega futura).
* Histórico e datas calculadas dinamicamente com base na data atual (D-3, D-2, D-1, etc.) gerando alta fidelidade e realismo na simulação.

### 7. Central de Contato e Dúvidas (`/contato` & `/faq`)
* Central de ajuda com FAQ interativo estilo sanfona (accordion) animado pelo Framer Motion.
* Formulário de contato dinâmico com controle de estados, validações em tempo real, simulação de envio de e-mail (espera assíncrona) e toast de sucesso após o preenchimento correto.

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação em sua máquina:

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd hetz-store
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto contendo as variáveis listadas no modelo:
```bash
cp .env.example .env
```

### 4. Rodar o servidor de desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a loja.

### 5. Validar o build de produção e linting
Para rodar as validações de build do Next.js e compilação do TypeScript:
```bash
npm run build
npm run lint
```
