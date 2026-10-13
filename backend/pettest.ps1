$ErrorActionPreference = 'Stop'
try {
  $loginBody = @{ username = 'siswa1'; password = '12345' } | ConvertTo-Json
  $login = Invoke-RestMethod -Uri 'http://localhost:4000/api/auth/login' -Method Post -ContentType 'application/json' -Body $loginBody -TimeoutSec 8
  Write-Output ("LOGIN_OK " + $login.user.fullName + " / " + $login.user.role + " / streak=" + $login.user.profile.currentStreak)
  $headers = @{ Authorization = 'Bearer ' + $login.token }
  $pet = Invoke-RestMethod -Uri 'http://localhost:4000/api/student/pet' -Headers $headers -Method Get -TimeoutSec 8
  Write-Output ("PET_OK " + ($pet | ConvertTo-Json -Compress -Depth 4))
} catch {
  $resp = $_.Exception.Response
  if ($resp) { $reader = New-Object System.IO.StreamReader($resp.GetResponseStream()); $body = $reader.ReadToEnd(); Write-Output ("HTTP_FAIL " + [int]$resp.StatusCode + " " + $body) }
  else { Write-Output ("HTTP_FAIL " + $_.Exception.Message) }
}
