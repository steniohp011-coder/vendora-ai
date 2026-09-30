import type { Metadata } from 'next';
import './styles.css';
export const metadata: Metadata = { title: 'Vendora AI — Conteúdo que vende', description: 'Crie descrições, anúncios e conteúdo para sua loja com inteligência artificial.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
