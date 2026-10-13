$env:PORT = '4100'
$p = Start-Process node -ArgumentList 'src/server.js' -WorkingDirectory 'C:\Users\HYPE AMD\Documents\Logical\backend' -RedirectStandardOutput 'C:\Users\HYPE AMD\Documents\Logical\backend\srv_out.log' -RedirectStandardError 'C:\Users\HYPE AMD\Documents\Logical\backend\srv_err.log' -PassThru -WindowStyle Hidden
Write-Output ("STARTED " + $p.Id)
