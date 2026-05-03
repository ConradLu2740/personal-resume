#!/bin/bash

# 个人网站部署脚本
# 支持多种部署方式：Vercel、GitHub Pages、Netlify、静态服务器

set -e

echo "🚀 个人网站部署脚本"
echo "===================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查是否安装了必要的工具
check_dependency() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}错误: 未安装 $1，请先安装${NC}"
        exit 1
    fi
}

# 构建项目
build_project() {
    echo -e "${BLUE}📦 正在构建项目...${NC}"
    npm run build
    echo -e "${GREEN}✅ 构建完成${NC}"
}

# 部署到 Vercel
deploy_vercel() {
    echo -e "${BLUE}🌐 部署到 Vercel...${NC}"
    check_dependency "vercel"
    
    # 检查是否登录
    if ! vercel whoami &> /dev/null; then
        echo -e "${YELLOW}请先登录 Vercel${NC}"
        vercel login
    fi
    
    # 部署
    vercel --prod
    echo -e "${GREEN}✅ Vercel 部署完成${NC}"
}

# 部署到 GitHub Pages
deploy_github_pages() {
    echo -e "${BLUE}📄 部署到 GitHub Pages...${NC}"
    check_dependency "git"
    
    # 确保在 git 仓库中
    if [ ! -d ".git" ]; then
        echo -e "${RED}错误: 当前目录不是 git 仓库${NC}"
        echo -e "${YELLOW}请先初始化 git 仓库并推送到 GitHub${NC}"
        exit 1
    fi
    
    # 创建 gh-pages 分支并部署
    git add out/ -f
    git commit -m "Deploy to GitHub Pages" --allow-empty
    git subtree push --prefix out origin gh-pages
    
    echo -e "${GREEN}✅ GitHub Pages 部署完成${NC}"
    echo -e "${YELLOW}请确保在 GitHub 仓库设置中启用了 GitHub Pages${NC}"
}

# 部署到 Netlify
deploy_netlify() {
    echo -e "${BLUE}🌍 部署到 Netlify...${NC}"
    check_dependency "netlify"
    
    # 检查是否登录
    if ! netlify status &> /dev/null; then
        echo -e "${YELLOW}请先登录 Netlify${NC}"
        netlify login
    fi
    
    # 部署
    netlify deploy --prod --dir=out
    echo -e "${GREEN}✅ Netlify 部署完成${NC}"
}

# 部署到自有服务器（通过 SCP）
deploy_server() {
    echo -e "${BLUE}🖥️  部署到自有服务器...${NC}"
    check_dependency "scp"
    
    read -p "请输入服务器地址 (user@host): " server
    read -p "请输入部署路径 (默认: /var/www/html): " deploy_path
    deploy_path=${deploy_path:-/var/www/html}
    
    echo -e "${BLUE}正在上传文件到服务器...${NC}"
    scp -r out/* "$server:$deploy_path"
    
    echo -e "${GREEN}✅ 服务器部署完成${NC}"
}

# 本地预览
local_preview() {
    echo -e "${BLUE}👀 启动本地预览...${NC}"
    check_dependency "npx"
    
    cd out && npx serve -p 3000
}

# 主菜单
show_menu() {
    echo ""
    echo "请选择部署方式:"
    echo "1) Vercel (推荐，自动部署，全球 CDN)"
    echo "2) GitHub Pages (免费，适合开源项目)"
    echo "3) Netlify (免费，功能丰富)"
    echo "4) 自有服务器 (SCP 上传)"
    echo "5) 本地预览"
    echo "6) 退出"
    echo ""
}

# 主程序
main() {
    # 检查是否在项目根目录
    if [ ! -f "package.json" ]; then
        echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
        exit 1
    fi
    
    # 构建项目
    build_project
    
    while true; do
        show_menu
        read -p "请输入选项 (1-6): " choice
        
        case $choice in
            1)
                deploy_vercel
                break
                ;;
            2)
                deploy_github_pages
                break
                ;;
            3)
                deploy_netlify
                break
                ;;
            4)
                deploy_server
                break
                ;;
            5)
                local_preview
                break
                ;;
            6)
                echo -e "${GREEN}👋 再见${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}无效选项，请重新选择${NC}"
                ;;
        esac
    done
}

# 运行主程序
main
