local awful = require("awful")
local wibox = require("wibox")
local beautiful = require("beautiful")
local gears = require("gears")

local spawn = awful.spawn or awful.util.spawn
local watch = awful.spawn and awful.spawn.with_line_callback

local widget = wibox.widget.textbox()

local monitor_command = "stdbuf -oL alsactl monitor pulse"
local get_command = "amixer -D pulse sget Master"

local mute_text = "% 03d%%"
local volume_text = "% 3dM"

local function update_widget_text(stdout, _, _, _)
    local mute = string.match(stdout, "%[(o%D%D?)%]")
    local volume = string.match(stdout, "%[(%d?%d?%d)%%%]")

    if mute == "on" then
        widget:set_text(mute_text:format(volume))
    else
        widget:set_text(volume_text:format(volume))
    end
end

local function update_widget(_)
    spawn.easy_async_with_shell(get_command, update_widget_text)
end

update_widget()
watch(monitor_command, { stdout = update_widget })

return widget
