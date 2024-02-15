set hls
set number
set relativenumber
set ruler
set showmatch
set softtabstop=4
set tabstop=4
set shiftwidth=4
set expandtab
set term=xterm-256color
syntax on

set t_Co=256
set cursorline
colorscheme onehalfdark

if exists('+termguicolors')
  let &t_8f = "\<Esc>[38;2;%lu;%lu;%lum"
  let &t_8b = "\<Esc>[48;2;%lu;%lu;%lum"
  set termguicolors
endif

set clipboard=unnamed

let mapleader = " "

" leader + h - clear search
map <leader>h :noh<CR>
