# 📧 EMAIL MARKETING B2B — DRESSME (PROVADOR VIRTUAL COM IA)

## 📦 CONTEÚDO DO PACKAGE

Este package contém tudo o que precisa para enviar uma campanha de email marketing profissional via Google Workspace:

### Ficheiros Incluídos:

1. **`email-marketing-dressme.html`** — Código HTML completo do email (table-based, 600px, inline CSS)
2. **`email-marketing-dressme.txt`** — Versão texto simples (plain-text) equivalente
3. **`email-assuntos-preheaders.md`** — 5 assuntos + 5 preheaders prontos a usar
4. **`checklist-envio-google-workspace.md`** — Checklist completo de entregabilidade
5. **`README-EMAIL-MARKETING.md`** — Este ficheiro (instruções de uso)

---

## 🚀 COMO USAR NO GOOGLE WORKSPACE (GMAIL)

### OPÇÃO 1: Usar Extensão "Insert HTML" (Recomendado)

1. **Instalar extensão:**
   - Chrome Web Store → Procurar "Insert HTML by cloudHQ"
   - Instalar e autorizar acesso ao Gmail

2. **Criar novo email:**
   - Abrir Gmail → Clicar em "Escrever"
   - Clicar no ícone da extensão Insert HTML (no rodapé do compositor)

3. **Inserir código HTML:**
   - Abrir ficheiro `email-marketing-dressme.html`
   - Copiar TODO o conteúdo (Ctrl+A → Ctrl+C)
   - Colar na janela da extensão
   - Clicar "Insert"

4. **Escolher assunto:**
   - Abrir `email-assuntos-preheaders.md`
   - Copiar um dos 5 assuntos sugeridos
   - Colar no campo "Assunto" do Gmail

5. **Adicionar destinatários e enviar:**
   - Campo "Para": adicionar destinatários (máx. 500 de cada vez)
   - Usar "Bcc" para ocultar destinatários entre si
   - **IMPORTANTE:** Fazer envio de teste para si próprio primeiro!

---

### OPÇÃO 2: Usar Google Apps Script (Para Envios em Massa)

Se precisar enviar para +500 destinatários:

1. **Google Sheets:**
   - Criar folha com colunas: `Email` | `Nome` | `Empresa`
   - Preencher com contactos

2. **Apps Script:**
   - Extensões → Apps Script
   - Copiar este código:

```javascript
function enviarEmailMarketing() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var dados = sheet.getDataRange().getValues();
  var htmlTemplate = HtmlService.createHtmlOutputFromFile('email-marketing-dressme').getContent();
  
  // Assunto escolhido (ver email-assuntos-preheaders.md)
  var assunto = "Clientes a experimentar antes de comprar";
  
  for (var i = 1; i < dados.length; i++) { // Começa em 1 para saltar cabeçalho
    var emailDestino = dados[i][0];
    var nome = dados[i][1];
    
    // Personalização opcional (substituir {{nome}} no HTML)
    var htmlPersonalizado = htmlTemplate.replace("{{nome}}", nome);
    
    // Enviar email
    GmailApp.sendEmail(
      emailDestino,
      assunto,
      "Ver versão HTML", // Fallback texto
      {
        htmlBody: htmlPersonalizado,
        name: "TGOO PRO10"
      }
    );
    
    // Pausa para evitar limites (2000/dia)
    Utilities.sleep(2000); // 2 segundos entre emails
  }
}
```

3. **Adicionar HTML:**
   - No Apps Script: Ficheiro → Novo → Ficheiro HTML
   - Nome: `email-marketing-dressme`
   - Colar conteúdo do ficheiro HTML

4. **Executar:**
   - Autorizar permissões
   - Executar função `enviarEmailMarketing()`

⚠️ **ATENÇÃO:** Google Workspace tem limite de **2.000 emails/dia**

---

## 📊 5 ASSUNTOS + PREHEADERS PRONTOS

Abrir ficheiro **`email-assuntos-preheaders.md`** e escolher uma das 5 opções:

| # | Assunto | Preheader |
|---|---------|-----------|
| 1 | Clientes a experimentar antes de comprar | Venda mais e reduza devoluções até 60%... |
| 2 | Reduza devoluções em 60% com este sistema | Provador virtual + imagens profissionais... |
| 3 | 1 foto → catálogo profissional com IA | Transforme fotos simples em imagens premium... |
| 4 | Provador virtual: venda +40% na sua loja | Clientes veem como ficam antes de comprar... |
| 5 | E-commerce que converte (sem mensalidades) | Prova virtual + fotos profissionais automáticas... |

**Recomendação:** Fazer **A/B testing** com 2-3 assuntos diferentes para ver qual converte melhor.

---

## ✅ CHECKLIST ANTES DE ENVIAR

**CRÍTICO — Verificar ficheiro `checklist-envio-google-workspace.md` completo**

### Verificações rápidas obrigatórias:

- [ ] **SPF/DKIM/DMARC configurados** no domínio (tgoo.pt/pro10.pt)
- [ ] **Lista limpa** — Remover contactos inativos e bounces
- [ ] **Teste de spam** — Enviar para mail-tester.com (score mínimo 8/10)
- [ ] **Email de teste** — Enviar para si próprio e verificar inbox (não spam)
- [ ] **Hora estratégica** — Enviar terça-quinta, 10h-11h ou 14h-15h
- [ ] **Opt-out funcional** — Garantir que "REMOVER" no assunto funciona
- [ ] **Reply-To correto** — gomakemoney@tgoo.pt (não usar noreply@)

