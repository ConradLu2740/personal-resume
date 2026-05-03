# 个人网站部署脚本 (PowerShell)
# 支持多种部署方式：Vercel、GitHub Pages、Netlify、静态服务器

$ErrorActionPreference = "Stop"

Write-Host "🚀 个人网站部署脚本" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan

# 构建项目
function Build-Project {
    Write-Host "📦 正在构建项目..." -ForegroundColor Blue
    npm run build
    Write-Host "✅ 构建完成" -ForegroundColor Green
}

# 部署到 Vercel
function Deploy-Vercel {
    Write-Host "🌐 部署到 Vercel..." -ForegroundColor Blue
    
    # 检查是否安装了 Vercel CLI
    if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Host "正在安装 Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
    }
    
    # 检查是否登录
    try {
        vercel whoami | Out-Null
    } catch {
        Write-Host "请先登录 Vercel" -ForegroundColor Yellow
        vercel login
    }
    
    # 部署
    vercel --prod
    Write-Host "✅ Vercel 部署完成" -ForegroundColor Green
}

# 部署到 GitHub Pages
function Deploy-GitHubPages {
    Write-Host "📄 部署到 GitHub Pages..." -ForegroundColor Blue
    
    # 确保在 git 仓库中
    if (!(Test-Path ".git")) {
        Write-Host "错误: 当前目录不是 git 仓库" -ForegroundColor Red
        Write-Host "请先初始化 git 仓库并推送到 GitHub" -ForegroundColor Yellow
        exit 1
    }
    
    # 创建 gh-pages 分支并部署
    git add out/ -f
    git commit -m "Deploy to GitHub Pages" --allow-empty
    git subtree push --prefix out origin gh-pages
    
    Write-Host "✅ GitHub Pages 部署完成" -ForegroundColor Green
    Write-Host "请确保在 GitHub 仓库设置中启用了 GitHub Pages" -ForegroundColor Yellow
}

# 部署到 Netlify
function Deploy-Netlify {
    Write-Host "🌍 部署到 Netlify..." -ForegroundColor Blue
    
    # 检查是否安装了 Netlify CLI
    if (!(Get-Command netlify -ErrorAction SilentlyContinue)) {
        Write-Host "正在安装 Netlify CLI..." -ForegroundColor Yellow
        npm install -g netlify-cli
    }
    
    # 检查是否登录
    try {
        netlify status | Out-Null
    } catch {
        Write-Host "请先登录 Netlify" -ForegroundColor Yellow
        netlify login
    }
    
    # 部署
    netlify deploy --prod --dir=out
    Write-Host "✅ Netlify 部署完成" -ForegroundColor Green
}

# 本地预览
function Start-LocalPreview {
    Write-Host "👀 启动本地预览..." -ForegroundColor Blue
    
    if (!(Get-Command npx -ErrorAction SilentlyContinue)) {
        Write-Host "错误: 未安装 npx" -ForegroundColor Red
        exit 1
    }
    
    Set-Location out
    npx serve -p 3000
}

# 显示菜单
function Show-Menu {
    Write-Host ""
    Write-Host "请选择部署方式:"
    Write-Host "1) Vercel (推荐，自动部署，全球 CDN)"
    Write-Host "2) GitHub Pages (免费，适合开源项目)"
    Write-Host "3) Netlify (免费，功能丰富)"
    Write-Host "4) 本地预览"
    Write-Host "5) 退出"
    Write-Host ""
}

# 主程序
function Main {
    # 检查是否在项目根目录
    if (!(Test-Path "package.json")) {
        Write-Host "错误: 请在项目根目录运行此脚本" -ForegroundColor Red
        exit 1
    }
    
    # 构建项目
    Build-Project
    
    while ($true) {
        Show-Menu
        $choice = Read-Host "请输入选项 (1-5)"
        
        switch ($choice) {
            "1" {
                Deploy-Vercel
                break
            }
            "2" {
                Deploy-GitHubPages
                break
            }
            "3" {
                Deploy-Netlify
                break
            }
            "4" {
                Start-LocalPreview
                break
            }
            "5" {
                Write-Host "👋 再见" -ForegroundColor Green
                exit 0
            }
            default {
                Write-Host "无效选项，请重新选择" -ForegroundColor Red
            }
        }
    }
}

# 运行主程序
Main
