return {
	'nvim-telescope/telescope.nvim', 
	dependencies = {
		'nvim-lua/plenary.nvim',
		{ 'nvim-telescope/telescope-fzf-native.nvim', build = 'make' }
	},
	keys = {
		{ '<leader>ff', '<cmd>Telescope find_files<cr>'}
	}
}
