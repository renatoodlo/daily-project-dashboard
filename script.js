const USERS = [
  {
    email: "remorais@borgwarner.com",
    password: "teste",
    name: "Renato Morais",
    role: "collaborator"
  },
  {
    email: "fsiqueira@borgwarner.com",
    password: "teste",
    name: "Felipe Siqueira",
    role: "manager"
  }
];

const DEFAULT_STAGE_TEMPLATE = [
  "Criação de cronograma",
  "Criação do A3 (Time + Metas + Objetivos)",
  "Kickoff com Time Multifuncional",
  "Abertura de CM2",
  "Abertura do Formulário de Aprovação de Máquinas",
  "Haverá necessidade de alteração de Layout?",
  "Haverá necessidade do Cliente ser notificado ou não?",
  "Caderno de especificações técnicas",
  "Solicitação de orçamentos",
  "Recebimento de orçamentos",
  "Aprovação de requisições de compra",
  "Envio de pedido ao fornecedor",
  "Revisão do pre-design (MEP)",
  "Revisão final do design (time multifuncional)",
  "Início da construção / fabricação",
  "Requisição para LOG de peças para tryout",
  "Montagem das peças de tryout",
  "Visita técnica ao fornecedor para FUP (visita 1)",
  "Visita técnica ao fornecedor para FUP (visita 2)",
  "Visita técnica ao fornecedor para FUP (visita 3)",
  "Visita técnica ao fornecedor para FUP (visita 4)",
  "Visita técnica ao fornecedor para FUP (visita 5)",
  "Envio das peças de tryout ao fornecedor",
  "Visita técnica ao fornecedor para tryout",
  "Visita técnica ao fornecedor para validação de estudos",
  "Visita ao fornecedor para validação de processo (time multifuncional)",
  "Planejamento para entrega na Borgwarner (orçar carga/descarga?)",
  "Planejamento para entrega na Borgwarner (Segurança e Recebimento?)",
  "Entrega da Máquina",
  "Estudos de validação na Borgwarner",
  "Aprovação/validação de processo com time multifuncional",
  "Treinamento para os envolvidos dos 3 turnos",
  "Integração de Atividades assinada pelos envolvidos dos 3 turnos",
  "Validação com cliente na Borgwarner",
  "Aprovação do cliente para produzir",
  "SOP (Start of Production)",
  "Lições aprendidas"
];

const STORAGE_KEY = "bw_project_performance_v1";
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const LATE_THRESHOLD = 0.1;
const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" });
const WEEKDAY_FORMAT = new Intl.DateTimeFormat("pt-BR", { weekday: "long" });

const state = {
  user: null,
  projects: loadProjects(),
  currentStageProjectId: null,
  managerOwnerFilter: "all"
};

const loginView = document.querySelector("#loginView");
const appView = document.querySelector("#appView");
const sessionBar = document.querySelector("#sessionBar");
const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");

const heroTitle = document.querySelector("#heroTitle");
const heroSubtitle = document.querySelector("#heroSubtitle");
const todayLabel = document.querySelector("#todayLabel");
const todayDate = document.querySelector("#todayDate");

const collaboratorView = document.querySelector("#collaboratorView");
const projectForm = document.querySelector("#projectForm");
const projectName = document.querySelector("#projectName");
const projectArea = document.querySelector("#projectArea");
const projectDeadline = document.querySelector("#projectDeadline");
const projectScheduleType = document.querySelector("#projectScheduleType");
const customStagesWrap = document.querySelector("#customStagesWrap");
const customStages = document.querySelector("#customStages");
const myProjectsList = document.querySelector("#myProjectsList");
const myProjectsEmpty = document.querySelector("#myProjectsEmpty");

const managerView = document.querySelector("#managerView");
const ownerFilter = document.querySelector("#ownerFilter");
const managerProjectsList = document.querySelector("#managerProjectsList");
const managerProjectsEmpty = document.querySelector("#managerProjectsEmpty");

const kpiOnTrack = document.querySelector("#kpiOnTrack");
const kpiAhead = document.querySelector("#kpiAhead");
const kpiRisk = document.querySelector("#kpiRisk");
const kpiLate = document.querySelector("#kpiLate");

