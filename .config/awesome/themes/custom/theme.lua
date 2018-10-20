local theme_assets = require("beautiful.theme_assets")
local xresources = require("beautiful.xresources")
local dpi = xresources.apply_dpi

local gfs = require("gears.filesystem")
local theme_path = gfs.get_themes_dir() .. "custom"

local theme                                     = {}

theme.font                                      = "Terminus 12"
theme.bg_normal                                 = "#11111177"
theme.bg_focus                                  = theme.bg_normal
theme.bg_minimize                               = theme.bg_normal
theme.bg_systray                                = theme.bg_normal
theme.bg_urgent                                 = theme.bg_normal
theme.fg_focus                                  = "#ff8c00"
theme.fg_minimize                               = "#ffffff"
theme.fg_normal                                 = "#dddddd"
theme.fg_urgent                                 = "#af1d18"
theme.useless_gap                               = dpi(8)
theme.border_width                              = dpi(0)
theme.border_normal                             = "#1c2022"
theme.border_focus                              = "#606060"
theme.border_marked                             = "#3ca4d8"
theme.menu_bg_normal                            = "#000000"
theme.menu_bg_focus                             = "#000000"
theme.menu_border_width                         = dpi(0)
theme.menu_height                               = dpi(15)
theme.menu_width                                = dpi(100)
theme.menu_fg_normal                            = "#dddddd"
theme.menu_fg_focus                             = "#ff8c00"
theme.taglist_bg_empty                          = theme.bg_normal
theme.taglist_bg_focus                          = theme.bg_normal
theme.taglist_bg_occupied                       = theme.bg_normal
theme.taglist_bg_urgent                         = theme.bg_normal
theme.tasklist_bg_focus                         = theme.bg_normal
theme.tasklist_bg_urgent                        = theme.bg_normal
theme.tasklist_plain_task_name                  = true
theme.tasklist_disable_icon                     = true
theme.titlebar_bg_focus                         = theme.bg_normal
theme.titlebar_bg_normal                        = theme.bg_normal
theme.icon_theme                                = nil

return theme
