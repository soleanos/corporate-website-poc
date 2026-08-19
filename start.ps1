# start.ps1 — Lancement local du site FL2S (Windows)
# Usage : clic droit > Exécuter avec PowerShell
#        ou en CLI : .\start.ps1

$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  FL2S Conseil - serveur de developpement" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Resolution des binaires Windows (npm = npm.cmd, npx = npx.cmd, sinon Start-Process echoue)
$npmCmdObj = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npmCmdObj) { $npmCmdObj = Get-Command npm -ErrorAction SilentlyContinue }
$npmCmd = if ($npmCmdObj) { $npmCmdObj.Source } else { $null }

if (-not $npmCmd) {
    Write-Host "[ERREUR] npm introuvable. Installer Node.js 20 LTS : https://nodejs.org/" -ForegroundColor Red
    Read-Host "Entree pour quitter"
    exit 1
}

try {
    $nodeVersion = node --version
    Write-Host "[OK] Node detecte : $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] Node.js n'est pas installe (https://nodejs.org/, version 20 LTS)." -ForegroundColor Red
    Read-Host "Entree pour quitter"; exit 1
}

# 2. Installer si node_modules absent
if (-Not (Test-Path "node_modules")) {
    Write-Host "[INFO] Installation des dependances (premier lancement)..." -ForegroundColor Yellow
    & $npmCmd install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERREUR] npm install a echoue." -ForegroundColor Red
        Read-Host "Entree pour quitter"; exit 1
    }
}

# 3. Verifier .env
if (-Not (Test-Path ".env")) {
    Write-Host "[INFO] Pas de fichier .env detecte, copie depuis .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "[ACTION] Ouvrez .env et collez votre cle de service formulaire si besoin." -ForegroundColor Yellow
}

# 4. Verifier qu'aucun serveur ne tourne deja
$pidFile = ".vite.pid"
if (Test-Path $pidFile) {
    $oldPid = Get-Content $pidFile -ErrorAction SilentlyContinue
    if ($oldPid -and (Get-Process -Id $oldPid -ErrorAction SilentlyContinue)) {
        Write-Host "[INFO] Un serveur tourne deja (PID $oldPid). Lancez d'abord stop.ps1" -ForegroundColor Yellow
        Read-Host "Entree pour quitter"
        exit 0
    }
}

Write-Host ""
Write-Host "[OK] Demarrage de Vite sur http://localhost:5173" -ForegroundColor Green
Write-Host "     (Ctrl+C pour stopper, ou utilisez stop.ps1)" -ForegroundColor DarkGray
Write-Host ""

# 5. Lancer Vite directement (pas Start-Process : sur Windows il ne resout pas .cmd sans extension)
#    On utilise & avec le chemin complet vers npm.cmd. $PID = celui de PowerShell actuel.
$PID | Out-File -FilePath $pidFile -Encoding ascii
try {
    & $npmCmd run dev
} finally {
    Remove-Item $pidFile -ErrorAction SilentlyContinue
}
