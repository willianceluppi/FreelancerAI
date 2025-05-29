// /home/ubuntu/freelancerai/supabase/functions/ai-assistant/index.ts
// Exemplo de uma Supabase Edge Function para a Assistente AIA
// (Usando Deno/TypeScript)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// Importar biblioteca de IA (ex: OpenAI)
// import OpenAI from "https://deno.land/x/openai@v4.x.x/mod.ts";

// Configurar cliente Supabase (usar variáveis de ambiente no Supabase)
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Configurar cliente OpenAI (usar variáveis de ambiente)
// const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });

serve(async (req) => {
  try {
    const { query, userId } = await req.json(); // Recebe a consulta do usuário e seu ID

    // 1. Buscar contexto do usuário no Supabase (opcional, mas útil)
    let userContext = {};
    if (userId) {
      const { data: profile, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("skills, interests, location")
        .eq("id", userId)
        .single();
      if (profileError) console.error("Error fetching profile:", profileError);
      else userContext = profile;
    }

    // 2. Processar a consulta (exemplo simples, poderia chamar API externa)
    let responseMessage = `Recebi sua consulta: "${query}".`;

    // Exemplo: Se a consulta for sobre "projetos de design em SP"
    if (query.toLowerCase().includes("design") && query.toLowerCase().includes("sp")) {
      // Poderia buscar projetos no Supabase com base na query e contexto
      responseMessage = "Encontrei alguns projetos de design em São Paulo que podem te interessar. Verifique seu dashboard!";
      // Aqui, poderia disparar uma notificação ou atualizar o estado do frontend
    }

    // Exemplo: Chamada a uma API de IA externa (descomentar e adaptar)
    /*
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é a AIA, assistente da plataforma FreelancerAI." },
        { role: "user", content: `Contexto: ${JSON.stringify(userContext)}. Consulta: ${query}` }
      ],
    });
    responseMessage = completion.choices[0].message.content;
    */

    // 3. Retornar a resposta
    return new Response(
      JSON.stringify({ reply: responseMessage }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in AI Assistant function:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

