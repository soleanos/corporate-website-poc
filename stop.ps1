# stop.ps1 — Arrete le serveur de dev FL2S s'il tourne
$ErrorActionPreference = 'SilentlyContinue'
Set-Location -Path $PSScriptRoot

$pidFile = ".vite.pid"
$stopped = $false

if (Test-Path $pidFile) {
    $procId = Get-Content $pidFile
    if ($procId) {
        try {
            Stop-Process -Id $procId -Force
            Write-Host "[OK] Serveur arrete (PID $procId)." -ForegroundColor Green
            $stopped = $true
        } catch {
            Write-Host "[INFO] Le PID $procId ne correspond plus a un processus actif." -ForegroundColor Yellow
        }
    }
    Remove-Item $pidFile -Force
}

# Filet de securite : tuer tout vite/node ecoutant sur 5173
$onPort = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($onPort) {
    $onPort | ForEach-Object {
        try { Stop-Process -Id $_.OwningProcess -Force; $stopped = $true } catch {}
    }
    Write-Host "[OK] Processus residuels sur le port 5173 nettoyes." -ForegroundColor Green
}

if (-not $stopped) {
    Write-Host "[INFO] Aucun serveur FL2S actif a stopper." -ForegroundColor DarkGray
}
