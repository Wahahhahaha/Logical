try {
  $r = Invoke-WebRequest -Uri 'http://localhost:4000/api/health' -UseBasicParsing -TimeoutSec 5
  Write-Output ("HEALTH_STATUS " + $r.StatusCode + " " + $r.Content)
} catch {
  Write-Output ("HEALTH_FAIL " + $_.Exception.Message)
}
