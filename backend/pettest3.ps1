$ErrorActionPreference = 'Stop'
foreach ($user in @(@{n='STU-001';p='12345'}, @{n='STU-001';p='student'}, @{n='STU-001';p='password'})) {
  try {
    $u = Invoke-RestMethod -Uri 'http://localhost:4000/api/auth/login' -Method Post -ContentType 'application/json' -Body (@{ username=$user.n; password=$user.p } | ConvertTo-Json) -TimeoutSec 8
    Write-Output ("LOGIN_OK " + $u.user.username + " id=" + $u.user.id)
    $headers = @{ Authorization = 'Bearer ' + $u.token }
    $pet = Invoke-RestMethod -Uri 'http://localhost:4000/api/student/pet' -Headers $headers -Method Get -TimeoutSec 8
    Write-Output ("PET_OK " + ($pet | ConvertTo-Json -Compress -Depth 4))
    break
  } catch {
    $resp = $_.Exception.Response
    if ($resp) { $reader = New-Object System.IO.StreamReader($resp.GetResponseStream()); $body = $reader.ReadToEnd(); Write-Output ("HTTP_FAIL " + $user.n + "/" + $user.p + " -> " + [int]$resp.StatusCode + " " + $body) }
    else { Write-Output ("HTTP_FAIL " + $_.Exception.Message) }
  }
}
