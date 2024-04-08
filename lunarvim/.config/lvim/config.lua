-- set leader key to space
lvim.leader = "space"

-- set color schema
vim.colorscheme = "rose-pine"
vim.g.rose_pine_variant = 'moon'
-- lvim.colorscheme = "default"

-- set timeout length for key mappings
vim.opt.timeoutlen = 500

-- use relative line numbers
vim.opt.relativenumber = true

-- number of spaces inserted for each indentation
vim.opt.shiftwidth = 4

-- number of spaces for a tab
vim.opt.tabstop = 4

-- let backspace delete indent
vim.opt.softtabstop = 4

-- show matching brackets/paranthesis
vim.opt.showmatch = true

-- wrap lines
vim.opt.wrap = true

-- disable introductory messages
vim.opt.shortmess = vim.opt.shortmess + "I"

-- disable plugins
lvim.builtin.alpha.active = false

-- install custom plugins
lvim.plugins = {
    { "mfussenegger/nvim-jdtls" }, -- better java LSP
    { "rose-pine/neovim" }, -- color scheme
}

-- disable LSPs
vim.list_extend(lvim.lsp.automatic_configuration.skipped_servers, { "jdtls" })

-- install parsers
lvim.builtin.treesitter.ensure_installed = {
    "bash",
    "css",
    "java",
    "javascript",
    "json",
    "lua",
    "python",
    "typescript",
    "yaml",
}

-- ignore parsers
lvim.builtin.treesitter.ignore_install = { "diff", "gitcommit" }

-- allow navigating up/down in wrapped lines
lvim.keys.normal_mode["j"] = "gj"
lvim.keys.normal_mode["k"] = "gk"

-- clear current search
lvim.keys.normal_mode["<Esc><Esc>"] = ":nohlsearch<CR>"

-- close current buffer
lvim.keys.normal_mode["<leader>q"] = ":bd<CR>"

-- Run current file
lvim.keys.normal_mode["<leader>r"] = function()
    local file = vim.fn.expand('%')          -- Get the current file name
    local first_line = vim.fn.getline(1)     -- Get the first line of the file
    if string.match(first_line, '^#!/') then -- If first line contains shebang
        local escaped_file = vim.fn.getcwd() ..
            '/' ..
            vim.fn.shellescape(file)           -- Properly escape the file name for shell commands
        vim.cmd('!chmod u+x ' .. escaped_file) -- Make the file executable
        vim.cmd('vsplit')                      -- Split the window vertically
        vim.cmd('terminal ' .. escaped_file)   -- Open terminal and execute the file
        vim.cmd('startinsert')                 -- Enter insert mode, recommended by echasnovski on Reddit
    else
        vim.cmd('echo "Not a script. Shebang line not found."')
    end
end
