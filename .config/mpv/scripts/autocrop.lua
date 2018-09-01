require "mp.msg"

script_name = mp.get_script_name()
cropdetect_label = string.format("%s-cropdetect", script_name)
crop_label = string.format("%s-crop", script_name)

-- interval to detect automatically detect and crop
interval = tonumber(mp.get_opt(string.format("%s.interval", script_name)))
if not interval then
    interval = 2
end

function do_crop(name, value)
    mp.msg.info(name)
    mp.msg.info(value)

    -- get the metadata
    local cropdetect_metadata = mp.get_property_native(
        string.format("vf-metadata/%s", cropdetect_label)
    )

    -- use it to crop if its valid
    if cropdetect_metadata then
        if cropdetect_metadata["lavfi.cropdetect.w"]
            and cropdetect_metadata["lavfi.cropdetect.h"]
            and cropdetect_metadata["lavfi.cropdetect.x"]
            and cropdetect_metadata["lavfi.cropdetect.y"]
        then
            mp.command(string.format("vf add @%s:lavfi-crop=w=%s:h=%s:x=%s:y=%s",
                                     crop_label,
                                     cropdetect_metadata["lavfi.cropdetect.w"],
                                     cropdetect_metadata["lavfi.cropdetect.h"],
                                     cropdetect_metadata["lavfi.cropdetect.x"],
                                     cropdetect_metadata["lavfi.cropdetect.y"]))
        else
            mp.msg.error(
                "Got empty crop data. You might need to increase interval."
            )
        end
    else
        mp.msg.error(
            "No crop data. Was the cropdetect filter successfully inserted?"
        )
        mp.msg.error(
            "Does your version of ffmpeg/libav support AVFrame metadata?"
        )
    end
end

function add_filter()
    -- insert the cropdetect filter
    mp.command(
        string.format(
            'vf add @%s:cropdetect=limit=%f:round=2:reset=0',
            cropdetect_label,
            24/255
        )
    )
end

add_filter()

mp.observe_property(
    string.format("vf-metadata/%s/lavfi.cropdetect.y", cropdetect_label),
    "string",
    do_crop
)
