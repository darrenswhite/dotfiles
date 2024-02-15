return {
	'nvim-telescope/telescope.nvim', tag = '0.1.5',
	-- or                              , branch = '0.1.x',
	dependencies = { 'nvim-lua/plenary.nvim' },

	{ 'nvim-telescope/telescope-fzf-native.nvim', build = 'make' },

	-- library used by other plugins
	{ "nvim-lua/plenary.nvim", lazy = true },
}