---

## 🎯 ESPECIFICAÇÕES TÉCNICAS DO EMAIL

### HTML:
- **Largura:** 600px (responsivo simples)
- **Estrutura:** Table-based (máxima compatibilidade)
- **CSS:** 100% inline (sem `<style>` externo)
- **Imagens:** URLs absolutas com ALT text descritivo
- **Links:** Apenas para pro10.pt e tgoo.pt
- **Botões:** Bulletproof buttons (funcionam em todos os clientes)

### Conformidade:
- ✅ **RGPD completo** — Opt-out claro + explicação do porquê do contacto
- ✅ **Sem tracking pixels** — Respeita privacidade
- ✅ **Acessibilidade** — Bom contraste, fonte 15-16px, ALT text
- ✅ **Anti-spam** — Sem palavras-gatilho, ratio texto/imagem equilibrado

### Imagens usadas (URLs pro10.pt):
- Hero antes/depois: `vestido-antes.png` | `vestido-depois.png`
- Catálogo antes/depois: `site-antes.jpeg` | `site-depois.jpeg`
- Logo: `logo-tgoo.svg`

---

## 📈 MÉTRICAS ESPERADAS (BENCHMARKS B2B)

| Métrica | Objetivo | Bom | Excelente |
|---------|----------|-----|-----------|
| **Taxa de abertura** | >18% | >25% | >35% |
| **Taxa de cliques (CTR)** | >2% | >3.5% | >5% |
| **Taxa de bounces** | <3% | <1% | <0.5% |
| **Unsubscribes** | <0.5% | <0.2% | <0.1% |

**Como melhorar:**
- Assunto personalizado com nome da empresa
- Segmentação por setor (moda, calçado, acessórios)
- Follow-up 3-5 dias depois com quem não abriu

---

## 🛠️ FERRAMENTAS ÚTEIS

### Testar Email:
- **Mail Tester** — https://www.mail-tester.com (score de spam)
- **Litmus** — https://litmus.com (preview em múltiplos clientes)
- **Email on Acid** — https://www.emailonacid.com

### Verificar Domínio:
- **MXToolbox** — https://mxtoolbox.com/SuperTool.aspx (SPF/DKIM/DMARC)
- **Google Postmaster Tools** — https://postmaster.google.com (reputação)

### Validar Lista:
- **NeverBounce** — https://neverbounce.com
- **ZeroBounce** — https://www.zerobounce.net

---

## 🔄 PROCESSO COMPLETO DE ENVIO

1. **Preparação** (1-2 dias antes):
   - Limpar lista de contactos
   - Verificar SPF/DKIM/DMARC
   - Testar HTML em mail-tester.com

2. **Teste** (dia do envio):
   - Enviar 1 email de teste para si próprio
   - Verificar inbox, promotions e spam
   - Testar todos os links e botões

3. **Envio** (terça-quinta, 10h-11h):
   - Começar com pequeno lote (50-100 emails)
   - Aguardar 1-2h e verificar métricas
   - Se OK, enviar restantes em lotes de 500

4. **Follow-up** (48h depois):
   - Analisar métricas (abertura, cliques)
   - Processar pedidos de remoção imediatamente
   - Responder a qualquer reply em <24h

5. **Otimização** (1 semana depois):
   - Identificar assunto com melhor abertura
   - Fazer re-envio para quem não abriu (com assunto diferente)
   - Ajustar copy baseado em feedback

---

## ⚠️ ERROS COMUNS A EVITAR

❌ **Enviar tudo de uma vez** — Pode acionar filtros de spam  
✅ **Enviar em lotes progressivos** — 50-100-500-1000...

❌ **Usar "noreply@"** — Prejudica engagement e reputação  
✅ **Usar email real monitorizado** — gomakemoney@tgoo.pt

❌ **Ignorar opt-outs** — Viola RGPD e destrói reputação  
✅ **Processar em <24h** — Automático ou manual

❌ **Comprar listas de emails** — Ilegal (RGPD) e ineficaz  
✅ **Usar apenas opt-ins verificados** — Contactos que deram permissão

❌ **Enviar sexta/fim-de-semana** — Baixa abertura  
✅ **Enviar terça-quinta, 10h-15h** — Horários B2B

---

## 📞 CONTACTOS TGOO (PARA DÚVIDAS)

**TGOO Worldwide S.A.**  
📍 Shopping Massamá - Loja 37, 2745-864 Sintra  
📞 +351 214 373 498 | +351 938 754 488  
📧 gomakemoney@tgoo.pt  
🌐 https://pro10.pt

---

## 📝 NOTAS FINAIS

Este email foi desenvolvido com:
- ✅ Conformidade RGPD total
- ✅ Máxima entregabilidade (inbox, não spam)
- ✅ Copy direto focado em conversão B2B
- ✅ Compatibilidade com todos os clientes de email
- ✅ Responsivo (mobile-friendly)

**Última atualização:** 14 Janeiro 2026  
**Versão:** 1.0  
**Desenvolvido para:** TGOO Worldwide S.A.

---

## 🎓 RECURSOS ADICIONAIS

**Se precisar de ajuda técnica:**
- Google Workspace Admin Help: https://support.google.com/a
- Email Marketing Best Practices: https://mailchimp.com/resources/

**Documentação RGPD:**
- CNPD (Portugal): https://www.cnpd.pt
- Guia de Email Marketing RGPD: https://gdpr.eu/email-marketing/

---

**BOA SORTE COM A CAMPANHA! 🚀**
