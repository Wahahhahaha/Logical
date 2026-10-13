$ErrorActionPreference = 'Stop'
try {
  $u = Invoke-RestMethod -Uri 'http://localhost:4000/api/auth/login' -Method Post -ContentType 'application/json' -Body (@{ username='STU-001'; password='12345' } | ConvertTo-Json) -TimeoutSec 8
  Write-Output ("LOGIN_OK " + $u.user.username + " role=" + $u.user.role)
  $headers = @{ Authorization = 'Bearer ' + $u.token }
  $pet = Invoke-RestMethod -Uri 'http://localhost:4000/api/student/pet' -Headers $headers -Method Get -TimeoutSec 8
  Write-Output ("PET_OK " + ($pet | ConvertTo-Json -Compress -Depth 4))
} catch {
  $resp = $_.Exception.Response
  if ($resp) { $reader = New-Object System.IO.StreamReader($resp.GetResponseStream()); $body = $reader.ReadToEnd(); Write-Output ("HTTP_FAIL " + [int]$resp.StatusCode + " " + $body) }
  else { Write-Output ("HTTP_FAIL " + $_.Exception.Message) }
}
