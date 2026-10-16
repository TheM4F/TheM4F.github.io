param(
  [Parameter(Mandatory = $true)][string]$Project,
  [Parameter(Mandatory = $true)][string]$Archive
)

$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath($Project)
$distSource = Join-Path $projectRoot 'dist'
$hostingSource = Join-Path $projectRoot '.openai\hosting.json'

if (-not (Test-Path -LiteralPath $distSource -PathType Container)) { throw 'Missing dist directory.' }
if (-not (Test-Path -LiteralPath $hostingSource -PathType Leaf)) { throw 'Missing .openai/hosting.json.' }

$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
$stage = [IO.Path]::GetFullPath((Join-Path $tempRoot ('sites-package-' + [guid]::NewGuid().ToString('N'))))
if (-not $stage.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe staging path.' }

try {
  New-Item -ItemType Directory -Path $stage | Out-Null
  Copy-Item -LiteralPath $distSource -Destination (Join-Path $stage 'dist') -Recurse
  $manifestDir = Join-Path $stage 'dist\.openai'
  New-Item -ItemType Directory -Force -Path $manifestDir | Out-Null
  Copy-Item -LiteralPath $hostingSource -Destination (Join-Path $manifestDir 'hosting.json')
  New-Item -ItemType Directory -Force -Path ([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Archive))) | Out-Null
  & tar.exe -C $stage -czf $Archive dist
  if ($LASTEXITCODE -ne 0) { throw 'Unable to create Site archive.' }
  $entries = & tar.exe -tzf $Archive
  if ($LASTEXITCODE -ne 0 -or $entries -notcontains 'dist/.openai/hosting.json') { throw 'Archive validation failed.' }
  Write-Output ([IO.Path]::GetFullPath($Archive))
}
finally {
  if ((Test-Path -LiteralPath $stage) -and $stage.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase)) {
    Remove-Item -LiteralPath $stage -Recurse -Force
  }
}
