--- Separating Multiple Monitor functions as a separeted module (taken from awesome wiki)

local awful = require("awful")
local naughty = require("naughty")

local custom_layouts = {
  ["DP1"] = " --output DP1 --auto",
  ["eDP1_DP1"] = " --output eDP1 --auto --below DP1 --output DP1 --auto"
}

local default_layout = "eDP1_DP1"
local fallback_layout = "eDP1"

-- Get active outputs
local function outputs(disconnected)
  local outputs = {}
  local xrandr = io.popen("xrandr -q --current")

  if xrandr then
    local output
    for line in xrandr:lines() do
      if disconnected then
        output = line:match("^([%w-]+) disconnected ")
      else
        output = line:match("^([%w-]+) connected ")
      end

      if output then
        outputs[#outputs + 1] = output
      end
    end
    xrandr:close()
  end

  return outputs
end

local function arrange(out)
  -- We need to enumerate all permutations of horizontal outputs.

  local choices = {}
  local previous = { {} }
  for i = 1, #out do
    -- Find all permutation of length `i`: we take the permutation
    -- of length `i-1` and for each of them, we create new
    -- permutations by adding each output at the end of it if it is
    -- not already present.
    local new = {}
    for _, p in pairs(previous) do
      for _, o in pairs(out) do
        if not awful.util.table.hasitem(p, o) then
          new[#new + 1] = awful.util.table.join(p, {o})
        end
      end
    end
    choices = awful.util.table.join(choices, new)
    previous = new
  end

  return choices
end

-- Build available choices
local function menu()
  local menu = {}
  local connected = outputs(false)
  local disconnected = outputs(true)
  local choices = arrange(connected)

  for _, choice in pairs(choices) do
    local cmd = "xrandr"
    local layout = ""

    for i, o in pairs(choice) do
      if i > 1 then
        layout = layout .. "_"
      end
      layout = layout .. o
    end

    if custom_layouts[layout] ~= nil then
      cmd = cmd .. custom_layouts[layout]
    else
      -- Enabled outputs
      for i, o in pairs(choice) do
        cmd = cmd .. " --output " .. o .. " --auto"
        if i > 1 then
          cmd = cmd .. " --right-of " .. choice[i-1]
        end
      end
    end

    -- Disabled outputs
    for _, o in pairs(connected) do
      if not awful.util.table.hasitem(choice, o) then
        cmd = cmd .. " --output " .. o .. " --off"
      end
    end

    -- Disconnected outputs
    for _, o in pairs(disconnected) do
      cmd = cmd .. " --output " .. o .. " --off"
    end

    local label = ""
    if #choice == 1 then
      label = 'Only <span weight="bold">' .. choice[1] .. '</span>'
    else
      for i, o in pairs(choice) do
        if i > 1 then
          label = label .. " + "
        end
        label = label .. '<span weight="bold">' .. o .. '</span>'
      end
    end

    menu[#menu + 1] = { layout, label, cmd }
  end

  return menu
end

-- Display xrandr notifications from choices
local state = { cid = nil }

local function naughty_destroy_callback(reason)
  if reason == naughty.notificationClosedReason.expired or
  reason == naughty.notificationClosedReason.dismissedByUser then
    execute(true)
  end
end

local function execute(restart)
  local action = state.index and state.menu[state.index - 1][3]
  if action then
    awful.util.spawn(action, false)
    state.index = nil

    if restart then
      awesome.restart()
    end
  end
end

local function xrandr()
  -- Build the list of choices
  if not state.index then
    state.menu = menu()
    state.index = 1
  end

  -- Select one and display the appropriate notification
  local label, action
  local next = state.menu[state.index]
  state.index = state.index + 1

  if not next then
    label = "Keep the current configuration"
    state.index = nil
  else
    _, label, action = table.unpack(next)
  end
  state.cid = naughty.notify({
    text = label,
    timeout = 4,
    screen = mouse.screen,
    replaces_id = state.cid,
    destroy = naughty_destroy_callback
  }).id
end

local function default()
  state.menu = menu()
  state.index = nil

  local default_index, fallback_index
  local layout

  for i = 1, #state.menu do
    layout, _, _ = table.unpack(state.menu[i])

    if default_layout == layout then
      default_index = i
      break
    elseif fallback_layout == layout then
      fallback_index = i
    end
  end

  if default_index then
    state.index = default_index + 1
  elseif fallback_index then
    state.index = fallback_index + 1
  end

  execute(false)

end

return {
  outputs = outputs,
  arrange = arrange,
  menu = menu,
  xrandr = xrandr,
  default = default
}
