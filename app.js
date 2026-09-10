const SUPABASE_URL = 'https://frgqqjucluwnyltkweih.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZ3FxanVjbHV3bnlsdGt3ZWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTgzODAsImV4cCI6MjEwNDI3NDM4MH0.wxDjpAic0yu8h2phFZRx2w2g7TIOIuJyleJUKbtdCoU';

let supabaseClient = null;

if(window.supabase){
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}else{
  console.error("Supabase library failed to load.");
}

const state = {
  screen: "landing",
  history: [],
  authenticated: false,
  humanApproved: false,
  authMode: "signin",
  authOrigin: "menu",
  accountOrigin: "menu",
  selectedSource: null,
  selectedFile: null,
  processingTimer: null
};

const screens = [
  "landing","menu","learn","auth","humanGate","workspace",
  "ingestion","processing","review","guest","account"
];

const $ = (id) => document.getElementById(id);

function showScreen(name, pushHistory = true){
  if(!screens.includes(name)) return;
  if(pushHistory && state.screen !== name){
    state.history.push(state.screen);
  }
  state.screen = name;
  screens.forEach(screen => {
    const el = $(screen + "Screen");
    if(el) el.classList.toggle("hidden", screen !== name);
  });
  updateTopbar();
  window.scrollTo({ top:0, behavior:"smooth" });
}

function back(){
  if(state.history.length === 0){
    showScreen("landing", false);
    return;
  }
  const previous = state.history.pop();
  showScreen(previous, false);
}

function updateTopbar(){
  const accountButton = $("accountButton");
  const hideAccount =
    state.screen === "landing" || state.screen === "learn" ||
    state.screen === "auth" || state.screen === "humanGate" ||
    state.screen === "guest";
  accountButton.classList.toggle("hidden", hideAccount);
  $("accountEmail").textContent = state.authenticated && state.userEmail ? state.userEmail : "Guest";
  const email = state.authenticated && state.userEmail ? state.userEmail : "S";
  $("accountAvatar").textContent = email.charAt(0).toUpperCase();
}

