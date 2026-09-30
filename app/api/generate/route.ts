import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function POST(req: NextRequest) {
 try {
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({error:'A API de IA ainda não foi configurada. Consulte o README.'},{status:503});
  const body = await req.json();
  const product = String(body.product ?? '').trim().slice(0,160);
  const category = String(body.category ?? '').trim().slice(0,100);
  const audience = String(body.audience ?? '').trim().slice(0,200);
  const features = String(body.features ?? '').trim().slice(0,1500);
  const platform = String(body.platform ?? 'Loja virtual').trim().slice(0,80);
  if (!product) return NextResponse.json({error:'Informe o nome do produto.'},{status:400});
  const response = await client.chat.completions.create({
   model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.7,
   response_format: {type:'json_object'},
   messages:[
    {role:'system',content:'Você é a Vendora AI, assistente de conteúdo para comércio eletrônico. Escreva em português brasileiro claro e persuasivo, sem prometer resultados de venda, inventar especificações, certificações, resultados, ingredientes ou benefícios não informados. Se faltarem dados, use linguagem neutra. Retorne somente JSON válido com as chaves: title (string), description (string), benefits (array de 3 strings), instagram (string), tiktok (string), keywords (array de 5 strings). Faça conteúdo adequado à plataforma escolhida.'},
    {role:'user',content:JSON.stringify({product,category,audience,features,platform})}
   ]
  });
  const raw=response.choices[0]?.message?.content;
  if(!raw) throw new Error('Resposta vazia da IA');
  return NextResponse.json({result:JSON.parse(raw)});
 } catch (error) {
  console.error('Generation error',error);
  return NextResponse.json({error:'Ocorreu um erro ao gerar. Tente novamente.'},{status:500});
 }
}
