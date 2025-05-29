// /home/ubuntu/freelancerai/supabase/functions/stripe-integration/index.ts
// Exemplo de uma Supabase Edge Function para integração com Stripe
// (Usando Deno/TypeScript)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@11.1.0?target=deno&deno-std=0.132.0"; // Use a versão compatível com Deno

// Configurar cliente Stripe (usar variáveis de ambiente no Supabase)
const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  httpClient: Stripe.createFetchHttpClient(), // Necessário para Deno
  apiVersion: "2022-11-15", // Especifique a versão da API
});

serve(async (req) => {
  try {
    const { amount, currency, paymentMethodId, customerId } = await req.json(); // Dados recebidos do frontend

    // Exemplo: Criar um PaymentIntent para cobrar um cliente
    if (!amount || !currency) {
      throw new Error("Amount and currency are required.");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Em centavos (ex: 1000 para R$10,00)
      currency: currency, // ex: 'brl'
      payment_method: paymentMethodId, // Opcional: ID do método de pagamento (se já coletado)
      customer: customerId, // Opcional: ID do cliente Stripe
      // automatic_payment_methods: { enabled: true }, // Ou configure métodos específicos
      // confirm: true, // Tentar confirmar imediatamente (requer paymentMethodId)
      // return_url: 'https://www.freelancerai.com.br/payment-success', // URL de retorno após sucesso
      description: "Pagamento por serviço na FreelancerAI",
      metadata: { /* Adicionar metadados relevantes, como project_id */ }
    });

    // Retornar o client_secret do PaymentIntent para o frontend
    // O frontend usará isso para confirmar o pagamento com Stripe.js
    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in Stripe Integration function:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

