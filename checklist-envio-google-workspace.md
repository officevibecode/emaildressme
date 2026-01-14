# ✅ CHECKLIST DE ENVIO — GOOGLE WORKSPACE (GMAIL)

## 🔐 1. AUTENTICAÇÃO DO DOMÍNIO
- [ ] **SPF configurado** — Verificar registos DNS do domínio tgoo.pt/pro10.pt  
  _(Permite ao Gmail verificar que o email vem do servidor autorizado)_
- [ ] **DKIM ativado** — Ativar nas definições do Google Workspace  
  _(Assina digitalmente os emails para provar autenticidade)_
- [ ] **DMARC implementado** — Criar política de alinhamento  
  _(Protege contra spoofing e melhora reputação)_

---

## 📊 2. AQUECIMENTO DA CONTA
- [ ] **Enviar volumes crescentes** — Começar com 50-100 emails/dia  
  _(Aumentar gradualmente durante 2-3 semanas até volume desejado)_
- [ ] **Evitar picos súbitos** — Não enviar milhares de emails de repente  
  _(Pode acionar filtros anti-spam do Google)_

---

## 📋 3. LISTA DE CONTACTOS LIMPA
- [ ] **Remover contactos inativos** — Eliminar emails que não abrem há >6 meses  
  _(Bounces e inatividade prejudicam a reputação do remetente)_
- [ ] **Validar emails** — Usar ferramenta de validação (ex: NeverBounce, ZeroBounce)  
  _(Reduz bounces e melhora entregabilidade)_
- [ ] **Opt-in verificado** — Garantir que os contactos deram permissão  
  _(RGPD obriga a consentimento explícito)_

---

## 📧 4. QUALIDADE DO EMAIL
- [ ] **Testar HTML** — Verificar em Mail Tester (mail-tester.com) ou Litmus  
  _(Score mínimo de 8/10 recomendado)_
- [ ] **Ratio texto/imagem equilibrado** — Mais texto que imagens  
  _(Emails só com imagens são suspeitos para filtros)_
- [ ] **Links para domínios confiáveis** — Apenas pro10.pt e tgoo.pt  
  _(Evitar links para domínios desconhecidos ou encurtadores)_
- [ ] **Sem anexos** — Nunca enviar PDFs ou ficheiros anexados em campanhas  
  _(Aumenta muito a probabilidade de ir para spam)_

---

## 🎯 5. COPY E CONTEÚDO
- [ ] **Assunto curto e relevante** — 38-45 caracteres  
  _(Ver ficheiro email-assuntos-preheaders.md)_
- [ ] **Evitar palavras spam** — Sem "GRÁTIS!!!", "GANHE JÁ", "CLIQUE AQUI"  
  _(Testado e aprovado no email criado)_
- [ ] **Personalização** — Usar nome do destinatário se possível  
  _(Aumenta abertura e engagement)_

---

## 🚀 6. ENVIO ESTRATÉGICO
- [ ] **Hora ideal** — Enviar terça a quinta, entre 10h-11h ou 14h-15h  
  _(Horários com maior taxa de abertura B2B)_
- [ ] **Evitar fins-de-semana** — Menor abertura e mais risco de spam  
- [ ] **Segmentar envios** — Separar por setor/interesse se possível  
  _(Melhora relevância e reduz unsubscribes)_

---

## 📈 7. MONITORIZAÇÃO PÓS-ENVIO
- [ ] **Acompanhar métricas** — Taxa de abertura (>20%), cliques (>2%), bounces (<2%)  
  _(Usar Google Workspace Reports ou ferramenta de tracking)_
- [ ] **Processar opt-outs** — Remover imediatamente quem pedir "REMOVER"  
  _(RGPD exige resposta em 24-48h)_
- [ ] **Responder rapidamente** — Monitorizar respostas e responder em <24h  
  _(Engagement positivo melhora reputação do remetente)_

---

## ⚠️ NOTAS IMPORTANTES

- **Google Workspace tem limite de 2.000 emails/dia** por conta (pode aumentar com histórico positivo)
- **Usar "Reply-To" adequado** — gomakemoney@tgoo.pt (não usar noreply@)
- **Não comprar listas de emails** — Viola RGPD e destrói reputação
- **Se o domínio for novo** — Pode levar 1-2 meses a construir reputação

---

## 🛠️ FERRAMENTAS RECOMENDADAS

1. **Mail Tester** (mail-tester.com) — Testar score de spam antes de enviar
2. **MXToolbox** (mxtoolbox.com) — Verificar SPF/DKIM/DMARC
3. **Google Postmaster Tools** — Monitorizar reputação do domínio
4. **Email on Acid / Litmus** — Preview em múltiplos clientes de email

---

**ÚLTIMO PASSO ANTES DE ENVIAR:**  
✅ Enviar 1 email de teste para si próprio no Gmail e verificar se vai para inbox (não spam/promoções).
