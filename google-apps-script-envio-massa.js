/**
 * ========================================================================
 * GOOGLE APPS SCRIPT — ENVIO EM MASSA EMAIL MARKETING DRESSME
 * ========================================================================
 * 
 * INSTRUÇÕES DE USO:
 * 
 * 1. Criar Google Sheets com colunas:
 *    | Email | Nome | Empresa | Status | Data_Envio |
 * 
 * 2. Google Sheets → Extensões → Apps Script
 * 
 * 3. Copiar este código para o editor
 * 
 * 4. Criar ficheiro HTML:
 *    - Ficheiro → Novo → Ficheiro HTML
 *    - Nome: "emailTemplate"
 *    - Colar conteúdo de email-marketing-dressme.html
 * 
 * 5. Configurar variáveis abaixo (ASSUNTO, NOME_REMETENTE, etc.)
 * 
 * 6. Executar função: enviarEmailsEmMassa()
 * 
 * 7. Autorizar permissões quando solicitado
 * 
 * ========================================================================
 */

// ============================================
// CONFIGURAÇÕES (EDITAR AQUI)
// ============================================

const CONFIG = {
  // Assunto do email (escolher de email-assuntos-preheaders.md)
  ASSUNTO: "Clientes a experimentar antes de comprar",
  
  // Nome que aparece como remetente
  NOME_REMETENTE: "TGOO PRO10",
  
  // Email de resposta (Reply-To)
  EMAIL_RESPOSTA: "gomakemoney@tgoo.pt",
  
  // Número máximo de emails por execução (Google Workspace: 2000/dia)
  LIMITE_POR_EXECUCAO: 500,
  
  // Pausa entre emails (milissegundos) — Recomendado: 2000-5000
  PAUSA_ENTRE_EMAILS: 3000, // 3 segundos
  
  // Nome da folha do Google Sheets (aba)
  NOME_FOLHA: "Contactos",
  
  // Colunas (ajustar se necessário)
  COLUNAS: {
    EMAIL: 0,      // Coluna A
    NOME: 1,       // Coluna B
    EMPRESA: 2,    // Coluna C
    STATUS: 3,     // Coluna D
    DATA_ENVIO: 4  // Coluna E
  }
};

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

