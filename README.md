# 🎸 Hetz Store

A **Hetz Store** é um e-commerce premium fictício de instrumentos musicais e equipamentos de áudio profissional, desenvolvido para oferecer uma experiência de compra moderna, fluida e com alto apelo estético.

> ⚠️ **Status do Projeto**: O projeto encontra-se atualmente **em desenvolvimento** ativo 🚀.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as melhores e mais modernas ferramentas de desenvolvimento web:

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
* **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
* **Componentes Base**: [Base UI](https://base-ui.com/) (primitivos headless e acessíveis do time do MUI) e componentes inspirados no ecossistema [shadcn/ui](https://ui.shadcn.com/)
* **Animações**: [Framer Motion](https://www.framer.com/motion/) (utilizado para micro-interações, efeitos de zoom e transições do carrinho e alternador de tema)
* **Notificações**: [Sonner](https://sonner.emilkowal.ski/) (sistema moderno de toasts flutuantes)
* **Gerenciamento de Tema**: [Next Themes](https://github.com/pacocoursey/next-themes) (Dark/Light Mode persistente)
* **Ícones**: [Lucide React](https://lucide.dev/)

---

## ✨ Funcionalidades Implementadas

Até o momento, os seguintes recursos e páginas já estão totalmente operacionais:

1. **Catálogo de Guitarras**: Exibição de produtos divididos por categorias, com cards de produtos animados e badges de ofertas.
2. **Página de Detalhes Dinâmica (`/produto/[id]`)**:
   * Rota dinâmica do Next.js com geração automática de metadados para SEO.
   * Visualização da imagem com zoom interativo.
   * Especificações técnicas geradas sob demanda com base no instrumento selecionado.
   * Seletor de quantidade e recomendação de produtos relacionados da mesma categoria.
3. **Carrinho de Compras Persistente**:
   * Drawer lateral interativo e animado.
   * Salvamento automático do estado das compras no `localStorage` do navegador para persistência de dados.
   * Cálculo em tempo real do preço total e quantidade de itens.
4. **Tema Escuro (Dark Mode) Integrado**:
   * Botão alternador animado no cabeçalho.
   * Suporte total a cores adaptativas em toda a interface do usuário.
5. **Sistema de Notificações Interativas (Toasts)**:
   * Alertas flutuantes no canto inferior da tela ao adicionar produtos ao carrinho.
   * Ação rápida de **Desfazer** direto na notificação que remove o item recém-adicionado instantaneamente.

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
