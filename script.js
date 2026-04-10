const DAYS = {
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira"
};

const agendaItems = [
  {
    area: "Segurança",
    title: "DDS",
    frequency: "4x semana",
    days: [2, 3, 4, 5],
    links: [{ label: "Abrir pasta", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\PUBLICO\\Segurança\\7. DDS - PRODUÇÃO" }]
  },
  {
    area: "Segurança",
    title: "BBO",
    frequency: "Mensal - 1ª semana do mês",
    days: [1],
    monthlyFirstWeek: true,
    note: "Link pendente: controle BBO ainda não localizado.",
    links: []
  },
  {
    area: "Qualidade",
    title: "PFMEA",
    frequency: "Mensal - 1ª semana do mês",
    days: [2],
    monthlyFirstWeek: true,
    links: [{ label: "Cronograma PFMEA", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\PUBLICO\\PFMEA\\Administrativa\\2026\\CRONOGRAMA PFMEA 2026" }]
  },
  {
    area: "Qualidade",
    title: "SAC",
    frequency: "Semanal",
    days: [1],
    links: [{ label: "Controle de SAC", url: "https://app.powerbi.com/groups/me/apps/c2d998d3-38ee-44a2-b33a-dbc646d1d9ad/reports/6fd9648b-4113-4030-b981-8733ed6f06ad/3c8e3f2beef0c4e225a6ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&experience=power-bi" }]
  },
  {
    area: "Produtividade",
    title: "Gestão de Ações - Montagem PC/CM12 (Celso / Felipe)",
    frequency: "Semanal",
    days: [2],
    links: [{ label: "Gestão de Ações", url: "https://app.powerbi.com/groups/me/apps/77b9df0c-9b23-471b-bfa0-5fa118edb48a/reports/a43f5405-26aa-4e5c-ac0b-dd1c949bc806/ReportSection?ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&experience=power-bi" }]
  },
  {
    area: "Produtividade",
    title: "Gestão de Ações - Montagem CV (João / Luiz)",
    frequency: "Semanal",
    days: [3],
    links: [{ label: "Gestão de Ações", url: "https://app.powerbi.com/groups/me/apps/77b9df0c-9b23-471b-bfa0-5fa118edb48a/reports/a43f5405-26aa-4e5c-ac0b-dd1c949bc806/ReportSection?ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&experience=power-bi" }]
  },
  {
    area: "Produtividade",
    title: "Gestão de Ações - Usinagem (Darlan / Rodrigo)",
    frequency: "Semanal",
    days: [4],
    links: [{ label: "Gestão de Ações", url: "https://app.powerbi.com/groups/me/apps/77b9df0c-9b23-471b-bfa0-5fa118edb48a/reports/a43f5405-26aa-4e5c-ac0b-dd1c949bc806/ReportSection?ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&experience=power-bi" }]
  },
  {
    area: "Produtividade",
    title: "Gestão de Ações - Morse / Thermal (Fábio / Axel)",
    frequency: "Semanal",
    days: [5],
    links: [{ label: "Gestão de Ações", url: "https://app.powerbi.com/groups/me/apps/77b9df0c-9b23-471b-bfa0-5fa118edb48a/reports/a43f5405-26aa-4e5c-ac0b-dd1c949bc806/ReportSection?ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&experience=power-bi" }]
  },
  {
    area: "Produtividade",
    title: "Gestão de Ações - Escalonadas em Nível 2 e Nível 3",
    frequency: "Mensal - 1ª semana do mês",
    days: [3],
    monthlyFirstWeek: true,
    links: [{ label: "Gestão de Ações", url: "https://app.powerbi.com/groups/me/apps/77b9df0c-9b23-471b-bfa0-5fa118edb48a/reports/a43f5405-26aa-4e5c-ac0b-dd1c949bc806/ReportSection?ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&experience=power-bi" }]
  },
  {
    area: "Produtividade",
    title: "Horas Extras",
    frequency: "Semanal",
    days: [4],
    note: "Quem tiver hora extra, por favor enviar solicitação.",
    links: []
  },
  {
    area: "Melhoria Contínua",
    title: "Treinamentos via LMS",
    frequency: "Mensal - 1ª semana do mês",
    days: [5],
    monthlyFirstWeek: true,
    links: [{ label: "Controle LMS", url: "https://borgwarner-my.sharepoint.com/:x:/p/rcerchiari/IQDY-ncysZCOT6xeh3tFdekKAYPn4EwT5IbM-MA_WVBy7hQe=mPKkog&CID=3BD3BFED-797C-4ADF-8293-8BFBE5CA803B&wdLOR=c680A1FED-7311-4BDA-9C79-1607D405C14C" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Redução índice de refugo (Linhas de CV) - Luiz Kumagai",
    frequency: "Semanal",
    days: [4],
    links: [{ label: "Controle refugo", url: "https://app.powerbi.com/groups/me/apps/2dfba8c2-6aac-4987-ba39-db97e2d8c33d/reports/0e20c425-6ddf-4ac3-98bf-1ca7f19b941a/ReportSection?ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&disableBranding=1&experience=power-bi" }]
  },
  {
    area: "Melhoria Contínua",
    title: "HEIJUNKA - Balanceamento de células - Caio Pinho",
    frequency: "Semanal",
    days: [2],
    links: [
      { label: "Pasta projeto", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\74 - Process Mapping (CV&US&MORSE&THER)\\2026" },
      { label: "Power BI", url: "https://app.powerbi.com/groups/me/reports/262bb859-d86a-41bf-bb51-d200ead90108/8ef3a193b87e7cd0077cexperience=power-bi" }
    ]
  },
  {
    area: "Melhoria Contínua",
    title: "Report Saving Projetos - Caio Pinho",
    frequency: "Semanal",
    days: [3],
    links: [{ label: "Dash reporte", url: "https://app.powerbi.com/groups/me/apps/c2d998d3-38ee-44a2-b33a-dbc646d1d9ad/reports/d0080093-7897-4ef5-8871-552fb134e0bf/490058da37250deb69b6ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&experience=power-bi" }]
  },
  {
    area: "Melhoria Contínua",
    title: "SMED - Redução tempo de setup - Caio Pinho",
    frequency: "Semanal",
    days: [3],
    links: [{ label: "SMED", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\12 SMED Project\\SMED - TTT System\\2026" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Unificação BL24 e BL37 (remoção BL24) - Darlan Silva",
    frequency: "Semanal",
    days: [4],
    links: []
  },
  {
    area: "Melhoria Contínua",
    title: "Nova balanceadora S&W EBW1 - Darlan Silva",
    frequency: "Semanal",
    days: [4],
    note: "Link pendente: pasta projeto ainda não informada.",
    links: []
  },
  {
    area: "Melhoria Contínua",
    title: "Unificação TA38/56 - TA60/61 - Rodrigo Vieira",
    frequency: "Semanal",
    days: [5],
    note: "Link pendente: pasta projeto ainda não informada.",
    links: []
  },
  {
    area: "Melhoria Contínua",
    title: "Eliminação processo de balanceamento rotor PC (BL37) - Rodrigo Vieira",
    frequency: "Semanal",
    days: [5],
    note: "Link pendente: pasta projeto ainda não informada.",
    links: []
  },
  {
    area: "Melhoria Contínua",
    title: "Unificação 3 células da Carcaça Central para 2 células - Rodrigo Vieira",
    frequency: "Semanal",
    days: [5],
    note: "Link pendente: pasta projeto ainda não informada.",
    links: []
  },
  {
    area: "Melhoria Contínua",
    title: "Implementação UPAM Box (CM03, CM04, CM09 e CM10) - João Sebode",
    frequency: "Semanal",
    days: [1],
    links: [{ label: "Pasta projeto", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\54 Projetos ETTS\\129 - UPAM Box Itatiba Validation" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Melhoria de OEE nas BLs CEMB (refugo) - Celso Benjamin",
    frequency: "Semanal",
    days: [1],
    links: [{ label: "Painel", url: "http://rzevssql23.rzeszow.turbos.borgwarner.net:3000/d/ff99f813-fbe8-4660-9e9b-87e320944f4a/painel-de-gestao-balanceadorasorgId=3&from=now-6h&to=now&timezone=browser&refresh=2h&showCategory=Repeat%20options" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Implementação Volvo VTG (P3390) na CM12 - Celso Benjamin",
    frequency: "Semanal",
    days: [4],
    links: [{ label: "Cronograma", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\15 APQP\\2025\\04. VOLVO VTG" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Linha HR10 (CM17) - Felipe Simenez",
    frequency: "Semanal",
    days: [1],
    links: [{ label: "Cronograma", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\54 Projetos ETTS\\145 - HR10 Rzeszow - Itatiba\\1 - Cronograma" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Unificação células AFTER (CMA e CMB) - João Sebode",
    frequency: "Semanal",
    days: [2],
    links: [{ label: "Pasta projeto", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\54 Projetos ETTS\\152 - Unificação células AFTER (CMA e CMB)" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Máquina automática de envelopamento (filme Stretch) - João Sebode",
    frequency: "Semanal",
    days: [1],
    links: [{ label: "Pasta projeto", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\54 Projetos ETTS\\151 - Máquina automática de envelopamento (filme Stretch)" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Realocar small parts próximo a linhas de CV - Luiz Kumagai",
    frequency: "Semanal",
    days: [3],
    links: [{ label: "Pasta projeto", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\54 Projetos ETTS\\150 - Transferência do Mercadinho para as Células de CV" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Redução quantidade de chamados MEP - Tadeu Pereira / Felipe Winck",
    frequency: "Semanal",
    days: [2],
    links: [{ label: "Pasta projeto", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\54 Projetos ETTS\\140 - Controle de Chamados" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Digitalização (eliminação de papel) - Renato Morais",
    frequency: "Semanal",
    days: [4],
    links: [{ label: "Pasta projeto", url: "\\\\enterprise.borgwarner.net\\shares\\ITA\\MANUFATURA\\ENG. MANUFATURA\\54 Projetos ETTS\\153 - Digitalização da Usinagem" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Handover",
    frequency: "Semanal",
    days: [3],
    links: [{ label: "Handover", url: "https://borgwarner.sharepoint.com/:x:/r/teams/msteams_d09917/Shared%20Documents/ETTS_Program%20Open%20Issues%20List/BWS%2055011-06%20-%20MER%20Swim%20Lane/100_HandOver%20Forms%20(PIG7.3-09)/HandOvers%20Manufatura%20-%20Controle.xlsxd=w0a17e746e3ff43fa834fa9ad78611f98&csf=1&web=1&e=3FYTEe&wdLOR=cDEE6F5D5-699D-44AE-91E3-D4ACDA154EF6" }]
  },
  {
    area: "Melhoria Contínua",
    title: "Controle depósito MEP - Caio Pinho",
    frequency: "Semanal",
    days: [5],
    links: [{ label: "Power BI", url: "https://app.powerbi.com/groups/me/reports/57e25916-638c-4e37-a646-f7f71b3b9dd1/94274339dbd572f883f1experience=power-bi" }]
  },
  {
    area: "Melhoria Contínua",
    title: "PIT",
    frequency: "Semanal",
    days: [5],
    links: [{ label: "PIT", url: "https://app.powerbi.com/groups/me/apps/c2d998d3-38ee-44a2-b33a-dbc646d1d9ad/reports/d91575a1-027b-476d-87cb-845bd9299dc6/ReportSection?ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3&experience=power-bi" }]
  },
  {
    area: "Férias",
    title: "Cronograma de Férias",
    frequency: "Semanal",
    days: [1],
    links: [{ label: "Controle férias", url: "https://borgwarner-my.sharepoint.com/:x:/r/personal/rcerchiari_borgwarner_com/_layouts/15/Doc.aspxsourcedoc=%7BA29F71D7-9FF4-4B86-9F28-BA226A0B3CF4%7D&file=Controle%20F%25u00e9rias%20MEP%20(5).xlsx&nav=MTVfe0UwQjhERTQyLUNEQjAtNEY4MS1CQ0E4LTdDMDMyRUQ3RDE0OH0&action=default&mobileredirect=true&wdLOR=cEB36A3E3-BAC5-454F-874A-088A9E1E9A79" }]
  },
  {
    area: "Motivação",
    title: "Mensagem Motivacional - Time",
    frequency: "Semanal",
    days: [1],
    links: []
  }
];

const powerBiConfig = {
  title: "Indicadores Fixos da Reunião",
  subtitle: "Painéis permanentes de acompanhamento da manufatura.",
  embeds: [
    { label: "Incidentes e Acidentes", url: "https://app.powerbi.com/reportEmbed?reportId=a613922a-6aa9-4d0b-a08d-89ad34a4dd97&appId=52078303-0901-4553-a5e5-8a10a7182946&autoAuth=true&ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3" },
    { label: "Controle de SAC", url: "https://app.powerbi.com/reportEmbed?reportId=c85896fc-f4df-4d07-bc4b-d748e7da1433&appId=c2d998d3-38ee-44a2-b33a-dbc646d1d9ad&autoAuth=true&ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3" },
    { label: "Dashboard OEE", url: "https://app.powerbi.com/reportEmbed?reportId=d966fc20-91e7-47c4-aa7e-97a19bcbc807&appId=2dfba8c2-6aac-4987-ba39-db97e2d8c33d&autoAuth=true&ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3" },
    { label: "Dashboard Retrabalho", url: "https://app.powerbi.com/reportEmbed?reportId=06e7c078-2ea4-4427-bd6b-82ce4e7982d5&appId=2dfba8c2-6aac-4987-ba39-db97e2d8c33d&autoAuth=true&ctid=9f904e8a-2bf7-4b81-ac8a-a560eae844b3" },
    { label: "Performance por Responsável", url: "" }
  ]
};

const GD_STORAGE_KEY = "gd_action_items_v1";
const gdItems = loadGdItems();
const AGENDA_CHECK_STORAGE_KEY = "gd_agenda_checks_v1";
const checkedAgendaItems = loadCheckedAgendaItems();
resetAgendaChecks();

let selectedDay = getInitialDay();
let showingAll = false;
let selectedBiIndex = 0;

const agendaList = document.querySelector("#agendaList");
const selectedDayTitle = document.querySelector("#selectedDayTitle");
const todayText = document.querySelector("#todayText");
const currentDayName = document.querySelector("#currentDayName");
const monthRuleText = document.querySelector("#monthRuleText");
const totalItems = document.querySelector("#totalItems");
const totalLinks = document.querySelector("#totalLinks");
const showAllButton = document.querySelector("#showAllButton");
const toast = document.querySelector("#toast");
const biPanelTitle = document.querySelector("#biPanelTitle");
const biPanelSubtitle = document.querySelector("#biPanelSubtitle");
const biHelpText = document.querySelector("#biHelpText");
const biTabs = document.querySelector("#biTabs");
const biToolbar = document.querySelector("#biToolbar");
const biCurrentDay = document.querySelector("#biCurrentDay");
const biOpenLink = document.querySelector("#biOpenLink");
const biFrameWrap = document.querySelector("#biFrameWrap");
const biFrame = document.querySelector("#biFrame");
const biEmpty = document.querySelector("#biEmpty");
const gdForm = document.querySelector("#gdForm");
const gdTema = document.querySelector("#gdTema");
const gdAssunto = document.querySelector("#gdAssunto");
const gdAcao = document.querySelector("#gdAcao");
const gdResponsavel = document.querySelector("#gdResponsavel");
const gdPrazo = document.querySelector("#gdPrazo");
const gdStatus = document.querySelector("#gdStatus");
const gdTableBody = document.querySelector("#gdTableBody");
const gdEmpty = document.querySelector("#gdEmpty");

document.querySelectorAll(".day-button").forEach((button) => {
  button.addEventListener("click", () => {
    resetAgendaChecks();
    selectedDay = Number(button.dataset.day);
    selectedBiIndex = 0;
    showingAll = false;
    render();
  });
});

showAllButton.addEventListener("click", () => {
  showingAll = !showingAll;
  render();
});

biTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-bi-index]");
  if (!button) {
    return;
  }
  selectedBiIndex = Number(button.dataset.biIndex);
  renderPowerBiControls();
});

gdForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = {
    id: Date.now().toString(36),
    tema: gdTema.value.trim(),
    assunto: gdAssunto.value.trim(),
    acao: gdAcao.value.trim(),
    responsavel: gdResponsavel.value.trim(),
    prazo: gdPrazo.value,
    status: gdStatus.value
  };

  if (!item.tema || !item.assunto || !item.acao || !item.responsavel || !item.prazo) {
    showToast("Preencha os campos obrigatorios do plano GD.");
    return;
  }

  gdItems.unshift(item);
  persistGdItems();
  gdForm.reset();
  gdStatus.value = "Aberto";
  renderGdTable();
  showToast("Item incluido no plano GD.");
});
render();

function getInitialDay() {
  const browserDay = new Date().getDay();
  if (browserDay >= 1 && browserDay <= 5) {
    return browserDay;
  }
  return 1;
}

function isFirstWeekOfMonth(date = new Date()) {
  return date.getDate() <= 7;
}

function shouldShowItem(item, day) {
  if (!item.days.includes(day)) {
    return false;
  }
  if (item.monthlyFirstWeek && !isFirstWeekOfMonth()) {
    return false;
  }
  return true;
}

function render() {
  const today = new Date();
  const todayDay = getInitialDay();
  const isFirstWeek = isFirstWeekOfMonth(today);
  let visibleItems = showingAll
    ? agendaItems.filter((item) => item.days.length > 0)
    : agendaItems.filter((item) => shouldShowItem(item, selectedDay));
  visibleItems = sortAgendaItemsForDisplay(visibleItems);

  todayText.textContent = `Abra a reunião e vá direto nos temas de ${DAYS[todayDay]}. Os itens mensais aparecem automaticamente na primeira semana do mês.`;
  currentDayName.textContent = DAYS[todayDay];
  monthRuleText.textContent = isFirstWeek ? "Primeira semana: itens mensais liberados." : "Itens mensais ficam ocultos fora da primeira semana.";
  selectedDayTitle.textContent = showingAll ? "Todos os itens com dia definido" : DAYS[selectedDay];
  showAllButton.textContent = showingAll ? "Voltar ao dia" : "Ver todos";

  document.querySelectorAll(".day-button").forEach((button) => {
    button.classList.toggle("active", !showingAll && Number(button.dataset.day) === selectedDay);
  });

  totalItems.textContent = visibleItems.length;
  totalLinks.textContent = visibleItems.reduce((sum, item) => sum + (Array.isArray(item.links) ? item.links.length : 0), 0);

  agendaList.innerHTML = visibleItems.length
    ? visibleItems.map((item) => createCard(item)).join("")
    : `<div class="empty-state">Nenhum item programado para este dia.</div>`;

  agendaList.querySelectorAll("[data-copy]").forEach(bindCopyButton);
  agendaList.querySelectorAll("[data-network-path]").forEach(bindNetworkPathButton);
  agendaList.querySelectorAll("[data-mark-done]").forEach(bindMarkDoneLink);
  renderPowerBiControls();
  renderGdTable();
}

function createCard(item) {
  const itemId = getAgendaItemId(item);
  const isDone = checkedAgendaItems.has(itemId);
  const links = (Array.isArray(item.links) ? item.links : []).map((link) => createLinkButton({ ...link, itemId })).join("");
  const daysText = item.days.length ? item.days.map((day) => DAYS[day].replace("-feira", "")).join(", ") : "Dia a confirmar";
  const note = item.note ? `<span class="item-note">${escapeHtml(item.note)}</span>` : "";
  const areaClass = `area-${normalizeToken(item.area)}`;

  return `
    <article class="agenda-card ${isDone ? "is-done" : ""}">
      <div><span class="area-pill ${areaClass}">${escapeHtml(item.area)}</span></div>
      <div>
        <p class="item-title">${escapeHtml(item.title)}</p>
        <p class="item-meta">${escapeHtml(item.frequency)} | ${escapeHtml(daysText)}${note}</p>
      </div>
      <div class="actions">
        ${links || `<span class="item-meta">Sem link</span>`}
      </div>
    </article>
  `;
}

function createLinkButton(link) {
  const url = normalizeUrl(link.url);
  const isNetworkPath = link.url.startsWith("\\\\");
  const openButton = isNetworkPath
    ? `<button class="action-button" type="button" data-network-path="${escapeAttribute(link.url)}" data-mark-done="1" data-item-id="${escapeAttribute(link.itemId || "")}">${escapeHtml(link.label)}</button>`
    : `<a class="action-button" href="${escapeAttribute(url)}" target="_blank" rel="noreferrer" data-mark-done="1" data-item-id="${escapeAttribute(link.itemId || "")}">${escapeHtml(link.label)}</a>`;

  return `
    ${openButton}
    <button class="action-button copy" type="button" data-copy="${escapeAttribute(link.url)}" data-item-id="${escapeAttribute(link.itemId || "")}">Copiar</button>
  `;
}

function normalizeUrl(url) {
  if (url.startsWith("\\\\")) {
    return `file://///${url.slice(2).replaceAll("\\", "/")}`;
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return repairWebUrl(url);
  }
  return `https://${url}`;
}

function repairWebUrl(url) {
  let fixed = url;
  const firstParamCandidates = ["reportId=", "ctid=", "orgId=", "sourcedoc=", "d=", "e=", "experience=", "appId="];
  if (!fixed.includes("?")) {
    for (const key of firstParamCandidates) {
      const idx = fixed.indexOf(key);
      if (idx > 0) {
        fixed = `${fixed.slice(0, idx)}?${fixed.slice(idx)}`;
        break;
      }
    }
  }
  fixed = fixed.replace("ReportSectionctid=", "ReportSection?ctid=");
  fixed = fixed.replace("reportEmbedreportId=", "reportEmbed?reportId=");
  fixed = fixed.replace(".xlsxd=", ".xlsx?d=");
  fixed = fixed.replace(".aspxsourcedoc=", ".aspx?sourcedoc=");
  return fixed;
}

function bindCopyButton(button) {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    const isNetworkPath = value.startsWith("\\\\");
    try {
      await navigator.clipboard.writeText(value);
      showToast(isNetworkPath ? "Caminho copiado. Pressione Win+R, Ctrl+V e Enter." : "Link copiado.");
    } catch {
      showToast(value);
    }
  });
}

function bindNetworkPathButton(button) {
  button.addEventListener("click", async () => {
    const value = button.dataset.networkPath;
    setAgendaItemDone(button.dataset.itemId, true);
    try {
      await navigator.clipboard.writeText(value);
      showToast("Caminho copiado. Abra no Explorer com Win+R, Ctrl+V e Enter.");
    } catch {
      showToast(value);
    }
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function bindMarkDoneLink(element) {
  element.addEventListener("click", () => {
    setAgendaItemDone(element.dataset.itemId, true);
    render();
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function normalizeToken(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getAgendaItemId(item) {
  return `${item.area}|${item.title}|${(item.days || []).join(",")}`;
}

function loadCheckedAgendaItems() {
  try {
    const saved = localStorage.getItem(AGENDA_CHECK_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function persistCheckedAgendaItems() {
  localStorage.setItem(AGENDA_CHECK_STORAGE_KEY, JSON.stringify([...checkedAgendaItems]));
}

function resetAgendaChecks() {
  checkedAgendaItems.clear();
  persistCheckedAgendaItems();
}

function setAgendaItemDone(itemId, done) {
  if (!itemId) return;
  if (done) {
    checkedAgendaItems.add(itemId);
  } else {
    checkedAgendaItems.delete(itemId);
  }
  persistCheckedAgendaItems();
}

function sortAgendaItemsForDisplay(items) {
  if (selectedDay !== 1 || showingAll) {
    return items;
  }
  const priority = { seguranca: 0, qualidade: 1 };
  return [...items].sort((a, b) => {
    const pa = priority[normalizeToken(a.area)] ?? 9;
    const pb = priority[normalizeToken(b.area)] ?? 9;
    if (pa !== pb) return pa - pb;
    return a.title.localeCompare(b.title, "pt-BR");
  });
}

function renderPowerBiControls() {
  const embeds = powerBiConfig.embeds || [];
  const hasTabs = embeds.length > 1;

  biPanelTitle.textContent = powerBiConfig.title;
  biPanelSubtitle.textContent = powerBiConfig.subtitle || "";
  biHelpText.textContent = hasTabs
    ? "Dashboards fixos da reunião. Escolha o painel na aba."
    : "Painel fixo da reunião.";

  if (selectedBiIndex >= embeds.length) {
    selectedBiIndex = 0;
  }
  if (selectedBiIndex < 0) {
    selectedBiIndex = 0;
  }

  biTabs.hidden = !hasTabs;
  biTabs.innerHTML = hasTabs
    ? embeds
      .map((embed, index) => `
        <button class="bi-tab ${index === selectedBiIndex ? "active" : ""}" type="button" data-bi-index="${index}">
          ${escapeHtml(embed.label || `Indicador ${index + 1}`)}
        </button>
      `)
      .join("")
    : "";

  applyPowerBi();
}

function applyPowerBi() {
  const selectedEmbed = getSelectedEmbed();
  const url = buildPowerBiUrl(selectedEmbed);
  const selectedLabel = selectedEmbed?.label || "Indicador";

  biCurrentDay.textContent = `Dashboard | ${selectedLabel}`;
  if (!url) {
    biToolbar.hidden = true;
    biFrameWrap.hidden = true;
    biOpenLink.href = "#";
    biFrame.removeAttribute("src");
    biEmpty.textContent = `${selectedLabel}: indicador indisponível no momento.`;
    biEmpty.hidden = false;
    return;
  }

  biToolbar.hidden = false;
  biFrameWrap.hidden = false;
  biEmpty.hidden = true;
  biOpenLink.href = url;
  if (biFrame.src !== url) {
    biFrame.src = url;
  }
}

function buildPowerBiUrl(embedItem) {
  const rawUrl = (embedItem?.url || "").trim();
  if (!rawUrl) {
    return "";
  }
  return rawUrl;
}

function getSelectedEmbed() {
  const embeds = powerBiConfig.embeds || [];
  if (!embeds.length) {
    return null;
  }
  if (selectedBiIndex < 0 || selectedBiIndex >= embeds.length) {
    selectedBiIndex = 0;
  }
  return embeds[selectedBiIndex];
}

function loadGdItems() {
  try {
    const saved = localStorage.getItem(GD_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistGdItems() {
  localStorage.setItem(GD_STORAGE_KEY, JSON.stringify(gdItems));
}

function renderGdTable() {
  gdTableBody.innerHTML = gdItems.map((item) => `
    <tr>
      <td>${escapeHtml(item.tema || "")}</td>
      <td>${escapeHtml(item.assunto || "")}</td>
      <td>${escapeHtml(item.acao || "")}</td>
      <td>${escapeHtml(item.responsavel || "")}</td>
      <td>${escapeHtml(item.prazo || "")}</td>
      <td>
        <select class="gd-status" data-gd-status="${escapeAttribute(item.id)}">
          ${["Aberto", "Em andamento", "Finalizado"]
            .map((status) => `<option ${status === item.status ? "selected" : ""}>${status}</option>`)
            .join("")}
        </select>
      </td>
      <td>
        <button class="gd-delete" type="button" data-gd-delete="${escapeAttribute(item.id)}">Excluir</button>
      </td>
    </tr>
  `).join("");

  gdEmpty.hidden = gdItems.length > 0;

  gdTableBody.querySelectorAll("[data-gd-status]").forEach((select) => {
    select.addEventListener("change", () => {
      const target = gdItems.find((row) => row.id === select.dataset.gdStatus);
      if (!target) return;
      target.status = select.value;
      persistGdItems();
      showToast("Status atualizado.");
    });
  });

  gdTableBody.querySelectorAll("[data-gd-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = gdItems.findIndex((row) => row.id === button.dataset.gdDelete);
      if (index < 0) return;
      gdItems.splice(index, 1);
      persistGdItems();
      renderGdTable();
      showToast("Item excluido do plano GD.");
    });
  });
}
