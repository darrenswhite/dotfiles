local theme_assets = require("beautiful.theme_assets")
local xresources = require("beautiful.xresources")
local dpi = xresources.apply_dpi

local gfs = require("gears.filesystem")
local theme_path = gfs.get_themes_dir() .. "custom"

local theme                                     = {}
theme.font                                      = "sans 8"
theme.bg_normal                                 = "#000000"
theme.bg_focus                                  = "#000000"
theme.bg_urgent                                 = "#000000"
theme.fg_normal                                 = "#aaaaaa"
theme.fg_focus                                  = "#ff8c00"
theme.fg_urgent                                 = "#af1d18"
theme.fg_minimize                               = "#ffffff"
theme.useless_gap                               = dpi(8)
theme.border_width                              = dpi(1)
theme.border_normal                             = "#1c2022"
theme.border_focus                              = "#606060"
theme.border_marked                             = "#3ca4d8"
theme.menu_bg_normal                            = "#000000"
theme.menu_bg_focus                             = "#000000"
theme.menu_border_width                         = 0
theme.menu_width                                = 130
theme.menu_height                               = dpi(15)
theme.menu_width                                = dpi(100)
theme.menu_fg_normal                            = "#aaaaaa"
theme.menu_fg_focus                             = "#ff8c00"
theme.menu_bg_normal                            = "#050505dd"
theme.menu_bg_focus                             = "#050505dd"
theme.tasklist_plain_task_name                  = true
theme.tasklist_disable_icon                     = true
theme.widget_main_color                         = "#ffffff"
theme.widget_red                                = "#e53935"
theme.widget_yellow                             = "#c0ca33"
theme.widget_green                              = "#43a047"
theme.widget_black                              = "#000000"
theme.widget_transparent                        = "#00000000"
theme.icon_theme                                = nil

return theme
