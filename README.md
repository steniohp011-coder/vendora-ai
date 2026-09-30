# Vendora AI — MVP inicial

Protótipo web em Next.js para gerar título, descrição, benefícios, legenda para Instagram, roteiro TikTok e palavras-chave a partir de dados informados pelo vendedor.

## Requisitos
- Node.js 20 ou superior
- Uma chave de API de um provedor de IA compatível com o SDK OpenAI
- (Opcional nesta demonstração) projeto Supabase para preparar autenticação e persistência

## Rodar localmente
1. Extraia o ZIP e abra a pasta no terminal.
2. Execute `npm install`.
3. Copie `.env.example` para `.env.local`.
4. Preencha `OPENAI_API_KEY` com sua chave secreta e, se necessário, ajuste `OPENAI_MODEL`.
5. Execute `npm run dev` e abra `http://localhost:3000`.

Nunca coloque a chave da API em código do navegador, repositório público ou variável `NEXT_PUBLIC_`.

## Publicar
1. Crie um repositório privado no GitHub e envie estes arquivos.
2. Crie um projeto na Vercel e importe o repositório.
3. Cadastre as variáveis `OPENAI_API_KEY` e `OPENAI_MODEL` nas configurações de ambiente da Vercel.
4. Faça o deploy e teste a geração.
5. Compre um domínio e conecte-o ao projeto Vercel.

## Supabase
O arquivo `supabase/schema.sql` prepara tabelas de perfil e histórico com políticas RLS. Execute-o no SQL Editor do Supabase. A interface e rota atuais são uma demonstração sem login, gravação de histórico, débito real de créditos ou cobrança. Antes de abrir ao público, implemente autenticação, autorização no servidor, limites de requisição, débito de créditos transacional, proteção contra abuso, política de privacidade e termos.

## Antes de cobrar clientes
- Validar os custos por geração e configurar limites de uso no servidor.
- Implementar login Supabase e vincular cada geração ao usuário autenticado.
- Implementar pagamentos e webhooks de assinatura; não confiar no preço/plano enviado pelo navegador.
- Testar em dispositivos móveis, idiomas e cenários de erro.
- Publicar política de privacidade, termos de uso, canal de suporte e informações empresariais/fiscais aplicáveis.

O nome Vendora AI é provisório; verifique disponibilidade de marca e domínio antes de investir em identidade ou divulgação.