function toast(message){
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

function requireAuth(origin){
  if(!state.authenticated){
    state.authOrigin = origin;
    showScreen("auth");
    return false;
  }
  return true;
}

/* ---------- LANDING ---------- */
$("getStartedBtn").addEventListener("click", () => showScreen("menu"));
$("learnMoreBtn").addEventListener("click", () => showScreen("learn"));
$("brandButton").addEventListener("click", () => { state.history = []; showScreen("landing", false); });

/* ---------- MENU ---------- */
$("menuBackBtn").addEventListener("click", back);

document.querySelectorAll("[data-action='workspace']").forEach(btn => {
  btn.addEventListener("click", () => {
    if(!requireAuth("workspace")) return;
    if(!state.humanApproved){ showScreen("humanGate"); return; }
    showScreen("workspace");
  });
});

document.querySelectorAll("[data-action='ingestion']").forEach(btn => {
  btn.addEventListener("click", async () => {
    if(!requireAuth("ingestion")) return;
    if(!state.workspaceId){ await loadWorkspace(); }
    showScreen("ingestion");
  });
});

document.querySelectorAll("[data-action='guest']").forEach(btn => {
  btn.addEventListener("click", () => showScreen("guest"));
});

/* ---------- LEARN ---------- */
$("learnBackBtn").addEventListener("click", back);

/* ---------- AUTH ---------- */
document.querySelectorAll("[data-auth-mode]").forEach(tab => {
  tab.addEventListener("click", () => {
    state.authMode = tab.dataset.authMode;
    document.querySelectorAll("[data-auth-mode]").forEach(item => {
      item.classList.toggle("active", item.dataset.authMode === state.authMode);
    });
    $("authMessage").textContent = state.authMode === "signup" ? "Create your SAV3UE account." : "Welcome back.";
  });
});

$("authForm").addEventListener("submit", async event => {
  event.preventDefault();
  const email = $("authEmail").value.trim();
  const password = $("authPassword").value;

  if(!email || password.length < 6){
    $("authMessage").textContent = "Please enter a valid email and a password of at least 6 characters.";
    return;
  }

  $("authMessage").textContent = state.authMode === "signup" ? "Creating your account..." : "Signing you in...";

  try {
    let result;
    if(state.authMode === "signup"){
      result = await supabaseClient.auth.signUp({ email, password });
    }else{
      result = await supabaseClient.auth.signInWithPassword({ email, password });
    }
    if(result.error) throw result.error;

    const user = result.data.user;
    state.authenticated = !!user;
    state.userEmail = user?.email || email;

    if(state.authMode === "signup" && !result.data.session){
      $("authMessage").textContent = "Account created. Please check your email to confirm your account.";
      toast("Confirmation email sent.");
      return;
    }

    $("authMessage").textContent = "Authentication successful.";
    toast(state.authMode === "signup" ? "Account created." : "Signed in.");

    setTimeout(async () => {
      if(state.authOrigin === "workspace"){
        if(!state.humanApproved){ showScreen("humanGate"); }
        else{ await loadWorkspace(); }
      }else{
        if(!state.workspaceId){ await loadWorkspace(); }
        if(!state.workspaceId){ toast("Unable to initialize workspace."); return; }
        showScreen("ingestion");
      }
    },450);

  }catch(error){
    console.error("SAV3UE Auth Error:", error);
    $("authMessage").textContent = error.message || "Authentication failed.";
    toast("Authentication failed.");
  }
});

$("authBackBtn").addEventListener("click", back);

/* ---------- HUMAN GATE ---------- */
$("approveHumanBtn").addEventListener("click", async () => {
  state.humanApproved = true;
  toast("Human approval recorded.");
  await loadWorkspace();
});

/* ---------- REAL WORKSPACE ---------- */
function formatRupiah(n){
  const num = Number(n) || 0;
  return "Rp " + num.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

function setStatusBadge(id, text, kind){
  const el = $(id);
  if(!el) return;
  el.textContent = text;
  el.classList.remove("success","warning","neutral");
  el.classList.add(kind);
}

async function renderWorkspaceSummary(){
  if(!state.workspaceId) return;
  const { data, error } = await supabaseClient.rpc("compute_workspace_summary_v1", { p_workspace_id: state.workspaceId });
  if(error){ console.error("Summary error:", error); toast("Unable to load financial summary."); return; }

  $("metricRevenue").textContent = formatRupiah(data.revenue);
  $("metricExpenses").textContent = formatRupiah(data.expenses);
  $("metricNetResult").textContent = formatRupiah(data.net_result);
  $("metricTaxExposure").textContent = formatRupiah(data.tax_exposure);

  const note = data.total_records + " records";
  $("metricRevenueNote").textContent = note;
  $("metricExpensesNote").textContent = note;
  $("metricNetResultNote").textContent = note;
  $("metricTaxExposureNote").textContent = data.unresolved_count > 0 ? data.unresolved_count + " need review" : note;
}

async function runAndRenderAudit(){
  if(!state.workspaceId) return;

  setStatusBadge("statusDataSource", "Checking…", "neutral");
  setStatusBadge("statusValidation", "Checking…", "neutral");
  setStatusBadge("statusCalculation", "Running…", "neutral");
  setStatusBadge("statusAuditTrace", "Waiting", "neutral");

  const { data, error } = await supabaseClient.rpc("run_calculation_v1", { p_workspace_id: state.workspaceId });

  if(error){
    console.error("Calculation error:", error);
    setStatusBadge("statusDataSource", "Ready", "success");
    setStatusBadge("statusValidation", "Ready", "success");
    setStatusBadge("statusCalculation", "Failed", "warning");
    setStatusBadge("statusAuditTrace", "Failed", "warning");
    toast("Unable to run calculation.");
    return;
  }

  setStatusBadge("statusDataSource", "Ready", "success");
  setStatusBadge("statusValidation", "Ready", "success");
  setStatusBadge("statusCalculation", "Completed", "success");
  setStatusBadge("statusAuditTrace", "Completed", "success");

  const unresolved = data?.summary?.unresolved_count || 0;
  if(unresolved > 0){
    setStatusBadge("statusValidation", unresolved + " need review", "warning");
  }
}

async function loadWorkspace(){
  if(!state.authenticated){ showScreen("auth"); return; }

  const { data, error } = await supabaseClient.rpc("get_my_workspaces_v1");
  if(error){ console.error("Workspace load error:", error); toast("Unable to load workspace."); return; }

  if(data && data.length > 0){
    state.workspaceId = data[0].id;
    showScreen("workspace");
    renderWorkspaceSummary();
    runAndRenderAudit();
    toast("Workspace loaded.");
    return;
  }

  const { data: newWorkspace, error: createError } = await supabaseClient.rpc("create_workspace_v1", { p_name: "My SAV3UE Workspace" });
  if(createError){
    console.error("Workspace create error:", createError);
    alert(createError.message || "Workspace create failed.");
    toast("Unable to create workspace.");
    return;
  }

  state.workspaceId = newWorkspace;
  showScreen("workspace");
  renderWorkspaceSummary();
  runAndRenderAudit();
  toast("Workspace created.");
}

/* ---------- WORKSPACE ---------- */
$("workspaceBackBtn").addEventListener("click", () => { state.history = []; showScreen("menu", false); });

$("addDataBtn").addEventListener("click", async () => {
  if(!state.workspaceId){ await loadWorkspace(); }
  showScreen("ingestion");
});

$("accountButton").addEventListener("click", () => { state.accountOrigin = state.screen; showScreen("account"); });

document.querySelectorAll("[data-action='account']").forEach(btn => {
  btn.addEventListener("click", () => { state.accountOrigin = "workspace"; showScreen("account"); });
});

function formatRupiah2(n){
  const num = Number(n) || 0;
  return "Rp " + num.toLocaleString("id-ID", { maximumFractionDigits: 0 });
}

async function renderDataPanel(){
  $("dataPanelCount").textContent = "Loading…";
  const { data, error } = await supabaseClient.rpc("get_workspace_records_v1", { p_workspace_id: state.workspaceId });
  if(error){ console.error(error); $("dataPanelCount").textContent = "Error"; return; }

  $("dataPanelCount").textContent = data.length + " records";
  $("dataTableBody").innerHTML = data.map(r => `
    <tr>
      <td>${r.date || "-"}</td>
      <td>${r.type || "-"}</td>
      <td>${r.counterparty || "-"}</td>
      <td>${formatRupiah2(r.gross)}</td>
      <td>${formatRupiah2(r.vat)}</td>
      <td>${r.status || "-"}</td>
    </tr>
  `).join("");
}

async function renderAuditPanel(){
  $("auditRunsList").innerHTML = "Loading…";
  const { data, error } = await supabaseClient.rpc("get_calculation_runs_v1", { p_workspace_id: state.workspaceId });
  if(error){ console.error(error); $("auditRunsList").innerHTML = "Unable to load audit runs."; return; }

  if(data.length === 0){
    $("auditRunsList").innerHTML = "<p class='subtle'>No calculation runs yet.</p>";
    return;
  }

  $("auditRunsList").innerHTML = data.map(run => `
    <div class="audit-run-row">
      <div style="display:flex;justify-content:space-between;">
        <strong>${run.status}</strong>
        <span class="subtle">${new Date(run.started_at).toLocaleString("id-ID")}</span>
      </div>
      <div class="subtle" style="margin-top:6px;">
        Revenue: ${formatRupiah2(run.summary?.revenue)} ·
        Expenses: ${formatRupiah2(run.summary?.expenses)} ·
        Net: ${formatRupiah2(run.summary?.net_result)}
      </div>
    </div>
  `).join("");
}

async function renderInsightsPanel(){
  $("insightsNarrativeList").innerHTML = "Loading…";
  const { data, error } = await supabaseClient.rpc("compute_workspace_summary_v1", { p_workspace_id: state.workspaceId });
  if(error){ console.error(error); $("insightsNarrativeList").innerHTML = "Unable to load insights."; return; }

  const margin = data.revenue > 0 ? ((data.net_result / data.revenue) * 100).toFixed(1) : "0";
  const points = [
    { title: "Net margin", text: `Your net result is ${margin}% of revenue across ${data.total_records} records.` },
    { title: "Tax exposure", text: `Estimated VAT exposure is ${formatRupiah2(data.tax_exposure)}.` }
  ];
  if(data.unresolved_count > 0){
    points.push({ title: "Needs review", text: `${data.unresolved_count} transaction(s) are unclassified and excluded from the totals above.` });
  }

  $("insightsNarrativeList").innerHTML = points.map(p => `
    <div class="insight">
      <div class="insight-title">${p.title}</div>
      <div class="insight-text">${p.text}</div>
    </div>
  `).join("");
}

let cachedRecordsForReport = null;

async function renderReportsPanel(){
  const { data } = await supabaseClient.rpc("get_workspace_records_v1", { p_workspace_id: state.workspaceId });
  cachedRecordsForReport = data || [];
}

function downloadBlob(filename, content, mime){
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

$("downloadCsvBtn").addEventListener("click", () => {
  if(!cachedRecordsForReport) return;
  const header = "Date,Type,Counterparty,Gross,VAT,Status\n";
  const rows = cachedRecordsForReport.map(r => [r.date, r.type, r.counterparty, r.gross, r.vat, r.status].join(",")).join("\n");
  downloadBlob("sav3ue-records.csv", header + rows, "text/csv");
});

$("downloadSummaryBtn").addEventListener("click", async () => {
  const { data } = await supabaseClient.rpc("compute_workspace_summary_v1", { p_workspace_id: state.workspaceId });
  const text = `SAV3UE Financial Summary
Revenue: ${formatRupiah2(data.revenue)}
Expenses: ${formatRupiah2(data.expenses)}
Net Result: ${formatRupiah2(data.net_result)}
Tax Exposure: ${formatRupiah2(data.tax_exposure)}
Total Records: ${data.total_records}
Unresolved: ${data.unresolved_count}
Generated: ${new Date().toLocaleString("id-ID")}`;
  downloadBlob("sav3ue-summary.txt", text, "text/plain");
});

document.querySelectorAll("[data-workspace-nav]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-workspace-nav]").forEach(item => item.classList.remove("active"));
    btn.classList.add("active");

    const section = btn.dataset.workspaceNav;
    ["overviewPanel","dataPanel","auditPanel","insightsPanel","reportsPanel"].forEach(id => $(id).classList.add("hidden"));

    if(section === "overview"){ $("overviewPanel").classList.remove("hidden"); }
    if(section === "data"){ $("dataPanel").classList.remove("hidden"); renderDataPanel(); }
    if(section === "audit"){ $("auditPanel").classList.remove("hidden"); renderAuditPanel(); }
    if(section === "insights"){ $("insightsPanel").classList.remove("hidden"); renderInsightsPanel(); }
    if(section === "reports"){ $("reportsPanel").classList.remove("hidden"); renderReportsPanel(); }
  });
});