const stageModal = document.querySelector("#stageModal");
const stageForm = document.querySelector("#stageForm");
const stageModalProject = document.querySelector("#stageModalProject");
const stageName = document.querySelector("#stageName");
const stageComment = document.querySelector("#stageComment");
const stageFile = document.querySelector("#stageFile");
const stageCancel = document.querySelector("#stageCancel");

const toast = document.querySelector("#toast");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = USERS.find((candidate) =>
    candidate.email.toLowerCase() === loginEmail.value.trim().toLowerCase() &&
    candidate.password === loginPassword.value
  );

  if (!user) {
    showToast("Usuário ou senha inválidos.");
    return;
  }

  state.user = user;
  loginForm.reset();
  render();
});

projectScheduleType.addEventListener("change", () => {
  const isCustom = projectScheduleType.value === "custom";
  customStagesWrap.classList.toggle("hidden", !isCustom);
  customStages.required = isCustom;
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = projectName.value.trim();
  const area = projectArea.value.trim();
  const deadline = projectDeadline.value;

  if (!name || !area || !deadline) {
    showToast("Preencha os dados obrigatórios do projeto.");
    return;
  }

  if (new Date(deadline) < startOfDay(new Date())) {
    showToast("Prazo final precisa ser hoje ou no futuro.");
    return;
  }

  const stages = buildStagesFromForm();
  if (!stages.length) {
    showToast("Informe ao menos 1 stage para o cronograma customizado.");
    return;
  }

  const project = {
    id: crypto.randomUUID(),
    name,
    area,
    deadline,
    startDate: formatDateISO(new Date()),
    ownerEmail: state.user.email,
    ownerName: state.user.name,
    createdBy: state.user.email,
    scheduleType: projectScheduleType.value,
    stages: stages.map((stageValue, index) => ({
      id: crypto.randomUUID(),
      order: index + 1,
      name: stageValue,
      completedAt: null,
      note: null,
      evidence: null
    }))
  };

  state.projects.unshift(project);
  persistProjects();
  projectForm.reset();
  projectScheduleType.value = "default";
  customStagesWrap.classList.add("hidden");
  customStages.required = false;
  showToast("Projeto criado com sucesso.");
  render();
});

stageCancel.addEventListener("click", closeStageModal);

stageModal.addEventListener("click", (event) => {
  if (event.target === stageModal) {
    closeStageModal();
  }
});

stageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const project = state.projects.find((item) => item.id === state.currentStageProjectId);

  if (!project) {
    showToast("Projeto não encontrado.");
    closeStageModal();
    return;
  }

  const file = stageFile.files?.[0];
  if (!file) {
    showToast("Anexe a evidência para concluir o stage.");
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    showToast("Arquivo acima de 25 MB. Envie um arquivo menor.");
    return;
  }

  const currentStage = getCurrentStage(project);
  if (!currentStage) {
    showToast("Este projeto já foi concluído.");
    closeStageModal();
    return;
  }

  currentStage.completedAt = new Date().toISOString();
  currentStage.note = stageComment.value.trim();
  currentStage.evidence = {
    fileName: file.name,
    fileType: file.type || "desconhecido",
    fileSize: file.size,
    uploadedBy: state.user.email,
    uploadedAt: new Date().toISOString()
  };

  persistProjects();
  closeStageModal();
  showToast("Stage concluído. Projeto avançado.");
  render();
});

ownerFilter.addEventListener("change", () => {
  state.managerOwnerFilter = ownerFilter.value;
  renderManagerProjects();
});

