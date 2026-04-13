# Windows 安装脚本入口
Write-Host "Redirecting to setup.sh (Please run under Bash/WSL or Git Bash if possible)"
& bash ./setup.sh $args
exit $LASTEXITCODE