/* ---------- COMMAND BAR ---------- */
$("commandForm").addEventListener("submit", event => {
  event.preventDefault();
  const value = $("commandInput").value.trim();
  if(!value){ toast("Tell SAV3UE what you would like to do."); return; }

  const lower = value.toLowerCase();
  if(lower.includes("upload") || lower.includes("add data") || lower.includes("import")){
    showScreen("ingestion");
    $("commandInput").value = "";
    return;
  }
  if(lower.includes("audit")){ toast("Audit view selected."); $("commandInput").value = ""; return; }
  if(lower.includes("report")){ toast("Report preparation requested."); $("commandInput").value = ""; return; }

  toast("SAV3UE received: " + value);
  $("commandInput").value = "";
});

/* ---------- INGESTION ---------- */
$("ingestionBackBtn").addEventListener("click", back);

document.querySelectorAll("[data-source]").forEach(card => {
  card.addEventListener("click", () => {
    state.selectedSource = card.dataset.source;
    toast(state.selectedSource + " selected.");
    if(["CSV","Excel / XLSX","JSON","PDF"].includes(state.selectedSource)){
      $("fileInput").click();
    }else{
      toast(state.selectedSource + " connector will be enabled in the integration stage.");
    }
  });
});

$("chooseFileBtn").addEventListener("click", () => $("fileInput").click());