function render() {
  const now = new Date();
  todayLabel.textContent = capitalize(WEEKDAY_FORMAT.format(now));
  todayDate.textContent = DATE_FORMAT.format(now);

  if (!state.user) {
    loginView.classList.remove("hidden");
    appView.classList.add("hidden");
    sessionBar.classList.add("hidden");
    return;
  }

  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
  sessionBar.classList.remove("hidden");

  sessionBar.innerHTML = "";
  const userLabel = document.createElement("span");
  userLabel.textContent = `${state.user.name} (${state.user.role === "manager" ? "Gestor" : "Colaborador"})`;

  const logout = document.createElement("button");
  logout.className = "ghost-button";
  logout.type = "button";
  logout.textContent = "Sair";
  logout.addEventListener("click", () => {
    state.user = null;
    state.currentStageProjectId = null;
    render();
  });

  sessionBar.appendChild(userLabel);
  sessionBar.appendChild(logout);

  const isManager = state.user.role === "manager";
  collaboratorView.classList.toggle("hidden", isManager);
  managerView.classList.toggle("hidden", !isManager);

  if (isManager) {
    heroTitle.textContent = "Dashboard do Gestor";
    heroSubtitle.textContent = "Abra a daily com visão macro e cobre por projeto, não por ação solta.";
    renderManagerFilters();
    renderManagerProjects();
    renderManagerKpis();
  } else {
    heroTitle.textContent = "Minha Área de Projetos";
    heroSubtitle.textContent = "Atualize seus stages com evidência e mantenha o prazo sob controle.";
    renderMyProjects();
  }
}

function renderMyProjects() {
  const myProjects = state.projects.filter((project) => project.ownerEmail === state.user.email);
  renderProjectCards(myProjects, myProjectsList, true);
  myProjectsEmpty.classList.toggle("hidden", myProjects.length > 0);
}

function renderManagerFilters() {
  const owners = [...new Map(state.projects.map((project) => [project.ownerEmail, project.ownerName])).entries()];

  ownerFilter.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "Todos os responsáveis";
  ownerFilter.appendChild(allOption);

  owners.forEach(([email, name]) => {
    const option = document.createElement("option");
    option.value = email;
    option.textContent = name;
    ownerFilter.appendChild(option);
  });

  if (!["all", ...owners.map(([email]) => email)].includes(state.managerOwnerFilter)) {
    state.managerOwnerFilter = "all";
  }
  ownerFilter.value = state.managerOwnerFilter;
}

function renderManagerProjects() {
  const projects = state.projects.filter((project) =>
    state.managerOwnerFilter === "all" ? true : project.ownerEmail === state.managerOwnerFilter
  );

  renderProjectCards(projects, managerProjectsList, false);
  managerProjectsEmpty.classList.toggle("hidden", projects.length > 0);
}

function renderManagerKpis() {
  const counters = {
    "on-track": 0,
    ahead: 0,
    risk: 0,
    late: 0
  };

  state.projects.forEach((project) => {
    const status = getProjectStatus(project).key;
    counters[status] += 1;
  });

  kpiOnTrack.textContent = counters["on-track"];
  kpiAhead.textContent = counters.ahead;
  kpiRisk.textContent = counters.risk;
  kpiLate.textContent = counters.late;
}

