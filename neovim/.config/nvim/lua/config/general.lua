-- set leader key to space
vim.g.mapleader = " "

-- hide buffers, not close them
vim.opt.hidden = true

-- scroll bounds
vim.opt.scrolloff = 10

-- make backspace behave in a sane manner
vim.opt.backspace = "indent,eol,start"

-- searching
vim.opt.hlsearch = true
vim.opt.incsearch = true

-- use indents of 4
vim.opt.shiftwidth = 4

-- convert tabs to spaces
vim.opt.expandtab = true

-- an indentation every 4 columns
vim.opt.tabstop = 4

-- let backspace delete indent
vim.opt.softtabstop = 4

-- enable auto indentation
vim.opt.autoindent = true