async function parseFileToRecords(file){
  const extension = file.name.split(".").pop().toLowerCase();
  if(extension === "json"){
    const text = await file.text();
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [parsed];
  }
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, { defval: null });
}

const EXPECTED_COLUMNS = ["Date","Type","Gross"];

function validateRecordColumns(records){
  if(!records || records.length === 0){
    return { valid:false, message:"File kosong atau tidak terbaca." };
  }
  const sample = records[0];
  const missing = EXPECTED_COLUMNS.filter(col => !(col in sample));
  if(missing.length > 0){
    toast("Info: kolom " + missing.join(", ") + " tidak ditemukan — data tetap disimpan, tapi tidak otomatis masuk ke perhitungan Revenue/Expenses.");
  }
  return { valid:true };
}

$("fileInput").addEventListener("change", async event => {
  const file = event.target.files[0];
  if(!file) return;

  state.selectedFile = file;
  $("selectedFile").textContent = file.name + " · " + Math.round(file.size / 1024) + " KB";
  state.selectedSource = state.selectedSource || file.name.split(".").pop().toUpperCase();

  try{
    state.parsedRecords = await parseFileToRecords(file);
  }catch(err){
    console.error("SAV3UE parse error:", err);
    toast("Gagal membaca isi file.");
    return;
  }

  const validation = validateRecordColumns(state.parsedRecords);
  if(!validation.valid){
    toast(validation.message);
    state.parsedRecords = null;
    return;
  }

  toast("File ready. Starting processing…");
  startProcessing();
});