function renderProjectCards(projects, container, includeActionButton) {
  container.innerHTML = "";

  const sorted = [...projects].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  sorted.forEach((project) => {
    const metrics = getProjectMetrics(project);
    const status = getProjectStatus(project);
    const currentStage = getCurrentStage(project);
    const nextStage = getNextStage(project);

    const card = document.createElement("article");
    card.className = "project-card";

    const top = document.createElement("div");
    top.className = "project-top";

    const titleWrap = document.createElement("div");
    titleWrap.innerHTML = `
      <h3>${escapeHtml(project.name)}</h3>
      <p class="project-meta">${escapeHtml(project.ownerName)} | ${escapeHtml(project.area)} | prazo: ${formatDate(project.deadline)}</p>
    `;

    const badge = document.createElement("span");
    badge.className = `badge ${status.key}`;
    badge.textContent = status.label;

    top.appendChild(titleWrap);
    top.appendChild(badge);

    const progress = document.createElement("div");
    progress.className = "progress-zone";
    const realWidth = clamp(metrics.realPercent, 0, 100);
    const expectedLeft = clamp(metrics.expectedPercent, 0, 100);
    progress.innerHTML = `
      <div class="progress-row">
        <span>Real: ${metrics.realPercent.toFixed(1)}%</span>
        <span>Esperado: ${metrics.expectedPercent.toFixed(1)}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${realWidth}%"></div>
        <div class="progress-expected" style="left: calc(${expectedLeft}% - 2px)"></div>
        <div class="progress-center">${metrics.realPercent.toFixed(1)}% | ${escapeHtml(currentStage ? currentStage.name : "Projeto concluído")}</div>
      </div>
      <div class="project-meta">Próximo stage: ${escapeHtml(nextStage ? nextStage.name : "Nenhum")}</div>
    `;

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const lastEvidence = getLastEvidence(project);
    if (lastEvidence) {
      const info = document.createElement("span");
      info.className = "project-meta";
      info.textContent = `Última evidência: ${lastEvidence.fileName}`;
      actions.appendChild(info);
    }

    if (includeActionButton) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "primary-button";
      button.textContent = currentStage ? "Concluir stage atual" : "Projeto finalizado";
      button.disabled = !currentStage;
      button.addEventListener("click", () => openStageModal(project.id));
      actions.appendChild(button);
    }

    card.appendChild(top);
    card.appendChild(progress);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

function openStageModal(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  const currentStage = project ? getCurrentStage(project) : null;

  if (!project || !currentStage) {
    showToast("Projeto sem stage pendente.");
    return;
  }

  state.currentStageProjectId = projectId;
  stageModalProject.textContent = `${project.name} | Responsável: ${project.ownerName}`;
  stageName.value = currentStage.name;
  stageComment.value = "";
  stageFile.value = "";
  stageModal.classList.remove("hidden");
  stageModal.setAttribute("aria-hidden", "false");
}

function closeStageModal() {
  state.currentStageProjectId = null;
  stageModal.classList.add("hidden");
  stageModal.setAttribute("aria-hidden", "true");
}

function buildStagesFromForm() {
  if (projectScheduleType.value === "default") {
    return [...DEFAULT_STAGE_TEMPLATE];
  }

  return customStages.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function getProjectMetrics(project) {
  const totalStages = project.stages.length;
  const completedStages = project.stages.filter((stage) => stage.completedAt).length;
  const realPercent = totalStages === 0 ? 0 : (completedStages / totalStages) * 100;

  const start = startOfDay(new Date(project.startDate));
  const deadline = startOfDay(new Date(project.deadline));
  const today = startOfDay(new Date());

  const totalDays = Math.max(1, dateDiffDays(start, deadline));
  const elapsedDays = clamp(dateDiffDays(start, today), 0, totalDays);
  const expectedPercent = (elapsedDays / totalDays) * 100;

  const delayPercent = Math.max(0, expectedPercent - realPercent);
  const delayDays = (delayPercent / 100) * totalDays;

  return {
    totalStages,
    completedStages,
    realPercent,
    expectedPercent,
    totalDays,
    delayPercent,
    delayDays
  };
}

function getProjectStatus(project) {
  const metrics = getProjectMetrics(project);

  if (metrics.realPercent > metrics.expectedPercent + 2) {
    return { key: "ahead", label: "ACIMA DO ESPERADO" };
  }

  if (metrics.delayDays > metrics.totalDays * LATE_THRESHOLD) {
    return { key: "late", label: "ATRASADO" };
  }

  if (metrics.delayDays > 0) {
    return { key: "risk", label: "EM RISCO" };
  }

  return { key: "on-track", label: "NO PRAZO" };
}

function getCurrentStage(project) {
  return project.stages.find((stage) => !stage.completedAt) || null;
}

function getNextStage(project) {
  const current = getCurrentStage(project);
  if (!current) {
    return null;
  }

  const currentIndex = project.stages.findIndex((stage) => stage.id === current.id);
  return project.stages[currentIndex + 1] || null;
}

function getLastEvidence(project) {
  const completedStages = project.stages
    .filter((stage) => stage.completedAt && stage.evidence)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  return completedStages[0]?.evidence || null;
}

function persistProjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
}

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

function formatDate(dateValue) {
  return DATE_FORMAT.format(new Date(dateValue));
}

function formatDateISO(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function dateDiffDays(start, end) {
  const diffMs = end.getTime() - start.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2400);
}

function capitalize(text) {
  if (!text) {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