function enviarEmailsEmMassa() {
  try {
    // Obter folha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.NOME_FOLHA);
    
    if (!sheet) {
      throw new Error(`Folha "${CONFIG.NOME_FOLHA}" não encontrada. Verificar nome da aba.`);
    }
    
    // Obter dados (ignorar cabeçalho)
    const dados = sheet.getDataRange().getValues();
    const cabecalho = dados[0];
    const linhasContactos = dados.slice(1);
    
    // Carregar template HTML
    const htmlTemplate = HtmlService.createTemplateFromFile('emailTemplate').evaluate().getContent();
    
    // Contadores
    let enviados = 0;
    let erros = 0;
    let ignorados = 0;
    
    // Processar cada linha
    for (let i = 0; i < linhasContactos.length; i++) {
      const linha = linhasContactos[i];
      const linhaSheet = i + 2; // +2 porque: +1 cabeçalho, +1 índice base-0
      
      // Extrair dados
      const email = linha[CONFIG.COLUNAS.EMAIL];
      const nome = linha[CONFIG.COLUNAS.NOME] || "";
      const empresa = linha[CONFIG.COLUNAS.EMPRESA] || "";
      const status = linha[CONFIG.COLUNAS.STATUS];
      
      // Verificações
      if (!email || email.trim() === "") {
        Logger.log(`Linha ${linhaSheet}: Email vazio — ignorado`);
        ignorados++;
        continue;
      }
      
      if (status === "Enviado" || status === "Erro" || status === "Removido") {
        Logger.log(`Linha ${linhaSheet}: Status "${status}" — ignorado`);
        ignorados++;
        continue;
      }
      
      if (!validarEmail(email)) {
        Logger.log(`Linha ${linhaSheet}: Email inválido "${email}" — marcado como Erro`);
        sheet.getRange(linhaSheet, CONFIG.COLUNAS.STATUS + 1).setValue("Erro: Email inválido");
        erros++;
        continue;
      }
      
      // Verificar limite
      if (enviados >= CONFIG.LIMITE_POR_EXECUCAO) {
        Logger.log(`Limite de ${CONFIG.LIMITE_POR_EXECUCAO} emails atingido. Parar execução.`);
        break;
      }
      
      // Personalizar HTML
      let htmlPersonalizado = htmlTemplate;
      
      // Substituir placeholders (opcional)
      if (nome) {
        htmlPersonalizado = htmlPersonalizado.replace(/{{nome}}/g, nome);
      }
      if (empresa) {
        htmlPersonalizado = htmlPersonalizado.replace(/{{empresa}}/g, empresa);
      }
      
      // Enviar email
      try {
        GmailApp.sendEmail(
          email,
          CONFIG.ASSUNTO,
          gerarVersaoTexto(), // Fallback texto simples
          {
            htmlBody: htmlPersonalizado,
            name: CONFIG.NOME_REMETENTE,
            replyTo: CONFIG.EMAIL_RESPOSTA,
            noReply: false
          }
        );
        
        // Marcar como enviado
        sheet.getRange(linhaSheet, CONFIG.COLUNAS.STATUS + 1).setValue("Enviado");
        sheet.getRange(linhaSheet, CONFIG.COLUNAS.DATA_ENVIO + 1).setValue(new Date());
        
        enviados++;
        Logger.log(`✓ Linha ${linhaSheet}: Email enviado para ${email}`);
        
        // Pausa entre emails
        Utilities.sleep(CONFIG.PAUSA_ENTRE_EMAILS);
        
      } catch (e) {
        // Registar erro
        sheet.getRange(linhaSheet, CONFIG.COLUNAS.STATUS + 1).setValue("Erro: " + e.message);
        erros++;
        Logger.log(`✗ Linha ${linhaSheet}: Erro ao enviar para ${email} — ${e.message}`);
      }
    }
    
    // Relatório final
    const mensagem = `
==============================================
RELATÓRIO DE ENVIO
==============================================
✓ Enviados:  ${enviados}
✗ Erros:     ${erros}
— Ignorados: ${ignorados}
==============================================
Total processado: ${enviados + erros + ignorados}
Quota restante hoje: ~${2000 - enviados} emails
==============================================
    `;
    
    Logger.log(mensagem);
    
    // Mostrar popup com resultado
    SpreadsheetApp.getUi().alert(
      'Envio Concluído',
      mensagem,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    
  } catch (erro) {
    Logger.log("ERRO FATAL: " + erro.message);
    SpreadsheetApp.getUi().alert(
      'Erro ao Enviar Emails',
      'Ocorreu um erro: ' + erro.message + '\n\nVerificar logs: Ver → Registos',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Validar formato de email
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Gerar versão texto simples (fallback)
 */
function gerarVersaoTexto() {
  return `
====================================================================
DRESSME — PROVADOR VIRTUAL COM IA
====================================================================

PROVADOR VIRTUAL COM IA PARA A SUA LOJA

Venda mais e reduza devoluções — com clientes a "experimentar" 
antes de comprar.

Transforme a sua loja num e-commerce que converte. Basta pendurar 
a peça, tirar 1 FOTO e a IA gera IMAGENS PROFISSIONAIS IMEDIATAS 
+ PROVA VIRTUAL para o cliente ver no corpo.

--------------------------------------------------------------------
EXEMPLOS REAIS DE TRANSFORMAÇÃO
--------------------------------------------------------------------
Veja como a IA transforma as suas fotos instantaneamente:
→ 5 exemplos de antes/depois com resultados profissionais
→ Fotos simples transformadas em catálogo premium
→ Prova virtual que os clientes adoram

--------------------------------------------------------------------
CLIENTES REAIS, RESULTADOS REAIS
--------------------------------------------------------------------
Lojas portuguesas que já estão a usar o DressMe e a vender mais!

3 RESULTADOS IMEDIATOS:
✓ +40% CONVERSÕES — Clientes veem como ficam antes de comprar
✓ -60% DEVOLUÇÕES — Menos surpresas, mais satisfação
✓ +35% TEMPO NO SITE — Experiência interativa que prende

--------------------------------------------------------------------
MODELO PRO10: SEM MENSALIDADES
--------------------------------------------------------------------
Paga UMA VEZ e usa durante 10 ANOS.
Apenas paga o uso da API diretamente ao Google.

€1.660 (IVA incluído)
Até 3 prestações no cartão de crédito

→ Ver demonstração: https://pro10.pt/ia/provador-virtual/
→ Contactar: https://pro10.pt/contactos/

--------------------------------------------------------------------
CONTACTOS
--------------------------------------------------------------------
Telefone: +351 214 373 498 | +351 938 754 488
Email: gomakemoney@tgoo.pt

TGOO Worldwide S.A. | NIF 514005041
Shopping Massamá - Loja 37, 2745-864 Sintra, Portugal

Não quer receber mais emails? Responda com "REMOVER" no assunto.
====================================================================
  `;
}

// ============================================
// FUNÇÕES DE GESTÃO
// ============================================

/**
 * Testar envio para 1 email específico
 */
function testarEnvioUnico() {
  const EMAIL_TESTE = "gomakemoney@tgoo.pt"; // EDITAR AQUI
  
  try {
    const htmlTemplate = HtmlService.createTemplateFromFile('emailTemplate').evaluate().getContent();
    
    GmailApp.sendEmail(
      EMAIL_TESTE,
      "[TESTE] " + CONFIG.ASSUNTO,
      gerarVersaoTexto(),
      {
        htmlBody: htmlTemplate,
        name: CONFIG.NOME_REMETENTE,
        replyTo: CONFIG.EMAIL_RESPOSTA
      }
    );
    
    SpreadsheetApp.getUi().alert(
      'Teste Enviado',
      `Email de teste enviado para: ${EMAIL_TESTE}\n\nVerificar inbox e spam.`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    
  } catch (e) {
    SpreadsheetApp.getUi().alert('Erro', 'Falha ao enviar teste: ' + e.message, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * Verificar quota de emails disponível
 */
function verificarQuotaDisponivel() {
  const quotaRestante = MailApp.getRemainingDailyQuota();
  
  SpreadsheetApp.getUi().alert(
    'Quota de Emails',
    `Emails restantes hoje: ${quotaRestante}\n\nLimite Google Workspace: 2.000/dia\nLimite gratuito: 100/dia`,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
  
  Logger.log(`Quota restante: ${quotaRestante}`);
}

/**
 * Resetar status de todos os contactos (CUIDADO!)
 */
function resetarTodosStatus() {
  const ui = SpreadsheetApp.getUi();
  const resposta = ui.alert(
    'Confirmação',
    'Tem certeza que quer RESETAR todos os status?\n\nIsso permitirá re-enviar emails para toda a lista.',
    ui.ButtonSet.YES_NO
  );
  
  if (resposta === ui.Button.YES) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.NOME_FOLHA);
    const ultimaLinha = sheet.getLastRow();
    
    // Limpar colunas Status e Data_Envio (ignorar cabeçalho)
    sheet.getRange(2, CONFIG.COLUNAS.STATUS + 1, ultimaLinha - 1, 1).clearContent();
    sheet.getRange(2, CONFIG.COLUNAS.DATA_ENVIO + 1, ultimaLinha - 1, 1).clearContent();
    
    ui.alert('Concluído', 'Todos os status foram resetados.', ui.ButtonSet.OK);
  }
}

/**
 * Marcar contactos que pediram remoção
 */
function marcarComoRemovido() {
  const ui = SpreadsheetApp.getUi();
  const resposta = ui.prompt(
    'Marcar como Removido',
    'Introduzir email do contacto que pediu remoção:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (resposta.getSelectedButton() === ui.Button.OK) {
    const emailRemover = resposta.getResponseText().trim().toLowerCase();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.NOME_FOLHA);
    const dados = sheet.getDataRange().getValues();
    
    let encontrado = false;
    
    for (let i = 1; i < dados.length; i++) {
      const emailLinha = dados[i][CONFIG.COLUNAS.EMAIL].toString().trim().toLowerCase();
      
      if (emailLinha === emailRemover) {
        sheet.getRange(i + 1, CONFIG.COLUNAS.STATUS + 1).setValue("Removido");
        sheet.getRange(i + 1, CONFIG.COLUNAS.DATA_ENVIO + 1).setValue(new Date());
        encontrado = true;
        break;
      }
    }
    
    if (encontrado) {
      ui.alert('Concluído', `Email "${emailRemover}" marcado como Removido.`, ui.ButtonSet.OK);
    } else {
      ui.alert('Não Encontrado', `Email "${emailRemover}" não encontrado na lista.`, ui.ButtonSet.OK);
    }
  }
}

// ============================================
// MENU PERSONALIZADO
// ============================================

/**
 * Criar menu personalizado ao abrir folha
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('📧 Email Marketing')
    .addItem('✉️ Enviar Emails em Massa', 'enviarEmailsEmMassa')
    .addSeparator()
    .addItem('🧪 Testar Envio Único', 'testarEnvioUnico')
    .addItem('📊 Verificar Quota Disponível', 'verificarQuotaDisponivel')
    .addSeparator()
    .addItem('🚫 Marcar Contacto como Removido', 'marcarComoRemovido')
    .addItem('🔄 Resetar Todos os Status', 'resetarTodosStatus')
    .addToUi();
}

// ============================================
// TRIGGER AUTOMÁTICO (OPCIONAL)
// ============================================

/**
 * Configurar trigger para envio automático diário
 * 
 * INSTRUÇÕES:
 * 1. Descomentar código abaixo
 * 2. Executar função: criarTriggerDiario()
 * 3. Autorizar permissões
 * 4. Emails serão enviados automaticamente todos os dias às 10h
 */

/*
function criarTriggerDiario() {
  // Remover triggers existentes
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Criar novo trigger diário às 10h
  ScriptApp.newTrigger('enviarEmailsEmMassa')
    .timeBased()
    .atHour(10)
    .everyDays(1)
    .create();
  
  SpreadsheetApp.getUi().alert(
    'Trigger Criado',
    'Emails serão enviados automaticamente todos os dias às 10h.\n\nPara cancelar, executar: removerTriggers()',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function removerTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  SpreadsheetApp.getUi().alert(
    'Triggers Removidos',
    'Envio automático cancelado.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}
*/

// ============================================
// FIM DO SCRIPT
// ============================================

/**
 * NOTAS IMPORTANTES:
 * 
 * 1. LIMITE GOOGLE WORKSPACE: 2.000 emails/dia
 *    Limite gratuito (@gmail.com): 100/dia
 * 
 * 2. AQUECIMENTO: Começar com 50-100 emails/dia durante 1-2 semanas
 *    Aumentar gradualmente até 500-1000/dia
 * 
 * 3. MONITORIZAÇÃO: Verificar bounces e unsubscribes diariamente
 *    Se bounces >3%, PARAR e limpar lista
 * 
 * 4. RGPD: Processar opt-outs em <24h
 *    Usar função marcarComoRemovido()
 * 
 * 5. BACKUP: Fazer cópia do Google Sheets antes de envios em massa
 * 
 * 6. SUPORTE: gomakemoney@tgoo.pt
 */