/* ---------- DRAG & DROP ---------- */
const uploadZone = $("uploadZone");

["dragenter","dragover"].forEach(eventName => {
  uploadZone.addEventListener(eventName, event => { event.preventDefault(); uploadZone.classList.add("drag"); });
});

["dragleave","drop"].forEach(eventName => {
  uploadZone.addEventListener(eventName, event => { event.preventDefault(); uploadZone.classList.remove("drag"); });
});

uploadZone.addEventListener("drop", async event => {
  const file = event.dataTransfer.files[0];
  if(!file) return;

  state.selectedFile = file;
  $("selectedFile").textContent = file.name + " · " + Math.round(file.size / 1024) + " KB";
  state.selectedSource = file.name.split(".").pop().toUpperCase();

  try{
    state.parsedRecords = await parseFileToRecords(file);
  }catch(err){
    console.error("SAV3UE parse error:", err);
    toast("Gagal membaca isi file.");
    return;
  }

  const validation = validateRecordColumns(state.parsedRecords);
  if(!validation.valid){
    toast(validation.message);
    state.parsedRecords = null;
    return;
  }

  startProcessing();
});

/* ---------- PROCESSING ---------- */
function setProcessStep(id,status){
  const step = $(id);
  if(!step) return;
  step.classList.remove("active","done");
  const statusText = step.querySelector(".process-step-status");
  if(status === "active"){ step.classList.add("active"); statusText.textContent = "Processing…"; }
  if(status === "done"){
    step.classList.add("done");
    statusText.textContent = "Complete";
    step.querySelector(".process-step-icon").textContent = "✓";
  }
  if(status === "waiting"){ statusText.textContent = "Waiting"; }
}

function startProcessing(){
  clearTimeout(state.processingTimer);
  showScreen("processing");
  setProcessStep("stepSource","active");
  setProcessStep("stepParse","waiting");
  setProcessStep("stepValidate","waiting");
  setProcessStep("stepPrepare","waiting");

  $("processingDescription").textContent = state.selectedFile ? "Preparing " + state.selectedFile.name + " for review." : "Preparing your dataset.";

  setTimeout(() => { setProcessStep("stepSource","done"); setProcessStep("stepParse","active"); },700);
  setTimeout(() => { setProcessStep("stepParse","done"); setProcessStep("stepValidate","active"); },1400);
  setTimeout(() => { setProcessStep("stepValidate","done"); setProcessStep("stepPrepare","active"); },2200);

  state.processingTimer = setTimeout(() => {
    setProcessStep("stepPrepare","done");
    $("processingDescription").textContent = "Processing complete. Review the findings before analysis.";
    setTimeout(() => { prepareReview(); },600);
  },3000);
}

/* ---------- DATA REVIEW ---------- */
function prepareReview(){
  const file = state.selectedFile;
  $("reviewSubtitle").textContent = file ? file.name + " is ready for review." : "Dataset is ready for review.";
  showScreen("review");
}

$("reviewBackBtn").addEventListener("click", () => { clearTimeout(state.processingTimer); showScreen("ingestion"); });

