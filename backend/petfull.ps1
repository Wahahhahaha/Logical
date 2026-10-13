$ErrorActionPreference = 'Stop'
try {
  $u = Invoke-RestMethod -Uri 'http://127.0.0.1:4000/api/auth/login' -Method Post -ContentType 'application/json' -Body (@{ username='STU-001'; password='12345' } | ConvertTo-Json) -TimeoutSec 8
  $headers = @{ Authorization = 'Bearer ' + $u.token }
  foreach ($path in @('/api/student/pet', '/api/student/activities', '/api/auth/me')) {
    try {
      $r = Invoke-RestMethod -Uri ('http://127.0.0.1:4000' + $path) -Headers $headers -Method Get -TimeoutSec 8
      Write-Output ($path + ' OK ' + ($r | ConvertTo-Json -Compress -Depth 4))
    } catch {
      $resp = $_.Exception.Response
      if ($resp) { $reader = New-Object System.IO.StreamReader($resp.GetResponseStream()); $body = $reader.ReadToEnd(); Write-Output ($path + ' HTTP ' + [int]$resp.StatusCode + ' ' + $body) }
      else { Write-Output ($path + ' FAIL ' + $_.Exception.Message) }
    }
  }
} catch {
  Write-Output ('LOGIN FAIL ' + $_.Exception.Message)
}
