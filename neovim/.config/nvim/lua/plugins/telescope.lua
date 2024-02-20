return {
    'nvim-telescope/telescope.nvim', 
    dependencies = {
        'nvim-lua/plenary.nvim',
        { 'nvim-telescope/telescope-fzf-native.nvim', build = 'make' }
    },
    config = function ()
        local telescope = require("telescope")
        local actions = require("telescope.actions")
        local builtin = require("telescope.builtin")

        telescope.setup({
            defaults = {
                mappings = {
                    i = {
                        ["<esc>"] = actions.close
                    }
                }
            },
            pickers = {
                find_files = {
                    find_command = { "rg", "--files", "--hidden", "--glob", "!**/.git/*" },
                },
                live_grep = {
                    additional_args = function()
                        return { '--hidden', '--glob', '!**/.git/*' }
                    end
                },
                grep_string = {
                    additional_args = function()
                        return { '--hidden', '--glob', '!**/.git/*' }
                    end
                },
            },
        })

        vim.keymap.set('n', '<leader>ff', builtin.find_files, {})
        vim.keymap.set('n', '<leader>fg', builtin.live_grep, {})
        vim.keymap.set('n', '<leader>fb', builtin.buffers, {})
        vim.keymap.set('n', '<leader>fh', builtin.help_tags, {})
        vim.keymap.set('n', '<leader><leader>', builtin.oldfiles, {})
    end
}