$("reviewResetBtn").addEventListener("click", () => {
  state.selectedFile = null;
  state.selectedSource = null;
  state.parsedRecords = null;
  $("selectedFile").textContent = "No file selected";
  $("fileInput").value = "";
  toast("Dataset review reset.");
  showScreen("ingestion");
});

$("continueAnalysisBtn").addEventListener("click", async () => {
  if(!state.parsedRecords || state.parsedRecords.length === 0){
    toast("No parsed records available.");
    return;
  }
  if(!state.workspaceId){ toast("Workspace is not available."); return; }

  try{
    const file = state.selectedFile;
    const storagePath = state.workspaceId + "/" + crypto.randomUUID() + "-" + file.name;

    const { error: uploadError } = await supabaseClient.storage.from("sav3ue-datasets").upload(storagePath, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });
    if(uploadError) throw uploadError;

    const { data: dataset, error: registerError } = await supabaseClient.rpc("register_dataset_v1", {
      p_workspace_id: state.workspaceId,
      p_source_name: file.name,
      p_filename: file.name,
      p_mime_type: file.type || "application/octet-stream",
      p_file_size: file.size,
      p_storage_bucket: "sav3ue-datasets",
      p_storage_path: storagePath,
      p_checksum: null,
      p_dataset_name: file.name
    });
    if(registerError) throw registerError;

    const records = state.parsedRecords;
    const batchSize = 500;

    for(let i = 0; i < records.length; i += batchSize){
      const batch = records.slice(i, i + batchSize);
      const { error: persistError } = await supabaseClient.rpc("persist_dataset_records_v1", {
        p_workspace_id: state.workspaceId,
        p_dataset_id: dataset.dataset_id,
        p_source_file_id: dataset.source_file_id,
        p_records: batch
      });
      if(persistError) throw persistError;
      console.log("SAV3UE persisted:", Math.min(i + batch.length, records.length), "/", records.length);
    }

    toast(records.length + " records persisted successfully.");
    addActivity("Dataset persisted successfully.", "Just now");

    setTimeout(() => {
      showScreen("workspace");
      renderWorkspaceSummary();
      runAndRenderAudit();
      toast("Analysis workspace is ready.");
    },500);

  }catch(error){
    console.error("SAV3UE persistence error:", error);
    toast(error.message || "Unable to persist dataset.");
  }
});

/* ---------- ACTIVITY ---------- */
function addActivity(text,time){
  const list = $("activityList");
  const row = document.createElement("div");
  row.className = "activity-row";
  row.innerHTML = `
    <span class="activity-dot"></span>
    <div>
      <div class="activity-text"></div>
      <div class="activity-time"></div>
    </div>
  `;
  row.querySelector(".activity-text").textContent = text;
  row.querySelector(".activity-time").textContent = time;
  list.prepend(row);
}

/* ---------- GUEST ---------- */
$("guestBackBtn").addEventListener("click", back);
$("guestSignInBtn").addEventListener("click", () => { state.authOrigin = "workspace"; showScreen("auth"); });

/* ---------- ACCOUNT ---------- */
$("accountBackBtn").addEventListener("click", () => {
  if(state.accountOrigin){ showScreen(state.accountOrigin); } else { showScreen("menu"); }
});

$("signOutBtn").addEventListener("click", async () => {
  const { error } = await supabaseClient.auth.signOut();
  if(error){ console.error(error); toast("Sign out failed."); return; }

  state.authenticated = false;
  state.userEmail = null;
  state.userId = null;
  state.workspaceId = null;
  state.humanApproved = false;
  state.history = [];

  toast("Signed out.");
  showScreen("landing", false);
});

/* ---------- SESSION PERSISTENCE ---------- */
async function restoreSession(){
  const { data, error } = await supabaseClient.auth.getSession();
  if(error){ console.error("Session check error:", error); return; }

  if(data.session && data.session.user){
    state.authenticated = true;
    state.userEmail = data.session.user.email;
    toast("Welcome back.");
    await loadWorkspace();
  }
}

supabaseClient.auth.onAuthStateChange((event, session) => {
  if(event === "SIGNED_OUT"){
    state.authenticated = false;
    state.userEmail = null;
    state.workspaceId = null;
  }
});

/* ---------- INITIAL STATE ---------- */
updateTopbar();
showScreen("landing", false);
restoreSession();
